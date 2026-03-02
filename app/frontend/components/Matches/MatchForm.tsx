import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Alert, AlertDescription } from '../ui/Alert'
import { resultOptions } from '../../helpers/matchHelpers'
import type { MatchFormData, MatchErrors } from '../../types/match'

interface MatchFormProps {
  data: MatchFormData
  setData: (field: keyof MatchFormData, value: string) => void
  errors: MatchErrors
  serverErrors: string[]
  processing: boolean
  onSubmit: (e: React.FormEvent) => void
  submitLabel: string
  processingLabel: string
  cancelButtonHref: string
  showDateOnly?: boolean
}

export function MatchForm({
  data,
  setData,
  errors,
  serverErrors,
  processing,
  onSubmit,
  submitLabel,
  processingLabel,
  cancelButtonHref,
  showDateOnly = false
}: MatchFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {serverErrors.length > 0 && (
        <Alert role="alert" className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            <ul className="list-disc list-inside space-y-1">
              {serverErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="opponent">Opponent *</Label>
        <Input
          id="opponent"
          type="text"
          placeholder="New Zealand"
          value={data.opponent}
          onChange={e => setData('opponent', e.target.value)}
          required
        />
        {errors.opponent && (
          <p className="text-sm text-red-600">{errors.opponent}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="match_date">Date & Time *</Label>
        <Input
          id="match_date"
          type={showDateOnly ? 'date' : 'datetime-local'}
          value={data.match_date}
          onChange={e => setData('match_date', e.target.value)}
          required
        />
        {errors.match_date && (
          <p className="text-sm text-red-600">{errors.match_date}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="venue">Venue *</Label>
        <Input
          id="venue"
          type="text"
          placeholder="Twickenham Stadium"
          value={data.venue}
          onChange={e => setData('venue', e.target.value)}
          required
        />
        {errors.venue && (
          <p className="text-sm text-red-600">{errors.venue}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="home_score">Home Score</Label>
          <Input
            id="home_score"
            type="number"
            min="0"
            placeholder="25"
            value={data.home_score}
            onChange={e => setData('home_score', e.target.value)}
          />
          {errors.home_score && (
            <p className="text-sm text-red-600">{errors.home_score}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="away_score">Away Score</Label>
          <Input
            id="away_score"
            type="number"
            min="0"
            placeholder="20"
            value={data.away_score}
            onChange={e => setData('away_score', e.target.value)}
          />
          {errors.away_score && (
            <p className="text-sm text-red-600">{errors.away_score}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="result">Result *</Label>
        <select
          id="result"
          aria-label="Match result"
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          value={data.result}
          onChange={e => setData('result', e.target.value)}
          required
        >
          <option value="">Select result</option>
          {resultOptions.map(option => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {errors.result && (
          <p className="text-sm text-red-600">{errors.result}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="youtube_url">YouTube URL</Label>
        <Input
          id="youtube_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={data.youtube_url}
          onChange={e => setData('youtube_url', e.target.value)}
        />
        <p className="text-sm text-gray-500">Add a YouTube video URL for match highlights</p>
        {errors.youtube_url && (
          <p className="text-sm text-red-600">{errors.youtube_url}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Additional notes about the match..."
          value={data.notes}
          onChange={e => setData('notes', e.target.value)}
          rows={4}
        />
        {errors.notes && (
          <p className="text-sm text-red-600">{errors.notes}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
        >
          {processing ? processingLabel : submitLabel}
        </button>
        <a
          href={cancelButtonHref}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-gray-300 bg-white hover:bg-gray-50 h-10 px-4 py-2"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
