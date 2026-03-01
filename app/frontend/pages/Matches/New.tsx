import { Head, Link, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { MatchForm } from '../../components/Matches/MatchForm'
import type { MatchFormData } from '../../types/match'

interface Props {
  errors?: string[]
}

export default function MatchesNew({ errors: serverErrors = [] }: Props) {
  const { data, setData, post, processing, errors } = useForm<MatchFormData>({
    opponent: '',
    match_date: '',
    venue: '',
    home_score: '',
    away_score: '',
    result: '',
    youtube_url: '',
    notes: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/matches')
  }

  return (
    <>
      <Head title="New Match" />
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
                <span className="text-gray-600">New</span>
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

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Match</CardTitle>
              <CardDescription>
                Record a new rugby match
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
                submitLabel="Create Match"
                processingLabel="Creating..."
                cancelButtonHref="/matches"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
