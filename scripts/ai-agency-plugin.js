import {
  createReadStream,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync
} from 'node:fs'
import http from 'node:http'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const AA_STATIC = join(ROOT, 'ai-agency/static')
const AA_API_HOST = '127.0.0.1'
const AA_API_PORT = Number(process.env.AI_AGENCY_PORT || 18888)

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

function copyDirSync(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const from = join(src, entry)
    const to = join(dest, entry)
    if (statSync(from).isDirectory()) copyDirSync(from, to)
    else copyFileSync(from, to)
  }
}

function proxyApiRequest(req, res, apiPath) {
  const headers = { ...req.headers, host: `${AA_API_HOST}:${AA_API_PORT}` }
  delete headers['host']

  const proxyReq = http.request(
    {
      hostname: AA_API_HOST,
      port: AA_API_PORT,
      path: apiPath,
      method: req.method,
      headers
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers)
      proxyRes.pipe(res)
    }
  )

  proxyReq.on('error', () => {
    if (!res.headersSent) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(
        JSON.stringify({
          detail:
            'AI Agency API 未启动。请先运行: npm run dev:ai-agency'
        })
      )
    }
  })

  req.pipe(proxyReq)
}

function createAiAgencyMiddleware() {
  return (req, res, next) => {
    const rawUrl = decodeURIComponent((req.url || '').split('?')[0])

    if (!rawUrl.startsWith('/ai-agency')) return next()

    if (rawUrl.startsWith('/ai-agency/api/')) {
      const apiPath = (req.url || '').replace(/^\/ai-agency/, '') || '/'
      proxyApiRequest(req, res, apiPath)
      return
    }

    const relPath =
      rawUrl === '/ai-agency' || rawUrl === '/ai-agency/'
        ? 'index.html'
        : rawUrl.replace(/^\/ai-agency\/?/, '')

    const safePath = normalize(relPath).replace(/^(\.\.[/\\])+/, '')
    const filePath = join(AA_STATIC, safePath)

    if (!filePath.startsWith(AA_STATIC) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      const indexPath = join(AA_STATIC, 'index.html')
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

export function aiAgencyIntegratePlugin() {
  const middleware = createAiAgencyMiddleware()
  return {
    name: 'ai-agency-integrate',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
    closeBundle() {
      const dist = join(ROOT, 'dist')
      copyDirSync(AA_STATIC, join(dist, 'ai-agency'))
    }
  }
}
