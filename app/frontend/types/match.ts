export interface Match {
  id: number
  opponent: string
  match_date: string
  venue: string
  home_score: number | null
  away_score: number | null
  result: string
  youtube_url: string | null
  notes: string | null
  updated_at: string
}

export interface MatchFormData {
  opponent: string
  match_date: string
  venue: string
  home_score: string
  away_score: string
  result: string
  youtube_url: string
  notes: string
}

export interface MatchErrors {
  [key: string]: string
}

export type MatchResult = 'win' | 'loss' | 'draw'
