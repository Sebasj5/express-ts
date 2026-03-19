import express from 'express'
import {
  getEntriesWithoutSensitiveInfo,
  findById,
  addEntry
} from '../services/diaryServices'
import { NewDiaryEntry } from '../types'

const router = express.Router()

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String

const isDate = (date: string): boolean => Boolean(Date.parse(date))

const isWeather = (param: any): param is string =>
  ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(param)

const isVisibility = (param: any): param is string =>
  ['great', 'good', 'ok', 'poor'].includes(param)

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid user data')
  }

  if (
    !isString(object.date) ||
    !isDate(object.date) ||
    !isWeather(object.weather) ||
    !isVisibility(object.visibility) ||
    !isString(object.comments)
  ) {
    throw new Error('Missing or invalid fields')
  }

  return {
    date: object.date,
    weather: object.weather,
    visibility: object.visibility,
    comments: object.comments
  }
}

router.get('/', (_req, res) => {
  res.json(getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(400).send({ error: 'Id should be a number' })
  }

  const diary = findById(id)

  return diary
    ? res.json(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newEntry = toNewDiaryEntry(req.body)
    const added = addEntry(newEntry)
    res.status(201).json(added)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(400).json({ error: message })
  }
})

export default router
