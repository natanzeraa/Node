import dotenv from 'dotenv'
import express from 'express'
import 'module-alias/register.js'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './src/config/database.js'
import appointmentRoutes from './src/routes/appointments.routes.js'
import authRoutes from './src/routes/auth.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

dotenv.config()
const app = express()
const BASE_API_URI = `${process.env.BASE_API_URI}`

app.use(express.json())

connectDB()

app.use(`${BASE_API_URI}/auth`, authRoutes)
app.use(`${BASE_API_URI}`, appointmentRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Service running at ${PORT}`))
