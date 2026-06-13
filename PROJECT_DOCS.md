# MEA Investment — Project Documentation

> Full-stack investment web application for the Middle East & Africa region.
> Built with React + Vite, Firebase, and Cloudflare R2.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Pages & Features](#pages--features)
6. [Firebase Setup](#firebase-setup)
7. [Cloudflare R2 + Worker Setup](#cloudflare-r2--worker-setup)
8. [Environment Variables](#environment-variables)
9. [Brand & Design System](#brand--design-system)
10. [Investment Flow](#investment-flow)
11. [Investment Statuses](#investment-statuses)
12. [Firestore Collections](#firestore-collections)
13. [Local Development](#local-development)
14. [Deployment](#deployment)
15. [Future Improvements](#future-improvements)

---

## Project Overview

**MEA Investment** is a premium corporate investment platform focused on industrial business growth across the Middle East and Africa. It allows investors to register, select monthly or yearly investment plans, submit bank transfers, upload receipts, and track their investments — all managed through an admin dashboard.

**Live URL:** https://meainvest.web.app
**Firebase Project:** meainvest
**Cloudflare Worker:** https://mea-upload.wishitworker.workers.dev

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Routing | React Router v6 |
| Authentication | Firebase Auth (Email/Password) |
| Database | Firestore (NoSQL) |
| File Storage | Cloudflare R2 |
| Upload API | Cloudflare Worker |
| Analytics | Firebase Analytics |
| Notifications | react-hot-toast |
| Icons | Lucide React |
| Hosting | Firebase Hosting |
| Deployment Config | Cloudflare Pages `_redirects` also included |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│             Browser (React App)             │
│         https://meainvest.web.app           │
└────────────┬──────────────┬─────────────────┘
             │              │
     Auth/DB │              │ File Uploads
             ▼              ▼
┌────────────────┐   ┌──────────────────────┐
│    Firebase    │   │  Cloudflare Worker   │
│  Auth + Firestore  │  mea-upload.workers.dev │
└────────────────┘   └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │   Cloudflare R2      │
                     │   mea-receipts       │
                     │   (bucket)           │
                     └──────────────────────┘
```

**Upload flow:**
```
User picks file
  → POST to Cloudflare Worker (with X-Upload-Token header)
  → Worker validates token
  → Worker stores file in R2 bucket
  → Worker returns public file URL
  → URL saved to Firestore receipts collection
```

---

## Project Structure

```
D:\MEA Investment\
├── public/
│   ├── favicon.svg              # Custom MEA red logo
│   └── _redirects               # Cloudflare Pages SPA redirect
├── src/
│   ├── firebase/
│   │   └── config.js            # Firebase init + isFirebaseConfigured flag
│   ├── contexts/
│   │   └── AuthContext.jsx      # Auth state, register, login, adminLogin
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Responsive sticky navbar
│   │   │   └── Footer.jsx       # Footer with disclaimer
│   │   └── ui/
│   │       ├── GlassCard.jsx    # Reusable glassmorphism card
│   │       ├── Badge.jsx        # Investment status badge
│   │       ├── LoadingSpinner.jsx
│   │       └── ProtectedRoute.jsx  # RequireAuth, RequireAdmin, RedirectIfAuth
│   ├── pages/
│   │   ├── Landing.jsx          # Hero, stats, features, how-it-works preview
│   │   ├── About.jsx            # Mission, values, team
│   │   ├── Plans.jsx            # Monthly/yearly investment plans tabs
│   │   ├── HowItWorks.jsx       # 8-step process + status guide
│   │   ├── Contact.jsx          # Contact form + info
│   │   ├── auth/
│   │   │   ├── Login.jsx        # User login + forgot password
│   │   │   ├── Register.jsx     # User registration
│   │   │   └── AdminLogin.jsx   # Admin-only login
│   │   ├── user/
│   │   │   └── Dashboard.jsx    # Full user dashboard (9 sections)
│   │   └── admin/
│   │       └── Dashboard.jsx    # Full admin dashboard (9 sections)
│   ├── utils/
│   │   └── upload.js            # uploadToR2() — Cloudflare R2 upload helper
│   ├── App.jsx                  # Router + ErrorBoundary + layouts
│   ├── main.jsx                 # React root mount
│   └── index.css                # Tailwind + custom component classes
├── worker/
│   ├── src/
│   │   └── index.js             # Cloudflare Worker — handles R2 uploads
│   └── wrangler.toml            # Worker config (R2 binding, env vars)
├── .env                         # Local secrets (never commit this)
├── .env.example                 # Template for env vars
├── .gitignore
├── firebase.json                # Firebase Hosting config (SPA rewrites)
├── .firebaserc                  # Firebase project alias
├── tailwind.config.js
├── vite.config.js
├── package.json
└── PROJECT_DOCS.md              # This file
```

---

## Pages & Features

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, stats, features, how-it-works preview, CTA |
| About | `/about` | Mission, values, team, compliance notice |
| Plans | `/plans` | Monthly & yearly investment plan tabs |
| How It Works | `/how-it-works` | 8-step process, status guide |
| Contact | `/contact` | Contact form + office info |

### Auth Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User login + forgot password |
| Register | `/register` | User registration (pending admin approval) |
| Admin Login | `/admin/login` | Admin-only login (checks Firestore role) |

### User Dashboard (`/dashboard`) — Sections

| Section | Feature |
|---------|---------|
| Overview | Stats: invested, active investments, projected returns, notifications |
| New Investment | 3-step flow: choose plan → enter amount → confirm |
| My Investments | List all investments with status and return info |
| Upload Receipt | Upload bank transfer receipt to Cloudflare R2 |
| Statements | Download admin-uploaded reports/statements |
| Withdrawal | Request withdrawal for active/completed investments |
| Notifications | View all notifications sent by admin |
| My Profile | View account info and status |
| Support | Submit support ticket |

### Admin Dashboard (`/admin`) — Sections

| Section | Feature |
|---------|---------|
| Dashboard | Analytics overview — users, investments, capital, pending items |
| Users | View all investors, approve/reject accounts |
| Investment Plans | Create, edit, delete, activate/deactivate plans |
| Investments | View all, update status, edit return rate per investment |
| Receipts | View uploaded receipts, approve/reject, view file |
| Withdrawals | Process withdrawal requests — approve/reject |
| Bank Accounts | Manage company bank account details shown to users |
| Notifications | Send notifications to all users or a specific user |
| Site Content | Edit hero title, subtitle, about text |

---

## Firebase Setup

**Project ID:** `meainvest`
**Console:** https://console.firebase.google.com/project/meainvest

### Steps to Enable (required after first deploy)

1. **Authentication**
   - Console → Authentication → Sign-in method
   - Enable **Email/Password**

2. **Firestore Database**
   - Console → Firestore Database → Create database
   - Start in **test mode**
   - Choose nearest region

3. **Storage** *(optional — replaced by Cloudflare R2)*
   - Console → Storage → Get started → Test mode

### Firestore Security Rules (production — replace test mode)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /investments/{doc} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Creating the First Admin User

1. Register normally via `/register`
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document
4. Change `role` field from `"user"` to `"admin"`
5. Change `status` field to `"approved"`
6. Now log in via `/admin/login`

---

## Cloudflare R2 + Worker Setup

### What was set up

| Resource | Name | URL |
|----------|------|-----|
| R2 Bucket | `mea-receipts` | Cloudflare Dashboard |
| Worker | `mea-upload` | `https://mea-upload.wishitworker.workers.dev` |

### Worker Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/upload` | Upload file to R2. Requires `X-Upload-Token` header |
| `GET` | `/file/:key` | Serve file from R2 |
| `OPTIONS` | `*` | CORS preflight |

### Worker Environment Variables

| Variable | Value | How Set |
|----------|-------|---------|
| `MEA_BUCKET` | R2 Binding to `mea-receipts` | `wrangler.toml` |
| `PUBLIC_URL` | `https://mea-upload.wishitworker.workers.dev/file` | `wrangler.toml` |
| `UPLOAD_SECRET` | `mea_secret_2024` | `wrangler secret put UPLOAD_SECRET` |

### Re-deploy Worker

```bash
cd "D:\MEA Investment\worker"
npx wrangler deploy
```

### Change Upload Secret

```bash
cd "D:\MEA Investment\worker"
echo "new_secret_here" | npx wrangler secret put UPLOAD_SECRET
```

Also update `.env`:
```
VITE_UPLOAD_SECRET=new_secret_here
```

Then rebuild and redeploy the app.

---

## Environment Variables

File: `D:\MEA Investment\.env` *(never commit to git)*

```env
# Firebase
VITE_FIREBASE_API_KEY=AIzaSyCtweNeKRAU4THE8A1dlzkjmLZhnp-xXBU
VITE_FIREBASE_AUTH_DOMAIN=meainvest.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=meainvest
VITE_FIREBASE_STORAGE_BUCKET=meainvest.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=505386353241
VITE_FIREBASE_APP_ID=1:505386353241:web:23a0dd60c2ec5dbf80e748
VITE_FIREBASE_MEASUREMENT_ID=G-E7NZ9QRKVX

# Cloudflare R2 Upload Worker
VITE_UPLOAD_WORKER_URL=https://mea-upload.wishitworker.workers.dev/upload
VITE_UPLOAD_SECRET=mea_secret_2024
```

---

## Brand & Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Black | `#050505` | Main background |
| Deep Black | `#111111` | Sidebar, cards |
| Premium Red | `#C1121F` | Primary accent, CTAs |
| Dark Red | `#780000` | Gradient end, hover |
| White | `#FFFFFF` | Text |
| Light Gray | `#F5F5F5` | Light backgrounds |

### Typography
- **Font:** IBM Plex Sans (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

### Key CSS Classes (from `index.css`)

| Class | Description |
|-------|-------------|
| `.glass-card` | Frosted glass card (border + backdrop-blur) |
| `.btn-primary` | Red gradient button with pulse animation |
| `.btn-secondary` | Outlined white button |
| `.btn-ghost` | Transparent hover button |
| `.input-field` | Dark styled form input |
| `.sidebar-item` | Dashboard sidebar nav item |
| `.section-label` | Red uppercase tracking label |
| `.status-badge` | Colored dot + text badge |

### Tailwind Custom Tokens

```js
colors: {
  mea: {
    black: '#050505',
    deep: '#111111',
    red: '#C1121F',
    darkred: '#780000',
    white: '#FFFFFF',
    gray: '#F5F5F5',
  }
}
backgroundImage: {
  'red-gradient': 'linear-gradient(135deg, #C1121F 0%, #780000 100%)',
  'dark-gradient': 'linear-gradient(180deg, #050505 0%, #111111 100%)',
  'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
}
```

---

## Investment Flow

```
1. User registers → admin approves account
2. User selects investment plan (monthly or yearly)
3. App shows company bank account details
4. User transfers money to company bank account
5. User uploads transfer receipt via app → stored in Cloudflare R2
6. Admin reviews receipt in admin dashboard
7. Admin approves payment → investment status changes to "active"
8. Investment runs for agreed duration
9. At end of term, user submits withdrawal request
10. Admin processes payout → investment status changes to "closed"
```

---

## Investment Statuses

| Status | Meaning |
|--------|---------|
| `pending_payment` | Investment created, awaiting bank transfer |
| `receipt_uploaded` | Receipt submitted, pending admin review |
| `under_verification` | Admin is verifying the receipt |
| `approved` | Payment verified and approved |
| `rejected` | Payment or receipt rejected |
| `active` | Investment is live and running |
| `completed` | Term ended, withdrawal available |
| `withdrawal_requested` | User submitted payout request |
| `closed` | Investment fully settled |

---

## Firestore Collections

| Collection | Purpose |
|------------|---------|
| `users` | User profiles — name, email, phone, role, status |
| `investmentPlans` | Plans created by admin — name, type, minAmount, returnRate, duration |
| `investments` | Individual investment records per user |
| `payments` | Payment records |
| `receipts` | Uploaded receipt metadata + R2 file URL |
| `bankAccounts` | Company bank accounts shown to investors |
| `withdrawals` | Withdrawal requests submitted by users |
| `reports` | Statements/reports uploaded by admin for users |
| `notifications` | Notifications sent to users |
| `siteContent` | Editable website content (hero title, subtitle, etc.) |
| `support_tickets` | Support messages from users |

---

## Local Development

### Prerequisites
- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Wrangler (auto-installed via npx)

### Start Dev Server

```bash
cd "D:\MEA Investment"
npm run dev
```

Open: http://localhost:5173

### Start Worker Locally

```bash
cd "D:\MEA Investment\worker"
npx wrangler dev
```

Worker runs at: http://localhost:8787

### Install Dependencies

```bash
cd "D:\MEA Investment"
npm install
```

---

## Deployment

### Deploy Frontend (Firebase Hosting)

```bash
cd "D:\MEA Investment"
npm run build
firebase deploy --only hosting
```

**Live:** https://meainvest.web.app

### Deploy Worker (Cloudflare)

```bash
cd "D:\MEA Investment\worker"
npx wrangler deploy
```

### Deploy Everything at Once

```bash
cd "D:\MEA Investment"
npm run build && firebase deploy --only hosting && cd worker && npx wrangler deploy && cd ..
```

---

## Future Improvements

- [ ] Add Firestore security rules (replace test mode before going public)
- [ ] Add email notifications (Firebase Functions or Resend)
- [ ] Add custom domain (meainvestment.com)
- [ ] Split code into lazy-loaded chunks (reduce 741KB bundle)
- [ ] Add KYC document upload (ID verification)
- [ ] Add investment analytics charts (Chart.js or Recharts)
- [ ] Add PDF statement generation
- [ ] Add two-factor authentication
- [ ] Add R2 public domain (custom domain for file URLs)
- [ ] Move Worker secret to a stronger randomly generated token
- [ ] Add Cloudflare Turnstile (bot protection on register/login forms)

---

## Important Disclaimers

> Investment opportunities are subject to verification, approval, and applicable regulatory requirements. Projected returns are not guaranteed unless officially documented in an approved investment agreement.

- Never use "guaranteed profit" — always say "projected return" or "expected return"
- All investments are "subject to approval" and "subject to investment agreement"
- Disclaimer appears in Footer and Landing page

---

*Documentation created: June 2026*
*Project built with Claude Code (claude-sonnet-4-6)*
