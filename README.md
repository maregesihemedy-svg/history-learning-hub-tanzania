# History Learning Hub Tanzania 🇹🇿

A modern, production-ready web application for browsing, searching, and downloading History teaching and learning materials aligned with the Tanzanian Form I-VI curriculum.

## Features

✨ **For Students & Teachers**
- Browse and search history materials without login
- Download PDF, DOCX, PPTX, and other formats
- Preview materials directly in browser
- Bookmark favorite resources
- Mobile-friendly responsive design
- Fast loading with optimized images

📚 **Tanzanian Curriculum Aligned**
- Form I-VI history topics
- Ancient History, Medieval History, Modern History
- African History, Tanzanian History
- Colonial Period, Independence Movements
- World Wars, Cold War

🔐 **Administrator Dashboard**
- Secure upload system (admin only)
- Edit and delete materials
- View analytics and statistics
- Manage categories and users
- Download tracking

⚡ **Performance & Security**
- Lighthouse Score 95+
- SEO optimized
- Role-based access control
- Secure authentication
- Protected file uploads (100MB max, virus scanned)
- HTTPS, CSRF, XSS, SQL injection protection

## Technology Stack

### Frontend
- **Next.js 15+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching

### Backend
- **Supabase** - BaaS platform
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - File storage

### Deployment
- **Netlify** or **Vercel** - Hosting
- **CDN** - Global content delivery

## Project Structure

```
history-learning-hub-tanzania/
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── (public)/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── hooks/
│   ├── utils/
│   ├── middleware.ts
│   ├── styles/
│   └── config/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
├── .env.local.example
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── eslint.config.js
├── prettier.config.js
├── jest.config.ts
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18.17+
- pnpm or npm
- Supabase account
- GitHub account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/maregesihemedy-svg/history-learning-hub-tanzania.git
cd history-learning-hub-tanzania
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start Supabase:
```bash
supabase start
```

6. Run migrations:
```bash
supabase migration up
```

7. Generate TypeScript types:
```bash
pnpm generate:types
```

8. Start development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

- **users** - User accounts with roles
- **roles** - Role definitions (admin, teacher, student)
- **materials** - History materials/resources
- **categories** - Material categories (Form level, type)
- **downloads** - Download tracking
- **favorites** - User bookmarks
- **activity_logs** - User and system activity

### ER Diagram

```
users (1) ──→ (many) downloads
users (1) ──→ (many) favorites
users (1) ──→ (many) activity_logs

materials (1) ──→ (many) downloads
materials (1) ──→ (many) favorites
materials (1) ──→ (many) activity_logs

categories (1) ──→ (many) materials
```

## Pages

### Public Pages
- **/** - Home page with hero, featured materials, statistics
- **/materials** - Browse all materials with filters
- **/materials/[id]** - Material details and download
- **/about** - About page
- **/contact** - Contact form

### Authentication Pages
- **/auth/login** - Login page
- **/auth/signup** - Sign up page (teacher only)
- **/auth/reset-password** - Password reset

### Protected Pages (Teachers)
- **/dashboard** - Teacher dashboard
- **/favorites** - Bookmarked materials

### Protected Pages (Admin Only)
- **/admin/dashboard** - Admin overview
- **/admin/upload** - Upload materials
- **/admin/materials** - Manage materials
- **/admin/categories** - Manage categories
- **/admin/analytics** - View statistics
- **/admin/users** - Manage users

## Categories (Tanzanian Curriculum)

### Form Levels
- Form I (Ages 13-14)
- Form II (Ages 14-15)
- Form III (Ages 15-16)
- Form IV (Ages 16-17)
- Form V (Ages 17-18)
- Form VI (Ages 18-19)

### Material Types
- Lesson Notes
- Schemes of Work
- Lesson Plans
- Past Papers
- Exam Questions
- Revision Materials
- Assignments
- Textbooks
- Presentations
- Maps & Diagrams
- Historical Documents
- Video Guides

### History Topics (Tanzanian Syllabus)
- Ancient History
- Medieval History
- Modern History
- African Civilizations
- Tanzanian History
- Colonial Period
- Independence Movements
- World Wars & Cold War
- Evolution of Man
- Development of Social & Political Systems
- Colonial Economy
- Nationalism

## Security

✅ Authentication & Authorization
- Email/password authentication
- JWT tokens
- Role-based access control
- Protected API routes

✅ Data Protection
- HTTPS/TLS encryption
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation & sanitization

✅ File Security
- File type validation
- Size restrictions (100MB max)
- Virus scanning
- Secure storage
- Download tracking

✅ Infrastructure
- Supabase Row-Level Security (RLS)
- Environment variables protection
- Secure headers
- CORS configuration

## Performance

- 📊 Lighthouse Score: 95+
- ⚡ Images: Next.js Image optimization
- 🚀 Code splitting & lazy loading
- 💾 Caching strategies
- 🗜️ Compression & minification
- 📱 Mobile-first responsive design

## SEO

- Meta tags & descriptions
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt
- Canonical URLs
- Semantic HTML

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=.next
```

### VPS (Docker)
```bash
docker build -t history-hub .
docker run -p 3000:3000 history-hub
```

## Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:
- 📧 Email: sir.maregesi@example.com
- 💬 WhatsApp: +255 XXX XXX XXX
- 🐛 Issues: [GitHub Issues](https://github.com/maregesihemedy-svg/history-learning-hub-tanzania/issues)

## Author

**Sir Maregesi** - History Teacher, Tanzania 🇹🇿

---

Built with ❤️ for Tanzanian students and teachers learning History
