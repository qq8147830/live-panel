import {
  createReadStream,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync
} from 'node:fs'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleApiRequest } from '../teachzhao/lib/api-handlers.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const TZ_PUBLIC = join(ROOT, 'teachzhao/public')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon'
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      if (!chunks.length) return resolve({})
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        resolve({})
      }
    })
    req.on('error', () => resolve({}))
  })
}

function copyDirSync(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const from = join(src, entry)
    const to = join(dest, entry)
    if (statSync(from).isDirectory()) copyDirSync(from, to)
    else copyFileSync(from, to)
  }
}

function createTeachZhaoMiddleware() {
  return async (req, res, next) => {
    const rawUrl = decodeURIComponent((req.url || '').split('?')[0])

    if (!rawUrl.startsWith('/teachzhao')) return next()

    if (rawUrl.startsWith('/teachzhao/api/')) {
      const endpoint = rawUrl.slice('/teachzhao/api/'.length).replace(/\/$/, '')
      const pathname = `/api/${endpoint}`
      const method = req.method || 'GET'
      const body = method === 'GET' || method === 'HEAD' ? {} : await readJsonBody(req)
      const result = handleApiRequest(method, pathname, body)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.payload))
      return
    }

    const relPath =
      rawUrl === '/teachzhao' || rawUrl === '/teachzhao/'
        ? 'index.html'
        : rawUrl.replace(/^\/teachzhao\/?/, '')

    const safePath = normalize(relPath).replace(/^(\.\.[/\\])+/, '')
    const filePath = join(TZ_PUBLIC, safePath)

    if (!filePath.startsWith(TZ_PUBLIC) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      const indexPath = join(TZ_PUBLIC, 'index.html')
      if (existsSync(indexPath)) {
        res.statusCode = 200
        res.setHeader('Content-Type', MIME['.html'])
        createReadStream(indexPath).pipe(res)
        return
      }
      res.statusCode = 404
      res.end('Not found')
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream')
    createReadStream(filePath).pipe(res)
  }
}

export function teachzhaoIntegratePlugin() {
  const middleware = createTeachZhaoMiddleware()
  return {
    name: 'teachzhao-integrate',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
    closeBundle() {
      const dist = join(ROOT, 'dist')
      copyDirSync(TZ_PUBLIC, join(dist, 'teachzhao'))

      const staticFiles = [
        'index.html',
        'splash.html',
        'splash.css',
        'splash.js',
        'favicon.svg',
        'MP_verify_xIYrehwJPor2mUh6.txt'
      ]
      for (const file of staticFiles) {
        const src = join(ROOT, file)
        if (existsSync(src)) copyFileSync(src, join(dist, file))
      }

      const imagesSrc = join(ROOT, 'src/images')
      if (existsSync(imagesSrc)) {
        copyDirSync(imagesSrc, join(dist, 'src/images'))
      }
    }
  }
}
