// Servidor estático para o App Hosting (Cloud Run).
// Serve o build do Vite (dist/) e faz fallback para index.html (SPA).
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')

const app = express()

// Assets com cache longo (têm hash no nome); index.html sem cache.
app.use(express.static(dist, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache')
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
  },
}))

// SPA fallback — qualquer rota cai no index.html
app.use((_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`EXTOAPP hub servindo dist/ na porta ${port}`)
})
