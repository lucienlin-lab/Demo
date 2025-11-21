# 🧭 Entry Task: Multi-Tenant React Website Development

### 🎯 Objective

This task is designed to help you get familiar with our frontend technology stack and coding standards.
You are required to build a React website that supports SEO optimization, multi-language localization, and a multi-tenant architecture.

---

### 📦 Task Overview

You will build a React-based website with the following requirements:

### 🧱 1. Page Structure

The website should include at least the following three pages:

- Home
- Member
- Profile

You can freely design the page content (simple text or demo components are fine).
The focus should be on architecture, scalability, and routing design, not on UI details.

---

### 🔍 2. SEO-Friendly

The website should be SEO-friendly. Requirements include:
Each page should have its own unique title and meta information.

The page structure should be crawlable by search engines (avoid relying entirely on client-side rendering).

Each page should be able to define tags such as:
xml

```xml
<title>, <meta name="description">, <meta property="og:...">, etc.
```

---

### 🌐 3. Multi-language Support

The website should support at least two languages (e.g., English and Chinese),
and include:

- Page content that updates according to the selected language.
- A language switcher (button or dropdown).
- A project structure that can be easily extended to support more languages.

---

### 🏢 4. Multi-Tenant Architecture

The same codebase should support multiple tenants (sites), each with a distinct experience.
Different tenants may have different:

- Page routes
- Layouts or designs
- Theme styles

#### Example

|  Tenant  | Available Pages |             Design Style             |
| :------: | :-------------: | :----------------------------------: |
| Tenant A |  Home, Member   |      Blue theme, simple layout       |
| Tenant B |  Home, Profile  | Red theme, slightly different layout |

#### Requirements

The app should be able to identify the current tenant (e.g., via subdomain, query parameter, or config).

- Different tenants can display different content or designs under the same route path.

- Different tenants may have different available routes.

#### Example

- https://tenant-a.localhost:3000/home → Blue theme, contains Home and Member pages

- https://tenant-b.localhost:3000/profile → Red theme, contains Home and Profile pages

---

### ⚙️ Technical Requirements

- Use React (you may choose any framework such as Next.js, Remix, or Vite).

- Use TypeScript.

- Use any styling approach you’re comfortable with (e.g., Tailwind, styled-components, vanilla-extract, etc.).

- The project structure should be clear, maintainable, and modular, demonstrating good scalability.

- Use functional components and React Hooks.

- Include a simple README that explains how to run and configure the project.

---

### 🧩 Bonus (Optional)

If time allows, you can include the following:
Simulated data fetching for different tenants (Mock API).

- Unit tests for some components (e.g., React Testing Library or Jest).

- Add a sitemap.xml or robots.txt file.

- Design the architecture so that it can scale to allow a large team to work on it without a lot of conflict.

---

### 📁 Deliverables

Please submit the following upon completion:
Git repository URL (GitHub / GitLab).

- README.md including:
  - Instructions on how to start the project

  - Explanation of tenant detection and configuration

  - Steps to add a new tenant

- (Optional) A short video demo (2–3 minutes) showing the site’s functionality and structure.

---

### ✅ Evaluation Criteria

| Category           | Description                                         |
| ------------------ | --------------------------------------------------- |
| Code Quality       | Clean, readable, and maintainable code              |
| Architecture       | Well-structured and scalable design                 |
| Functionality      | Meets all required features                         |
| SEO Implementation | Proper usage of meta tags and page titles           |
| Localization       | Language switching works correctly                  |
| Multi-Tenant Logic | Tenant-specific routes and layouts behave correctly |
| Documentation      | Clear and complete README                           |

---

### 📘 Notes

- The expected duration for this task is one week. Please manage your time accordingly.

- If you encounter challenges, document your thought process and solutions — this will be part of the evaluation.

- You may follow your past project best practices for code style, directory structure, and naming conventions.
