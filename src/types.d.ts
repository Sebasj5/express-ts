export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comments: string
}

export type NonsensitiveDiaryEntry = Omit<DiaryEntry, 'comments'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
