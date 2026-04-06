# GitHub Copilot Instructions for Web

## Project Overview
This project is the frontend of a full-stack todo app.

Tech stack:
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod

The frontend must be mobile-first and responsive from the beginning.

---

## General Rules
- Prefer simple, readable code over clever abstractions.
- Do not overengineer.
- Keep components focused and easy to understand.
- Follow the existing project structure unless explicitly asked to refactor.
- Reuse existing API contracts instead of inventing new request or response shapes.
- Favor practical product code over premature architecture.

---

## File Structure
Use this structure unless explicitly requested otherwise:

src/
  app/
    router.tsx
    providers.tsx

  pages/
    LandingPage.tsx
    LoginPage.tsx
    RegisterPage.tsx
    TodosPage.tsx
    ProfilePage.tsx

  components/
    ui/
    layout/
    todo/
    profile/
    auth/

  features/
    auth/
      api.ts
      hooks.ts
      schemas.ts
      types.ts

    todos/
      api.ts
      hooks.ts
      schemas.ts
      types.ts

    user/
      api.ts
      hooks.ts
      schemas.ts
      types.ts

  lib/
    api-client.ts
    query-client.ts
    utils.ts

  hooks/
  types/
  main.tsx
  index.css

- `src/app` for app-level setup such as router and providers
- `src/pages` for route-level pages
- `src/components` for reusable UI components
- `src/features/auth` for auth-specific API, hooks, schemas, and types
- `src/features/todos` for todo-specific API, hooks, schemas, and types
- `src/features/user` for user-specific API, hooks, schemas, and types
- `src/lib` for shared utilities such as API client and query client

Keep feature-specific logic inside feature folders.

---

## Frontend Goals
The app should feel:
- clean
- modern
- minimal
- fast
- responsive
- mobile-friendly

Primary pages:
- `/` landing page
- `/login`
- `/register`
- `/todos`
- `/profile`

---

## Responsive Design Rules
- Always design mobile-first.
- Every page and component must work on small screens first.
- Then scale up for tablet and desktop.
- Do not leave responsive design for later.
- Avoid desktop-only layouts.
- Use simple stacked layouts on mobile.
- Use larger layouts only when screen size allows.

---

## Styling Rules
- Use Tailwind CSS.
- Prefer generous spacing and clean layout.
- Prefer soft borders, rounded corners, and subtle shadows.
- Keep visual hierarchy strong and uncluttered.
- Avoid flashy or overly colorful UI.
- Use color carefully for priority, states, and alerts.
- Completed todos should look visually muted.
- Do not add dark mode unless explicitly requested.

---

## Forms
- Use React Hook Form for form state and submission.
- Use Zod for validation.
- Keep validation messages short and user-friendly.
- Match frontend validation to backend contracts when practical.
- Use a save button instead of auto-save for now.
- Keep form components simple and explicit.

---

## State Management
- Use TanStack Query for server state, fetching, caching, and mutations.
- Do not introduce extra global state libraries unless explicitly needed.
- Keep local UI state inside components when possible.
- Avoid unnecessary global state.

---

## Routing
Pages to support:
- `/` for landing page
- `/login`
- `/register`
- `/todos`
- `/profile`

Use route guards or equivalent logic for authenticated pages.

---

## Auth Flow
The backend uses:
- short-lived access token
- refresh token in HttpOnly cookie

Frontend rules:
- frontend cannot read the refresh token directly
- frontend uses the access token for authenticated API requests
- frontend may restore a session by calling refresh on app startup
- requests that rely on refresh cookie must include credentials

When calling auth endpoints that need cookies, include credentials.

---

## Backend Contract Summary

### Auth Endpoints
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/logout-all`

### User Endpoints
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `PATCH /api/v1/users/me/password`
- `DELETE /api/v1/users/me`

### Todo Endpoints
- `POST /api/v1/todos`
- `GET /api/v1/todos`
- `GET /api/v1/todos/:id`
- `PATCH /api/v1/todos/:id`
- `DELETE /api/v1/todos/:id`

Do not invent alternative endpoint names.

---

## User Contract
User-related UI should align with these fields:
- `id`
- `username`
- `email`
- `createdAt`
- `updatedAt`

Do not expect sensitive fields from the backend.

---

## Todo Contract
A todo may include:
- `id`
- `title`
- `description`
- `priority`
- `completed`
- `dueDate`
- `completedAt`
- `createdAt`
- `updatedAt`
- `userId`

Priority values:
- `LOW`
- `MEDIUM`
- `HIGH`

---

## Todo List Query Rules
The todo list may support query params such as:
- `completed`
- `priority`
- `search`
- `sort`
- `dueBefore`
- `dueAfter`
- `page`
- `limit`

Sorting may include fields such as:
- `createdAt`
- `updatedAt`
- `title`
- `completed`
- `priority`
- `dueDate`

The frontend should map UI filter/sort controls to these query parameters.

---

## Expected Todo UX
The todos page should include:
- a header
- a create todo form
- search
- filtering controls
- sorting controls
- a todo list
- pagination or load-more behavior
- edit and delete actions

Each todo item should support:
- toggle complete
- display title
- display optional description
- display priority
- display optional due date
- edit action
- delete action

---

## Profile UX
The profile page should include:
- profile update form
- password change form
- account deletion section

Keep dangerous actions visually separated.

---

## Landing Page
The `/` route should be a landing page.

It should include:
- hero section
- short product description
- CTA buttons for login and register
- small features section
- clean responsive layout

Do not make it feel like a dashboard.
It should feel like a product landing page.

---

## Loading, Empty, and Error States
Always handle:
- loading states
- empty states
- mutation pending states
- API error states

Examples:
- loading spinner or skeleton
- "No tasks yet" empty state
- inline form errors
- retry option where useful

---

## Component Conventions
Prefer small reusable components.

Examples:
- `TodoForm`
- `TodoList`
- `TodoItem`
- `TodoFilters`
- `ProfileForm`
- `ChangePasswordForm`
- `AuthFormLayout`

Keep API calls and mutation logic out of purely presentational components.

---

## What Copilot Should Avoid
- Do not add unnecessary libraries.
- Do not invent backend fields or routes.
- Do not create desktop-first layouts.
- Do not overabstract simple components.
- Do not add mock data when real API integration is expected.
- Do not rewrite working code without a clear reason.
- Do not introduce Redux or similar state tools unless explicitly requested.

---

## Preferred Workflow
When generating code:
1. Follow the existing folder structure.
2. Keep the UI responsive from the beginning.
3. Match backend contracts exactly.
4. Keep forms simple and type-safe.
5. Prefer readable code over heavy abstraction.
6. Build page first, then wire API, then refactor if needed.

If unclear, choose the simplest implementation that works with the current backend.