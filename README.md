# 🏢 Multi-Tenant Demo

A demo website built with Next.js 16, featuring multi-tenant architecture,
internationalization (i18n), and SEO optimization.

## Index

- [Get Start](#-getting-started)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
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

Available Routes

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

<!-- - **Vitest** - Fast unit testing framework -->

- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting

## 📁 Project Structure

```tree
root/
├── app/
│ └── [lang]/ # Dynamic language routing
│ ├── (pages)/ # Route group for pages
│ │ ├── profile/
│ │ ├── member/
│ │ ├── wallet/
│ │ └── settings/ # Settings page with language switcher
│ ├── layout.tsx # Root layout with metadata generation
│ ├── page.tsx
│ └── globals.css
│
├── companyList/ # Multi-tenant configurations
│ ├── tenant-dev/
│ │ ├── index.js # Tenant config
│ │ └── assets/ # Tenant-specific assets
│ ├── tenant-a/
│ └── tenant-b/
│
├── components/
│ ├── ui/ # Shadcn UI components
│ ├── Header.tsx
│ ├── Navbar.tsx
│ └── Navigation.tsx # Main navigation menu
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
│ └── start.js # Development script with tenant setup
│
├── proxy.ts # next-intl middleware
├── next.config.ts
└── tsconfig.json
```

## How to Add a New Tenant

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

  // SEO metadata
  meta: {
    title: 'New Tenant - Gaming Platform',
    description: 'Your custom description here',
    keywords: 'gaming, entertainment'
  }
}
```

**Step 3: Add Tenant Assets (Optional)**

```bash
# Add tenant-specific banner image
cp your-banner.jpg companyList/tenant-new/assets/banner.jpg
```

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
