import { Head, Link } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

interface Match {
  id: number
  opponent: string
  match_date: string
  venue: string
  home_score: number | null
  away_score: number | null
  result: string
  updated_at: string
}

interface PageProps {
  matches: Match[]
}

export default function MatchesIndex({ matches }: PageProps) {
  const getResultBadge = (result: string) => {
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

  return (
    <>
      <Head title="Matches" />
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
                <span className="text-gray-600">Matches</span>
              </div>
              <Link href="/matches/new">
                <Button>New Match</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Rugby Matches</CardTitle>
              <CardDescription>
                Track your rugby matches, scores, and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No matches recorded yet</p>
                  <Link href="/matches/new">
                    <Button>Create your first match</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Opponent</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Venue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Result</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((match) => (
                        <tr key={match.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Link
                              href={`/matches/${match.id}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {match.opponent}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(match.match_date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{match.venue}</td>
                          <td className="py-3 px-4 font-semibold">
                            {match.home_score !== null && match.away_score !== null ? (
                              <span>
                                {match.home_score} - {match.away_score}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {getResultBadge(match.result)}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(match.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Link href={`/matches/${match.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/matches/${match.id}/edit`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
