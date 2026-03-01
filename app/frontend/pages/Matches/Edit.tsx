import { Head, Link, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { MatchForm } from '../../components/Matches/MatchForm'
import { formatDateForInput } from '../../helpers/matchHelpers'
import type { Match, MatchFormData } from '../../types/match'

interface Props {
  match: Match
  errors?: string[]
}

export default function MatchesEdit({ match, errors: serverErrors = [] }: Props) {
  const { data, setData, put, processing, errors } = useForm<MatchFormData>({
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
              <MatchForm
                data={data}
                setData={setData}
                errors={errors}
                serverErrors={serverErrors}
                processing={processing}
                onSubmit={handleSubmit}
                submitLabel="Update Match"
                processingLabel="Updating..."
                cancelButtonHref={`/matches/${match.id}`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
