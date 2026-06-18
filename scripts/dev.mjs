import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const children = []
let exiting = false

function shutdown(code = 0) {
  if (exiting) return
  exiting = true
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  setTimeout(() => process.exit(code), 150)
}

function run(name, script) {
  const child = spawn('npm', ['run', script], {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  })
  child.on('exit', (code, signal) => {
    if (exiting || signal) return
    if (code !== 0 && code !== null) {
      console.error(`[dev] ${name} exited with code ${code}`)
      shutdown(code)
    }
  })
  children.push(child)
  return child
}

console.log('[dev] Starting AI Agency API (:18888) + Vite (:5173)')
console.log('[dev] index.html / splash.html / ai-agency/ → http://localhost:5173')
run('ai-agency', 'dev:ai-agency')
run('vite', 'dev:vite')

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
