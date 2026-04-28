import { app } from './app'

require('dotenv').config();

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`)
})