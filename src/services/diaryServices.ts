import { DiaryEntry, NonsensitiveDiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]
export const getEntries = (): DiaryEntry[] => diaries

export const getEntriesWithoutSensitiveInfo = (): NonsensitiveDiaryEntry[] =>
  diaries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility
  }))

export const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id)
}

export const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  }
  diaries.push(newEntry)
  return newEntry
}
