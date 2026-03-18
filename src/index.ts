import express from 'express'
import type { Request, Response } from 'express'
import diaryRouter from './routes/diaries'
const app = express()
app.use(express.json())
app.use('/api/diaries', diaryRouter)
const PORT = 3000

app.get('/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
