import express from 'express'
import cors from 'cors'
import postsRouter from './routes/posts'
import { initDb } from './db'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8011


app.use(cors())
app.use(express.json())


app.use('/posts', postsRouter)


app.get('/', (req, res) => res.send({ ok: true }))


initDb().then(() => {
    app.listen(port, () => console.log(`Server listening on ${port}`))
})