import { Head, useForm } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'

export default function SignIn() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/session')
  }

  return (
    <>
      <Head title="Sign In" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <a href="/registration" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
