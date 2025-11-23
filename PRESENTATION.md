# Presentation Script: Multi-Tenant Demo

## Introduction (1 min)

Hello everyone, today I'd like to present my Entry Task - a Multi-Tenant Demo website.

This project demonstrates:
- **Multi-tenant architecture** - One codebase serving multiple clients
- **Internationalization (i18n)** - Supporting English and Chinese
- **SEO optimization** - Server-side rendering with proper meta tags

Let me walk you through the implementation.

---

## Tech Stack (1 min)

For this project, I chose:

- **Next.js 16** with App Router and Server Components
  - Why: Built-in SSR for SEO, excellent developer experience

- **TypeScript** for type safety

- **Tailwind CSS v4** with **Shadcn UI**
  - Why: Rapid development, consistent design system

- **next-intl** for internationalization
  - Why: Native Server Components support, clean API

---

## Project Architecture (2-3 min)

### Multi-Tenant Approach

I implemented a **config-based** multi-tenant approach rather than subdomain-based detection.

**How it works:**

```
npm run dev tenant-a    # Start with Tenant A config
npm run build tenant-b  # Build for Tenant B
```

The start/build script:
1. Updates `tsconfig.json` paths to point to the tenant's config
2. Copies tenant-specific favicon
3. Launches Next.js with the correct configuration

**Why this approach?**

- Simpler deployment - no DNS configuration needed
- Each tenant gets a separate build/instance
- Clear separation of configurations
- Works well for demo purposes

**Trade-offs:**

- Cannot switch tenants at runtime
- Requires separate builds for each tenant

---

### Tenant Configuration

Each tenant has its own folder in `companyList/`:

```
companyList/
├── tenant-a/
│   ├── index.js      # Config (theme, pages, meta keys)
│   └── assets/       # Logo, favicon, banner
└── tenant-b/
    └── ...
```

Tenants can customize:
- **Theme** - Different color schemes (default, dark-blue, purple)
- **Available pages** - Show/hide Profile, Member, Wallet pages
- **Game categories** - Which game types to display
- **SEO meta** - Tenant-specific titles and descriptions

---

### i18n Structure

I used a modular dictionary structure:

```
i18n/dictionaries/
├── en/
│   ├── home.json
│   ├── meta.json     # Includes tenant-specific SEO
│   └── ...
└── zh/
    └── ...
```

Each tenant has its own namespace in `meta.json`:

```json
{
  "tenant-a": {
    "title": "Tenant A Gaming",
    "description": "Premium sports betting platform..."
  }
}
```

This allows **per-tenant, per-language** SEO meta.

---

## Key Features Demo (2-3 min)

### 1. Theme Switching

- **tenant-dev**: Default green theme
- **tenant-a**: Dark blue theme
- **tenant-b**: Purple theme

### 2. Page Visibility Control

| Tenant | Profile | Member | Wallet |
|--------|---------|--------|--------|
| A      | Yes     | No     | No     |
| B      | No      | Yes    | Yes    |

### 3. Language Switching

- Navigate to `/settings`
- Click language button to switch between EN/ZH
- All content updates, including SEO meta tags

### 4. SEO

- Open DevTools → Elements → `<head>`
- Show `<title>`, `<meta name="description">`, `<meta property="og:*">`
- These change based on tenant AND language

---

## Challenges & Solutions (1 min)

### Challenge 1: Tenant-specific assets with TypeScript

**Problem:** How to import different assets based on tenant?

**Solution:** Use `tsconfig.json` path aliases that get rewritten at start/build time:

```json
{
  "paths": {
    "@assets/*": ["./companyList/tenant-a/assets/*"]
  }
}
```

### Challenge 2: Per-tenant SEO with i18n

**Problem:** Each tenant needs different SEO meta, AND it should be translated.

**Solution:** Use i18n keys in tenant config, not hardcoded strings:

```js
meta: {
  titleKey: 'tenant-a.title',  // Points to i18n dictionary
}
```

---

## Future Improvements (30 sec)

If I had more time, I would add:

1. **Runtime tenant switching** - Using subdomain or URL parameter
2. **Parallel builds** - Build all tenants simultaneously
3. **Unit tests** - Component and integration tests
4. **sitemap.xml / robots.txt** - For better SEO

---

## Summary

This project demonstrates:

- A scalable multi-tenant architecture
- Proper SEO implementation with SSR
- Clean internationalization structure
- TypeScript + modern React patterns

The architecture is designed to be **maintainable** and **extensible** - adding a new tenant requires just a few configuration files.

---

## Q&A Preparation

### Q: Why not use subdomain-based tenant detection?

A: Subdomain approach requires DNS configuration and more complex deployment. The config-based approach is simpler for demo purposes, and the architecture can be extended to support subdomains if needed.

### Q: How would you handle database per tenant?

A: Each tenant build could connect to a different database via environment variables. The current architecture supports this - just add `DATABASE_URL` to tenant config.

### Q: What about shared components between tenants?

A: All components in `/components` are shared. Only assets and configuration differ per tenant. This keeps the codebase DRY while allowing customization.

### Q: How does this scale with many tenants?

A: Current approach works well for 10-20 tenants. For hundreds of tenants, I'd recommend moving to runtime tenant detection with a database-driven config.

---

## Thank You

Questions?
