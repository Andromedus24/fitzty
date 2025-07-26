# Fitzty - Fashion-First Social Media Platform

A comprehensive fashion-first social media experience blending TikTok's algorithmic virality, Instagram's UX, Bitmoji avatars, and powerful AI fashion utilities.

## 🚀 Features

### Core Features
- **Infinite Scroll Feed** - FYP (For You Page) with AI-powered recommendations
- **Avatar System** - Bitmoji-style customizable avatars with 3D rendering
- **AI Fashion Recommender** - Personalized style recommendations using GPT-4
- **Closet Management** - Digital wardrobe with outfit tracking
- **Fashion Challenges** - Community challenges and competitions
- **Gamification** - XP system, levels, streaks, and unlockable avatar items

### Technical Features
- **Next.js 14** with App Router and TypeScript
- **Prisma ORM** with PostgreSQL database
- **NextAuth.js** for authentication
- **AI Integration** with OpenAI/OpenRouter APIs
- **Three.js** for 3D avatar rendering
- **Tailwind CSS** with ShadCN UI components
- **Vercel Deployment** ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI Engine**: OpenAI GPT-4o via OpenRouter
- **Avatar Rendering**: Three.js
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: SWR + React Query
- **Deployment**: Vercel
- **Testing**: Jest + React Testing Library

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis (optional, for caching)
- OpenAI API key
- Pinecone API key (optional, for vector search)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitzty.git
   cd fitzty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/fitzty"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # AI Services
   OPENAI_API_KEY="your-openai-api-key"
   OPENROUTER_API_KEY="your-openrouter-api-key"
   
   # Optional: Pinecone for vector search
   PINECONE_API_KEY="your-pinecone-api-key"
   PINECONE_ENVIRONMENT="your-pinecone-environment"
   
   # Optional: Redis for caching
   REDIS_URL="redis://localhost:6379"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # (Optional) Open Prisma Studio
   npm run db:studio
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
fitzty/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── avatar/        # Avatar management
│   │   │   ├── recommend/     # AI recommendations
│   │   │   ├── closet/        # Closet management
│   │   │   ├── feed/          # Feed API
│   │   │   └── challenge/     # Challenges API
│   │   ├── feed/              # Feed page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── Feed/              # Feed components
│   │   ├── Avatar/            # Avatar components
│   │   ├── Closet/            # Closet components
│   │   ├── Post/              # Post components
│   │   ├── Community/         # Community components
│   │   └── ui/                # ShadCN UI components
│   ├── lib/                   # Utility libraries
│   │   ├── ai/                # AI integration
│   │   ├── avatar/            # Avatar engine
│   │   ├── db/                # Database utilities
│   │   └── utils/             # General utilities
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── tests/                     # Test files
```

## 🧪 Testing

### Run tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test structure
- **Unit tests**: Individual component and function tests
- **Integration tests**: API route tests
- **E2E tests**: Full user flow tests (coming soon)

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**

### Database Setup

1. **Set up PostgreSQL** (Vercel Postgres, Supabase, or PlanetScale)
2. **Update DATABASE_URL** in environment variables
3. **Run migrations**
   ```bash
   npm run db:migrate
   ```

## 📱 API Documentation

### Core Endpoints

#### Feed API
- `GET /api/feed` - Get feed posts (FYP, Friends, Trending)
- `POST /api/feed` - Create new post

#### Avatar API
- `GET /api/avatar` - Get user avatar data
- `POST /api/avatar` - Update avatar configuration
- `PUT /api/avatar` - Unlock avatar items

#### Recommendations API
- `GET /api/recommend` - Get user recommendations
- `POST /api/recommend` - Generate new recommendations

#### Closet API
- `GET /api/closet` - Get user's closet items
- `POST /api/closet` - Add item to closet
- `PUT /api/closet` - Update closet item
- `DELETE /api/closet` - Remove item from closet

#### Challenges API
- `GET /api/challenge` - Get challenges
- `POST /api/challenge` - Create new challenge
- `PUT /api/challenge` - Join/update challenge entry

## 🎮 Gamification System

### XP System
- **Post**: 20 XP
- **Upvote**: 5 XP
- **Comment**: 3 XP
- **Challenge Participation**: 50 XP
- **Daily Streak**: 10 XP

### Level System
- Level = floor(XP / 100) + 1
- Unlock avatar items at higher levels

### Avatar Unlocks
- **Level 5** (500 XP): Hairstyle: Wave Cut
- **Level 10** (1000 XP): Background: Rooftop NYC
- **Level 15** (1500 XP): Clothing: Designer Jacket
- **Level 20** (2000 XP): Accessory: Gold Chain
- **Level 30** (3000 XP): Pose: Dancing

## 🤖 AI Features

### Style Recommendations
- Personalized fashion recommendations based on user behavior
- Style DNA generation
- Outfit analysis and tagging

### Avatar AI
- AI-powered avatar customization suggestions
- Style matching with user preferences

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Code Style
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN UI** for beautiful components
- **Next.js** team for the amazing framework
- **Vercel** for seamless deployment
- **OpenAI** for AI capabilities
- **Three.js** for 3D rendering

## 📞 Support

- **Documentation**: [docs.fitzty.com](https://docs.fitzty.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/fitzty/issues)
- **Discord**: [Join our community](https://discord.gg/fitzty)

---

Built with ❤️ by the Fitzty team
