import { MatchResult } from '../types/match'

export const resultOptions: MatchResult[] = ['win', 'loss', 'draw']

export const getResultBadge = (result: string) => {
  const styles = {
    win: 'bg-green-100 text-green-800',
    loss: 'bg-red-100 text-red-800',
    draw: 'bg-gray-100 text-gray-800'
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[result as keyof typeof styles] || styles.draw}`}>
      {result.charAt(0).toUpperCase() + result.slice(1)}
    </span>
  )
}

export const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
