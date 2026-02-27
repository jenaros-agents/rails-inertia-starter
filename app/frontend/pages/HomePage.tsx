import { Head } from '@inertiajs/react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

export default function HomePage() {
  return (
    <>
      <Head title="Home" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Rails Inertia Starter
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A modern Rails application with Inertia.js, React, and shadcn/ui components
            </p>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Modern full-stack development</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>✓ Ruby on Rails 8</li>
                  <li>✓ Inertia.js for Rails</li>
                  <li>✓ React 18</li>
                  <li>✓ Vite for frontend build</li>
                  <li>✓ Tailwind CSS</li>
                  <li>✓ shadcn/ui components</li>
                </ul>
                <div className="mt-6 flex gap-4 justify-center">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
