import express from 'express'
import { router } from './routes'
import cors from 'cors'
import { errorHandler } from './middlewares/globalError'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

export { app }