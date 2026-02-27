# Rails Inertia Starter

A modern Rails application built with Inertia.js, React, Vite, and shadcn/ui components.

## Tech Stack

- **Ruby on Rails 8** - The backend framework
- **Inertia.js for Rails** - Seamlessly build single-page apps without building an API
- **React 18** - The frontend library
- **Vite** - Fast frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible React components

## Getting Started

### Prerequisites

- Ruby 3.4+
- Node.js 18+
- SQLite3

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rails-inertia-starter
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Setup the database:
```bash
rails db:create db:migrate
```

5. Start the development servers:

In one terminal:
```bash
./bin/dev
```

Or start them separately:

Terminal 1 (Vite frontend):
```bash
npm run dev
```

Terminal 2 (Rails backend):
```bash
rails server
```

6. Visit `http://localhost:3000`

## Project Structure

```
app/
├── controllers/       # Rails controllers
├── frontend/          # React frontend
│   ├── components/   # React components
│   │   └── ui/       # shadcn/ui components
│   ├── entrypoints/  # Vite entry points
│   ├── lib/          # Utility functions
│   └── pages/        # Inertia page components
└── views/            # Rails views (layouts)
```

## Usage

### Creating a new Inertia page

1. Create a controller action:
```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    render inertia: 'Posts/Index', props: {
      posts: Post.all
    }
  end
end
```

2. Create the corresponding React page:
```tsx
// app/frontend/pages/Posts/Index.tsx
import { Head } from '@inertiajs/react'

export default function Index({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head title="Posts" />
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </>
  )
}
```

3. Add the route:
```ruby
# config/routes.rb
resources :posts, only: [:index]
```

### Using shadcn/ui components

Components are available in `app/frontend/components/ui/`:

```tsx
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

<Button variant="default">Click me</Button>
```

## Adding more shadcn/ui components

Visit [shadcn/ui documentation](https://ui.shadcn.com) and copy component code into `app/frontend/components/ui/`.

## License

MIT

