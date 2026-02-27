import { Head, useForm } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Alert, AlertDescription } from '../components/ui/Alert'

interface Props {
  errors?: string[]
}

export default function SignUp({ errors: serverErrors = [] }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/registration')
  }

  return (
    <>
      <Head title="Sign Up" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {serverErrors.length > 0 && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  <ul className="list-disc list-inside space-y-1">
                    {serverErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  required
                  minLength={6}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="••••••••"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  required
                  minLength={6}
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a href="/session" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
