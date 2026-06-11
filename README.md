# TaskFlow Web

Frontend application for TaskFlow. Built with React 19, TypeScript, and Vite, featuring a modern and responsive todo management interface.

## � Live Demo

**[Visit TaskFlow Live](https://taskflow.emreekincidev.com)**

## �🎯 Features

- **User Authentication**: Registration, login, logout operations
- **Email Verification**: Email confirmation after registration
- **Password Management**: Password change and reset
- **Todo Management**: Create, read, update, delete operations
- **Filtering**: Filter completed/incomplete todos
- **Sorting**: Sort by title, priority, date, and completion status
- **Pagination**: Efficient todo list display
- **Responsive Design**: Mobile and desktop support
- **Profile Management**: User profile and account settings
- **Theme Support**: Light/Dark theme

## 🛠️ Technologies

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **Form Management**: React Hook Form
- **Validation**: Zod
- **UI Icons**: Heroicons
- **HTTP Client**: Fetch
- **Linting**: ESLint

## 📋 Requirements

- Node.js (v18+)
- npm or yarn

## 🚀 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file (refer to `.env.example`):

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:3000
```

## 📦 Project Structure

```
src/
├── main.tsx                     # Application entry point
├── App.tsx                      # Main App component
├── App.css                      # Global styles
├── index.css                    # Global CSS
├── app/                         # App shell and structure
│   ├── app-shell.tsx
│   ├── providers.tsx            # Context providers
│   ├── router.tsx               # Route configuration
│   ├── layouts/                 # Layout components
│   │   ├── AppLayout.tsx        # Main layout
│   │   └── LogRegLayout.tsx     # Auth layout
│   ├── providers/               # Context providers
│   └── routes/                  # Route guard components
│       ├── LandingRoute.tsx
│       ├── ProtectedRoute.tsx
│       └── PublicOnlyRoute.tsx
├── components/                  # Reusable components
│   ├── layout/
│   │   ├── AppHeader.tsx        # Top navigation
│   │   ├── LogRegHeader.tsx     # Auth page header
│   │   └── UserMenu.tsx         # User menu
│   ├── todo/                    # Todo components
│   │   ├── TodoItem.tsx
│   │   ├── TodoModal.tsx        # Create/edit todo modal
│   │   ├── TodoDetailModal.tsx  # Todo details
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── TodoFilters.tsx
│   │   ├── TodosListSection.tsx
│   │   ├── TodosHeader.tsx
│   │   ├── TodosSortSummary.tsx
│   │   ├── TodosPagination.tsx
│   │   └── DeleteConfirmModal.tsx
│   ├── profile/                 # Profile components
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileInfoSection.tsx
│   │   ├── PasswordSection.tsx
│   │   ├── DangerZoneSection.tsx
│   │   └── DeleteAccountModal.tsx
│   └── ui/                      # General UI components
│       ├── FeedbackBanner.tsx
│       ├── StatusBanner.tsx
│       ├── PasswordInput.tsx
│       └── FocusTrap.tsx
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── api.ts               # Auth API calls
│   │   ├── auth-context.tsx     # Auth context
│   │   ├── hooks.ts             # Auth hooks
│   │   ├── schemas.ts           # Zod schemas
│   │   └── types.ts             # TypeScript types
│   ├── todos/                   # Todo feature
│   │   ├── api.ts               # Todo API calls
│   │   ├── hooks.ts             # Todo hooks
│   │   ├── schemas.ts           # Todo schemas
│   │   ├── types.ts             # Todo types
│   │   ├── constants.ts         # Constants (priorities, statuses)
│   │   ├── utils.ts             # Todo utilities
│   │   ├── date-utils.ts        # Date utilities
│   │   ├── priority-utils.ts    # Priority utilities
│   │   └── use-todos-page-query.ts
│   └── profile/                 # Profile feature
│       ├── api.ts               # Profile API calls
│       ├── hooks.ts             # Profile hooks
│       ├── schemas.ts           # Profile schemas
│       └── types.ts             # Profile types
├── lib/                         # Configuration and setup
│   ├── api-client.ts            # Axios instance
│   └── query-client.ts          # React Query setup
├── pages/                       # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── TodosPage.tsx
│   ├── ProfilePage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── ResetPasswordPage.tsx
│   ├── VerifyEmailPage.tsx
│   └── NotFoundPage.tsx
├── utils/                       # General utility functions
│   ├── cn.ts                    # Class name merger (clsx + tailwind-merge)
│   └── error.ts                 # Error utilities
└── assets/                      # Static files
```

## 🔌 Page Routes

- `/` - Home page (unauthenticated)
- `/login` - Login (public only)
- `/register` - Registration (public only)
- `/forgot-password` - Forgot password (public only)
- `/reset-password?token=...` - Reset password
- `/verify-email?token=...` - Verify email
- `/todos` - Todo list (protected)
- `/profile` - User profile (protected)
- `*` - Not found page

## 🔐 Authentication

### Auth Context
Managed in `features/auth/auth-context.tsx`:

- **Current User**: `user` state
- **Login Status**: `isAuthenticated` flag
- **Loading Status**: `isLoading` flag
- **Login Function**: `login(email, password)`
- **Register Function**: `register(email, username, password)`
- **Logout Function**: `logout()`

### Token Management
- Access token: Stored in localStorage
- Refresh token: Stored in secure httpOnly cookie
- Token refresh: Automatic on failed API requests

### Protected Routes
`ProtectedRoute` component protects pages requiring authentication.

## 📝 Form Validation

Using React Hook Form and Zod:

```typescript
// Example from auth-schema.ts
const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

All schemas are defined in `features/*/schemas.ts` files.

## 📦 State Management

### React Query
- Todo list and details
- User profile
- Query caching and automatic refresh

### Local State
- Form inputs (React Hook Form)
- Modal open/close states
- UI toggles

## 🎨 Styling System

With TailwindCSS v4:

- **Library**: `@heroicons/react`
- **Utility Classes**: TailwindCSS
- **Class Merge**: `clsx` + `tailwind-merge`
- **Theme**: Light/Dark mode

```typescript
// Example utility
import { cn } from '@/utils/cn'

className={cn(
  'base-classes',
  isActive && 'active-classes'
)}
```

## 🚀 Development

### Start Dev Server
```bash
npm run dev
```

Application opens at `http://localhost:5173`.

### Production Build
```bash
npm run build
```

Optimized production bundle is created in `dist/` folder.

### Preview Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🌐 API Integration

### API Client
`lib/api-client.ts` sets up the Axios instance:

- Base URL: `VITE_API_BASE_URL`
- Auto-send cookies
- Error handling

### API Hooks
Each feature has its own `api.ts` file:

```typescript
// features/todos/api.ts
export const fetchTodos = async (params) => {
  const { data } = await apiClient.get('/todos', { params });
  return data;
};

export const createTodo = async (todo) => {
  const { data } = await apiClient.post('/todos', todo);
  return data;
};
```

### React Query Hooks
Each feature's `hooks.ts` file defines Query hooks:

```typescript
export const useTodos = (params) => {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => fetchTodos(params),
  });
};
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid and layouts

## 🔄 Real-time Updates

Using React Query cache invalidation:

```typescript
// Refresh todo list after creating a todo
queryClient.invalidateQueries({ queryKey: ['todos'] });
```

## 🐛 Error Handling

Consistent error handling with `utils/error.ts`:

- Server errors
- Network errors
- Validation errors

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🎯 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📄 License

ISC

## 👨‍💻 Developer

Emre
