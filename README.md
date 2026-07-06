# Privae Dashboard 🍳

A modern, high-performance administrative panel for **Privae** — a premium marketplace platform designed to connect customers with private chefs. Built on top of **Next.js 15** and **Tailwind CSS v4**, this dashboard serves as the command center for platform administrators to manage chefs, customers, bookings, promotional coupons, and system settings.

---

## ✨ Key Features

- **📊 Centralized Overview**: Interactive admin home page featuring live revenue metrics, gross margins, average bookings, and active customer/chef snapshots.
- **👨‍🍳 Chef Management & Verification**: Detailed chef profile pages, standard/weekend rates, booking histories, and review tallies.
- **🔍 Custom Document Verification**: Dedicated *Verify Chef* checklist modal for checking NID cards, Food Safety Certificates, sex offender background checks, and culinary license images with visual preview links.
- **👥 Customer Management**: Complete overview of registered customers, aggregate ratings, booking metrics, and admin notes.
- **📅 Interactive Booking Log**: Multi-column table powered by TanStack Table, listing detailed booking rates, duration, status, and related profiles.
- **🏷️ Promo Code Engine**: Complete management interface for creating, editing, and disabling promotional discount codes (percentage-based or fixed amounts) with usage limits, date bounds, and audience targets.
- **🔒 Role-Based Middleware**: Secure routing layer guarding dashboard sections to restrict access specifically to `ADMIN` and `SUPER_ADMIN` roles.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Runtime Environment**: React 19 (Server & Client Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Data Tables**: [TanStack Table v8](https://tanstack.com/table/latest) (React Table)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Date Management**: [Day.js](https://day.js.org/) & [Date-fns](https://date-fns.org/)
- **Date Picker**: [React Day Picker v9](https://react-day-picker.js.org/)
- **Popups & Dialogs**: [Radix UI Primitives](https://www.radix-ui.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **Icons**: Lucide React & React Icons

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18.x or later recommended) installed.

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and add the backend API URL:

```env
SERVER_PORT=5014
SERVER_HOST=187.124.93.197
SERVER_URL=http://187.124.93.197:5014/api/v1
NEXT_PUBLIC_IMAGE_URL=http://187.124.93.197:5014/files
```

### 3. Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

Compile and build the optimized production package:

```bash
npm run build
```

---

## 📂 Project Directory Structure

```
├── public/                  # Static assets (favicons, images, logos)
├── src/
│   ├── app/                 # Next.js App Router (Layouts & Pages)
│   │   ├── (AuthLayout)/    # Authentication routes (Login form, welcome)
│   │   ├── (CommonLayout)/  # Main dashboard layout routes
│   │   │   ├── admin/       # Access rules, platform fees, categories
│   │   │   ├── bookings/    # Bookings logs & details
│   │   │   ├── chefs/       # Chef directory, profiles, & verification modals
│   │   │   ├── customers/   # Customer records & notes
│   │   │   ├── messaging/   # Live support chat interface
│   │   │   └── payments-and-discounts/  # Coupon manager & transaction logs
│   │   ├── assets/          # Static images imported in components
│   │   ├── globals.css      # Core theme settings & custom CSS components
│   │   └── layout.tsx       # Root layout containing fonts & global providers
│   ├── components/
│   │   ├── button/          # BackButton and navigational components
│   │   ├── cui/             # Custom reusable UI blocks (AvatarImage, Modal)
│   │   ├── layout/          # Dashboard wrapper (Header, Sidebar, titles)
│   │   ├── table/           # General TanStack Table configurations
│   │   └── ui/              # Radix UI low-level primitives (Dialog, Select)
│   ├── constants/           # Static data arrays and config mappings
│   ├── enums/               # TypeScript Enums (User roles, status values)
│   ├── helpers/             # Client actions (modal toggle, route cache refresh)
│   ├── hooks/               # Custom React hooks (search params syncing)
│   ├── tableColumns/        # Separated column definitions for TanStack tables
│   ├── types/               # TypeScript shared interface files
│   ├── utils/               # Common helper files (myFetch client, formatUrl)
│   └── middleware.ts        # Next.js authentication & route security layer
├── package.json
└── tsconfig.json
```

---

## 🛡️ Security & Route Protection

The project includes a robust routing middleware in [middleware.ts](file:///d:/Sabbir/privae/src/middleware.ts):
- Checks incoming request paths. If a path is private and the user doesn't possess an active `accessToken` cookie, they are redirected to `/login` with a `callbackUrl` parameter.
- Inspects authenticated sessions. When a token is found, it calls the backend `/user/profile` endpoint to fetch the user profile.
- Restricts entry strictly to `ADMIN` and `SUPER_ADMIN` roles. If the user's role does not match, cookies are cleared and the user is routed back to the login screen.

---

## 📦 Custom Core Components

- **`myFetch`**: A robust wrapper around the native browser `fetch` API which automatically appends authorization bearer tokens, handles standard JSON parsing, resolves absolute server URLs from env configs, and catches network exceptions gracefully.
- **`AvatarImage`**: A fail-safe wrapper around Next.js `<Image>` that catches download or 404 image errors using the native `onError` event, automatically swapping broken URLs for a clean user avatar placeholder.
- **`Calendar`**: Custom-tailored React Day Picker calendar styled using Tailwind v4, configured by default to start weeks on **Monday** (`weekStartsOn={1}`).
