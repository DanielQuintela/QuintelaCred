import 'dotenv/config'
import { app } from './app'

const PORT = process.env.PORT || 8080

// A Vercel precisa da instância do Express para gerenciar as rotas serverless
export default app

// Executa o listen apenas localmente (evita travar as funções Serverless na Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server rodando na porta ${PORT}`)
  })
}