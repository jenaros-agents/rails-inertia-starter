import { Head, Link } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Alert, AlertDescription } from '../components/ui/Alert'

interface MatchStat {
  id: number
  match_date: string
  tries: number | null
  tackles: number | null
  assists: number | null
  conversions: number | null
  penalties: number | null
  drops: number | null
  kicks: number | null
}

interface GymLift {
  id: number
  lift_type: string
  weight: number | null
  date: string
}

interface Version {
  id: number
  event: string
  created_at: string
  changeset: Record<string, any>
}

interface PageProps {
  player: {
    id: number
    name: string
    position: string
    weight: number | null
    height: number | null
    notes: string | null
    created_at: string
    updated_at: string
  }
  match_stats: MatchStat[]
  gym_lifts: GymLift[]
  versions: Version[]
}

export default function PlayersShow({ player, match_stats, gym_lifts, versions }: PageProps) {
  return (
    <>
      <Head title={`${player.name} - Player Details`} />
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
                <Link href="/players" className="text-gray-600 hover:text-blue-600">
                  Players
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600">{player.name}</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/players/${player.id}/edit`}>
                  <Button variant="outline">Edit Player</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/players" className="text-blue-600 hover:underline">
              ← Back to Players
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Player Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Player Profile</CardTitle>
                <CardDescription>Basic information about {player.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium text-gray-600">Name</dt>
                    <dd className="font-semibold">{player.name}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium text-gray-600">Position</dt>
                    <dd className="font-semibold">{player.position}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium text-gray-600">Weight</dt>
                    <dd className="font-semibold">
                      {player.weight ? `${player.weight.toFixed(1)} kg` : '-'}
                    </dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium text-gray-600">Height</dt>
                    <dd className="font-semibold">
                      {player.height ? `${player.height.toFixed(1)} cm` : '-'}
                    </dd>
                  </div>
                  {player.notes && (
                    <div className="border-b pb-2">
                      <dt className="font-medium text-gray-600 mb-2">Notes</dt>
                      <dd className="text-gray-700">{player.notes}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-600">Last Updated</dt>
                    <dd className="text-sm text-gray-600">
                      {new Date(player.updated_at).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Version History */}
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
                <CardDescription>Track changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                {versions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No version history yet</p>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Match Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
                <CardDescription>Performance history</CardDescription>
              </CardHeader>
              <CardContent>
                {match_stats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No match stats recorded yet</p>
                    <p className="text-sm">Match stats tracking coming soon!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Date</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Tries</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Tackles</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Assists</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Kicks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {match_stats.map((stat) => (
                          <tr key={stat.id} className="border-b">
                            <td className="py-2 px-2">{new Date(stat.match_date).toLocaleDateString()}</td>
                            <td className="py-2 px-2">{stat.tries || 0}</td>
                            <td className="py-2 px-2">{stat.tackles || 0}</td>
                            <td className="py-2 px-2">{stat.assists || 0}</td>
                            <td className="py-2 px-2">{stat.kicks || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gym Lifts */}
            <Card>
              <CardHeader>
                <CardTitle>Gym Lifts</CardTitle>
                <CardDescription>Training performance</CardDescription>
              </CardHeader>
              <CardContent>
                {gym_lifts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No gym lifts recorded yet</p>
                    <p className="text-sm">Gym lifts tracking coming soon!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Date</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Lift Type</th>
                          <th className="text-left py-2 px-2 font-medium text-gray-600">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gym_lifts.map((lift) => (
                          <tr key={lift.id} className="border-b">
                            <td className="py-2 px-2">{new Date(lift.date).toLocaleDateString()}</td>
                            <td className="py-2 px-2">{lift.lift_type}</td>
                            <td className="py-2 px-2">{lift.weight ? `${lift.weight.toFixed(1)} kg` : '-'}</td>
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
      </div>
    </>
  )
}
