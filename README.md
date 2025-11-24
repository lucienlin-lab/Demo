# 🏢 Multi-Tenant Demo

A demo website built with Next.js 16, featuring multi-tenant architecture,
internationalization (i18n), and SEO optimization.

## Index

- [Get Started](#-getting-started)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture Notes](#-architecture-notes)
- [How to Add a New Tenant](#-how-to-add-a-new-tenant)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Change directory
cd demo

# Install dependencies
npm install

# Start with default tenant (tenant-dev):
npm run dev
```

Then the app will be available at http://localhost:3000

#### To start with specific tenant

```bash
# Tenant A
npm run dev tenant-a

# Tenant B
npm run dev tenant-b
```

#### Build for Production

```bash
# Build for a specific tenant
npm run build tenant-a
```

#### Available Routes

- `/`, `/en` or `/zh` - Home page
- `/profile` - Profile page
- `/member` - Member page
- `/wallet` - Wallet page
- `/settings` - Settings page with language switcher

> _Note: Available routes may vary depending on the tenant's valid_page configuration._

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.0.3** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **Shadcn UI** - Accessible component library
- **Lucide React** - Icon library

### Internationalization

- **next-intl 4.5.3** - i18n solution with Server Components support
- Modular dictionary structure for easy maintenance & extended

### Development Tools

- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting

## 📁 Project Structure

```tree
root/
├── app/
│ ├── [lang]/ # Dynamic language routing
│ │ ├── (pages)/ # Route group for pages
│ │ │ ├── profile/
│ │ │ ├── member/
│ │ │ ├── wallet/
│ │ │ └── settings/ # Settings page with language switcher
│ │ ├── layout.tsx # Root layout with metadata generation
│ │ ├── page.tsx
│ │ └── globals.css
│ └── icon.svg # Favicon (auto-copied per tenant)
│
├── companyList/ # Multi-tenant configurations
│ ├── tenant-dev/
│ │ ├── index.js # Tenant config
│ │ └── assets/ # Tenant-specific assets
│ │ ├── banner.webp
│ │ ├── logo.svg
│ │ └── favicon.svg
│ ├── tenant-a/
│ └── tenant-b/
│
├── components/
│ ├── ui/ # Shadcn UI components
│ ├── Header.tsx
│ ├── Logo.tsx # Tenant logo component
│ ├── Navbar.tsx
│ └── Navigation.tsx # next-intl navigation exports
│
├── i18n/
│ ├── dictionaries/ # Translation files
│ │ ├── en/
│ │ └── zh/
│ ├── config.ts # Dictionary loader
│ └── routing.ts # Locale routing configuration
│
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
├── scripts/
│ ├── start.js # Development script with tenant setup
│ └── build.js # Production build script
│
├── proxy.ts # next-intl middleware
├── next.config.ts
└── tsconfig.json
```

## 📐 Architecture Notes

### Multi-Tenant Approach

This project uses a **config-based** multi-tenant approach rather than subdomain-based detection. Each tenant is identified at build/start time via command-line argument or environment variable.

**How it works:**

1. Run `npm run dev tenant-a` or `npm run build tenant-a`
2. The script updates `tsconfig.json` paths to point to the tenant's config and assets
3. Tenant-specific favicon is copied to `app/icon.svg`
4. Next.js builds/serves with the tenant's configuration

**Why this approach?**

- Simpler deployment (no DNS/subdomain setup required)
- Each tenant can be deployed as a separate instance
- Clear separation of tenant configurations
- Easier to manage in development

**Trade-offs:**

- Cannot switch tenants at runtime without restart
- Each tenant requires a separate build for production

### SEO Implementation

- Each tenant has its own i18n meta namespace (`tenant-a.title`, `tenant-b.title`, etc.)
- OpenGraph tags are automatically generated from tenant's meta configuration
- Server-side rendering ensures search engine crawlability

## ➕ How to Add a New Tenant

**Step 1: Create Tenant Directory**

```bash
  # Create a new tenant folder
  mkdir -p companyList/tenant-new

  # Create assets folder for tenant-specific resources
  mkdir -p companyList/tenant-new/assets
```

**Step 2: Create Tenant Configuration**
Create companyList/tenant-new/index.js:

```js
//index.js

export default {
  tenantId: 'tenant-new',
  tenantName: 'New Tenant',

  // Choose theme: 'default' | 'dark-blue' | 'purple'
  theme: 'default',

  // Define available game types
  games: ['electron', 'fish', 'sport', 'lottery', 'live'],

  // Control page visibility
  valid_page: {
    profile: true,
    member: true,
    wallet: true
  },

  // SEO metadata (using i18n keys)
  meta: {
    titleKey: 'tenant-new.title',
    descriptionKey: 'tenant-new.description',
    keywordsKey: 'tenant-new.keywords'
  }
}
```

**Step 2.1: Add i18n Meta (Required)**
Add tenant meta to `i18n/dictionaries/en/meta.json` and `zh/meta.json`:

```json
{
  "tenant-new": {
    "title": "New Tenant Gaming",
    "description": "Your custom description here",
    "keywords": "gaming, entertainment"
  }
}
```

**Step 3: Add Tenant Assets**

```bash
# Add tenant-specific images
cp your-banner.webp companyList/tenant-new/assets/banner.webp
cp your-logo.svg companyList/tenant-new/assets/logo.svg
cp your-favicon.svg companyList/tenant-new/assets/favicon.svg
```

> **Note:** `logo.svg` and `favicon.svg` are required. You can copy from existing tenants as a starting point.

**Step 4: Test the New Tenant**

```bash
# Start development server with the new tenant
npm run dev tenant-new

# Build for production
npm run build tenant-new
```

**Step 5: Verify Configuration**

Visit http://localhost:3000 and check:

- [ ] Theme is applied correctly
- [ ] Language switching works in `/settings`
- [ ] Only enabled pages appear in navigation
- [ ] Page title and meta tags are updated (check browser DevTools)
