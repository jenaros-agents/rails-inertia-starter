import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Alert, AlertDescription } from '../components/ui/Alert'

interface Props {
  match: {
    id: number
    opponent: string
    match_date: string
    venue: string
    home_score: number | null
    away_score: number | null
    result: string
    youtube_url: string | null
    notes: string | null
  }
  errors?: string[]
}

export default function MatchesEdit({ match, errors: serverErrors = {} }: Props) {
  // Format the date for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const { data, setData, put, processing, errors } = useForm({
    opponent: match.opponent,
    match_date: formatDateForInput(match.match_date),
    venue: match.venue,
    home_score: match.home_score?.toString() || '',
    away_score: match.away_score?.toString() || '',
    result: match.result,
    youtube_url: match.youtube_url || '',
    notes: match.notes || ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    put(`/matches/${match.id}`)
  }

  const resultOptions = ['win', 'loss', 'draw']

  return (
    <>
      <Head title={`Edit ${match.opponent}`} />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
                  Rails Inertia Starter
                </Link>
                <span className="text-gray-300">/</span>
                <Link href="/matches" className="text-gray-600 hover:text-blue-600">
                  Matches
                </Link>
                <span className="text-gray-300">/</span>
                <Link href={`/matches/${match.id}`} className="text-gray-600 hover:text-blue-600">
                  {match.opponent}
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600">Edit</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href={`/matches/${match.id}`} className="text-blue-600 hover:underline">
              ← Back to Match
            </Link>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Edit Match</CardTitle>
              <CardDescription>
                Update match details: {match.opponent}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {serverErrors.length > 0 && (
                  <Alert className="bg-red-50 border-red-200">
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
                    type="datetime-local"
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
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Match'}
                  </Button>
                  <Link href={`/matches/${match.id}`}>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
