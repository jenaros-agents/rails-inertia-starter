import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Alert, AlertDescription } from '../components/ui/Alert'

interface Props {
  errors?: string[]
}

export default function PlayersNew({ errors: serverErrors = {} }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    position: '',
    weight: '',
    height: '',
    notes: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/players')
  }

  const positionOptions = [
    'Prop',
    'Hooker',
    'Lock',
    'Flanker',
    'Number 8',
    'Scrum-half',
    'Fly-half',
    'Center',
    'Winger',
    'Full-back'
  ]

  return (
    <>
      <Head title="New Player" />
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
                <span className="text-gray-600">New</span>
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

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Player</CardTitle>
              <CardDescription>
                Add a new rugby player to your roster
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
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <select
                    id="position"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                    required
                  >
                    <option value="">Select a position</option>
                    {positionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-sm text-red-600">{errors.position}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="95.5"
                      value={data.weight}
                      onChange={e => setData('weight', e.target.value)}
                    />
                    {errors.weight && (
                      <p className="text-sm text-red-600">{errors.weight}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="185.0"
                      value={data.height}
                      onChange={e => setData('height', e.target.value)}
                    />
                    {errors.height && (
                      <p className="text-sm text-red-600">{errors.height}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Additional notes about the player..."
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
                    {processing ? 'Creating...' : 'Create Player'}
                  </Button>
                  <Link href="/players">
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
