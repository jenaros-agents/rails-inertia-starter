import { Head, Link } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { getResultBadge } from '../../helpers/matchHelpers'
import type { Match } from '../../types/match'

interface PageProps {
  matches: Match[]
}

export default function MatchesIndex({ matches }: PageProps) {
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
                <div className="text-center py-16 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches yet</h3>
                  <p className="text-gray-500 mb-6">Start tracking your rugby journey by recording your first match.</p>
                  <Link href="/matches/new">
                    <Button>Create your first match</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Opponent</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Venue</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Result</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
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
