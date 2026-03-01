import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Alert, AlertDescription } from '../components/ui/Alert'
import { getResultBadge } from '../../helpers/matchHelpers'

interface MatchPenalty {
  id: number
  player_id: number
  player_name: string
  penalty_type: string
  minute: number
  description: string
}

interface MatchStat {
  id: number
  player_id: number
  player_name: string
  tries: number | null
  tackles: number | null
  assists: number | null
  conversions: number | null
  penalties: number | null
  drops: number | null
  kicks: number | null
}

interface Version {
  id: number
  event: string
  created_at: string
  changeset: Record<string, any>
}

interface PageProps {
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
    created_at: string
    updated_at: string
  }
  match_penalties: MatchPenalty[]
  match_stats: MatchStat[]
  versions: Version[]
}

function YouTubeEmbed({ url }: { url: string }) {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const videoId = getYouTubeId(url)

  if (!videoId) return null

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

function PenaltyList({ penalties }: { penalties: MatchPenalty[] }) {
  if (penalties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No penalties recorded for this match</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {penalties.map((penalty) => (
        <div key={penalty.id} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center font-bold text-yellow-800">
            {penalty.minute}'
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">
              {penalty.player_name}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{penalty.penalty_type}</span>
              {penalty.description && ` - ${penalty.description}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VersionHistory({ versions }: { versions: Version[] }) {
  if (versions.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No version history yet</p>
    )
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {versions.map((version) => (
        <Alert key={version.id} className="bg-blue-50 border-blue-200">
          <AlertDescription>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-blue-900">
                  {version.event.charAt(0).toUpperCase() + version.event.slice(1)}
                </span>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(version.created_at).toLocaleString()}
                </div>
                {Object.keys(version.changeset).length > 0 && (
                  <details className="mt-2 text-xs text-gray-600">
                    <summary className="cursor-pointer hover:text-gray-900">
                      View changes
                    </summary>
                    <pre className="mt-1 bg-white p-2 rounded border text-left overflow-x-auto">
                      {JSON.stringify(version.changeset, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

function MatchStats({ stats }: { stats: MatchStat[] }) {
  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No player stats recorded for this match</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Player</th>
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Tries</th>
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Tackles</th>
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Assists</th>
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Conversions</th>
            <th scope="col" className="text-left py-2 px-2 font-medium text-gray-600">Kicks</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.id} className="border-b">
              <td className="py-2 px-2 font-medium">{stat.player_name}</td>
              <td className="py-2 px-2">{stat.tries || 0}</td>
              <td className="py-2 px-2">{stat.tackles || 0}</td>
              <td className="py-2 px-2">{stat.assists || 0}</td>
              <td className="py-2 px-2">{stat.conversions || 0}</td>
              <td className="py-2 px-2">{stat.kicks || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MatchesShow({ match, match_penalties, match_stats, versions }: PageProps) {
  const { delete: destroy, processing } = useForm({})

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this match? This action cannot be undone.')) {
      destroy(`/matches/${match.id}`, {
        onSuccess: () => window.location.href = '/matches'
      })
    }
  }

  return (
    <>
      <Head title={`${match.opponent} - Match Details`} />
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
                <span className="text-gray-600">{match.opponent}</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/matches/${match.id}/edit`}>
                  <Button variant="outline">Edit Match</Button>
                </Link>
                <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                  {processing ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/matches" className="text-blue-600 hover:underline">
              ← Back to Matches
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Match Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Match Details</span>
                  {getResultBadge(match.result)}
                </CardTitle>
                <CardDescription>
                  vs {match.opponent}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Score Display */}
                  {match.home_score !== null && match.away_score !== null ? (
                    <div className="flex items-center justify-center gap-8 py-8 bg-gradient-to-r from-blue-50 to-white rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Home</div>
                        <div className="text-5xl font-bold text-blue-600">{match.home_score}</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-400">-</div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">{match.opponent}</div>
                        <div className="text-5xl font-bold text-red-600">{match.away_score}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg">
                      <div className="text-gray-500">Match scores not yet recorded</div>
                    </div>
                  )}

                  <dl className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <dt className="font-medium text-gray-600">Date & Time</dt>
                      <dd className="font-semibold">
                        {new Date(match.match_date).toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <dt className="font-medium text-gray-600">Venue</dt>
                      <dd className="font-semibold">{match.venue}</dd>
                    </div>
                    {match.notes && (
                      <div className="border-b pb-2">
                        <dt className="font-medium text-gray-600 mb-2">Notes</dt>
                        <dd className="text-gray-700 whitespace-pre-wrap">{match.notes}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-500">
                      <dt>Last Updated</dt>
                      <dd>{new Date(match.updated_at).toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>

            {/* Version History */}
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
                <CardDescription>Track changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <VersionHistory versions={versions} />
              </CardContent>
            </Card>
          </div>

          {/* YouTube Video */}
          {match.youtube_url && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Match Highlights</CardTitle>
                <CardDescription>Watch the match video</CardDescription>
              </CardHeader>
              <CardContent>
                <YouTubeEmbed url={match.youtube_url} />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Penalties */}
            <Card>
              <CardHeader>
                <CardTitle>Match Penalties</CardTitle>
                <CardDescription>Penalties conceded during the match</CardDescription>
              </CardHeader>
              <CardContent>
                <PenaltyList penalties={match_penalties} />
              </CardContent>
            </Card>

            {/* Player Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Player Statistics</CardTitle>
                <CardDescription>Individual performance for this match</CardDescription>
              </CardHeader>
              <CardContent>
                <MatchStats stats={match_stats} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
