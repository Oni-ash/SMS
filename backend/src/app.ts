
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import path from 'path'

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use('/api', routes)

app.get('/', (_req, res) => res.json({ ok: true, msg: 'OCMS backend' }))

export default app
