# MS-PRO_Ecosystems

## Overview

MS-PRO_Ecosystems is a B2B industrial services platform for MS-PRO company, specializing in chimney painting, anti-corrosion protection, and MSPRO Quad fireproof coating. The application is designed as an SEO-driven lead generation system with conversion-focused features including interactive pricing calculators, multi-step forms, and real-time notifications.

The platform follows a modular architecture with a React frontend, Express backend, and PostgreSQL database (via Supabase). It uses a content-driven approach for SEO pages with dynamic routing and structured data optimization.

**Status**: MVP Complete - All core features implemented and tested
- ✅ Lead capture system with database persistence
- ✅ Interactive pricing calculator
- ✅ MSPRO Quad presentation module
- ✅ Dynamic SEO pages from JSON
- ✅ Dark mode support
- ✅ Fully responsive B2B design

## User Preferences

Preferred communication style: Simple, everyday language (Russian).

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety and modern component patterns
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management with disabled refetching (staleTime: Infinity)

**UI Framework:**
- shadcn/ui component library (New York style) with Radix UI primitives
- TailwindCSS for styling with custom design system
- CSS variables for theming with light/dark mode support

**Design System:**
- Custom B2B industrial design inspired by Stripe and Linear
- Primary brand colors: Deep professional blue (220 85% 35%) for trust
- Inter font family for excellent Russian character support
- Mobile-first responsive approach for field managers and contractors

**State Management:**
- React Query for API data with custom fetch utilities
- Form state managed via React Hook Form with Zod validation (@hookform/resolvers)
- Local component state for UI interactions

**Module Organization:**
The application uses feature-based modules under `client/src/modules/`:
- `calculator/` - Commercial proposal pricing calculator
- `leads/` - Lead capture and submission forms
- `telegram/` - Telegram notification integration
- `msproquad/` - Product presentation for MSPRO Quad coating

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- ESM module system (type: "module" in package.json)
- Custom request logging middleware for API endpoints

**Database Layer:**
- PostgreSQL via Neon serverless (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries
- Schema defined in `shared/schema.ts` for frontend/backend sharing
- Migrations managed via drizzle-kit in `./migrations` directory

**Storage Interface:**
- Abstract `IStorage` interface in `server/storage.ts`
- Current implementation: `MemStorage` for in-memory development
- Designed to be swapped with PostgreSQL implementation without changing API routes

**API Design:**
- RESTful endpoints prefixed with `/api`
- JSON request/response format
- Session management via connect-pg-simple (PostgreSQL session store)
- CRUD operations abstracted through storage interface

### Content-Driven SEO Architecture

**SEO Strategy:**
- JSON-based content management in `content/seo_core.json`
- Structured data for service pages (chimney painting, anti-corrosion, MSPRO Quad)
- Catch-all routing pattern for dynamic page generation
- Meta tag optimization per service/location

**Content Structure:**
Each SEO entry contains:
- `slug` - URL path
- `title` - Page title for SEO
- `description` - Meta description
- `cta` - Call-to-action text

### Build and Deployment

**Development:**
- `npm run dev` - Runs tsx server with Vite middleware in development mode
- Hot module replacement (HMR) via Vite dev server
- Replit-specific plugins for error overlay and dev tools

**Production:**
- `npm run build` - Vite builds client to `dist/public`, esbuild bundles server to `dist/`
- `npm start` - Runs compiled server in production mode
- Server-side rendering setup in `server/vite.ts` for initial page loads

**Database:**
- `npm run db:push` - Pushes Drizzle schema changes to PostgreSQL

### Authentication & Sessions

**Planned Implementation:**
- User schema defined with username/password fields
- Session storage via connect-pg-simple with PostgreSQL backing
- Password hashing (implementation pending)
- API routes will use storage interface for user CRUD

### Form Handling

**Architecture:**
- React Hook Form for form state and validation
- Zod schemas via @hookform/resolvers for runtime validation
- Drizzle-zod integration for generating validation schemas from database models
- Multi-step form patterns for lead capture workflow

## External Dependencies

### Database & Backend Services

**Neon PostgreSQL:**
- Serverless PostgreSQL provider
- Connection via `@neondatabase/serverless` package
- Database URL configured via `DATABASE_URL` environment variable
- Used through Drizzle ORM for type safety

**Supabase (Planned):**
- PostgreSQL database alternative/supplement
- Client configuration placeholder in `client/src/lib/supabase.ts`
- Will integrate via Drizzle ORM for consistency

### Third-Party APIs

**Telegram Bot API (Planned):**
- Real-time lead notifications to MS-PRO team
- Module placeholder in `client/src/modules/telegram/`
- Integration logic to be implemented

**Email Service (Planned):**
- Email utilities placeholder in `client/src/lib/email.ts`
- For lead confirmation and customer communication

**Geo-Targeting (Planned):**
- Geographic targeting utilities in `client/src/lib/geo.ts`
- For location-based content and lead routing

### UI Component Libraries

**Radix UI:**
- Headless component primitives for accessibility
- Comprehensive set: Accordion, Dialog, Dropdown, Popover, Toast, Tabs, etc.
- Provides keyboard navigation and ARIA attributes

**shadcn/ui:**
- Pre-styled Radix components with TailwindCSS
- Customizable via `components.json` configuration
- New York style variant selected

### Development Tools

**Replit Integration:**
- `@replit/vite-plugin-runtime-error-modal` - Development error overlay
- `@replit/vite-plugin-cartographer` - Code navigation
- `@replit/vite-plugin-dev-banner` - Development environment banner
- Conditionally loaded only in Replit development environment

### Asset Management

**Brand Assets:**
- Stored in `public/brend/` directory
- Includes logos and marketing images
- Accessible via Vite's public directory serving

### Typography

**Google Fonts:**
- Inter - Primary font for UI and content
- Architects Daughter, DM Sans, Fira Code, Geist Mono - Additional fonts loaded
- Optimized loading via preconnect to fonts.googleapis.com