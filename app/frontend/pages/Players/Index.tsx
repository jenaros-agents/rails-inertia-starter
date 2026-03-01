import { Head, Link } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

interface Player {
  id: number
  name: string
  position: string
  weight: number | null
  height: number | null
  updated_at: string
}

interface PageProps {
  players: Player[]
}

export default function PlayersIndex({ players }: PageProps) {
  return (
    <>
      <Head title="Players" />
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
                <span className="text-gray-600">Players</span>
              </div>
              <Link href="/players/new">
                <Button>Add Player</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Players</CardTitle>
              <CardDescription>
                Manage your rugby players and track their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {players.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No players yet</p>
                  <Link href="/players/new">
                    <Button>Create your first player</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Position</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Weight (kg)</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Height (cm)</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player) => (
                        <tr key={player.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Link
                              href={`/players/${player.id}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {player.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{player.position}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {player.weight ? player.weight.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {player.height ? player.height.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(player.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Link href={`/players/${player.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/players/${player.id}/edit`}>
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
