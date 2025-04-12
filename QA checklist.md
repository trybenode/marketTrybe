# Production QA Checklist – React Native + Firebase E-commerce App

A developer-focused pre-launch and maintenance checklist for production-grade mobile commerce.

---

## 🚀 Core Functionality

- [ ] User Authentication (Login, Signup, Logout)
- [ ] User Profile edit and Update, Kyc functionality
- [ ] Product listing, detail, editing, deleting and search pages work
- [ ] Messaging system for order fulfillment
- [ ] loading state on screens with image to prefetch data
- [ ] Checkout flow handles all errors and states
- [ ] Order Messages are recorded correctly by user ID
- [ ] Favorite product fetches per-user successfully

---

## 🔐 Firebase Security & Backend

- [ ] Firebase rules restrict read/write based on `auth.uid`
- [ ] Users can't access other users’ data
- [ ] Products are read-only unless admin
- [ ] Firestore `runTransaction` or `batchWrite` used for atomic updates
- [ ] Use `serverTimestamp()` for all timestamps
- [ ] Uploads secured in Firebase Storage
- [ ] Cloud Functions or Remote Config for sensitive logic (optional)

---

## 🧠 Race Conditions & State Safety

- [ ] Async state uses previous value (functional update)
- [ ] Buttons/actions are disabled during async ops {message sending, product delete, update etc}
- [ ] Debounce/throttle applied on search
- [ ] No optimistic updates unless server-confirmed

---

## ⚙️ Performance & Optimization

- [ ] `FlatList` optimized (`keyExtractor`, `initialNumToRender`)
- [ ] Images cached, compressed and lazy loaded
- [ ] fallback spinners or loaders present
- [ ] Memoization (`React.memo`, `useCallback`, `useMemo`) in use
- [ ] Large components dynamically imported
- [ ] Pagination or infinite scroll implemented
    
---

## 🧩 State & Data Consistency

- [ ] Global state managed with Zustand / Redux Toolkit
- [ ] local data synced with Firestore/localStorage
- [ ] App gracefully handles state after reload
- [ ] Consistent single source of truth enforced
- [ ] re render, null state handled gracefully

---

## 🐞 Crash Reporting & Monitoring

- [ ] Sentry or Firebase Crashlytics integrated
- [ ] Global error handler (via `ErrorUtils`)
- [ ] Error boundaries around UI zones
- [ ] Firebase Performance Monitoring enabled
- [ ] Analytics for key events (`message` `search`)

---

## 🌐 Network & Offline Experience

- [ ] Network failures show appropriate UI feedback
- [ ] Firebase offline persistence enabled
- [ ] AsyncStorage/Zustand for favorite caching
- [ ] Retry logic for important mutations (e.g., order submission)
- [ ] Drag down to refresh page

---

## 📱 Expo & EAS Config

- [ ] Hermes engine enabled in `app.json`
- [ ] Strip console logs in production builds
- [ ] Proper app icons, splash screen, and permissions
- [ ] OTA updates via Expo Updates (optional)
- [ ] Distinct environments (dev, staging, prod)

---

## 🎛️ Feature Flags & Admin Control

- [ ] Firebase Remote Config to toggle features
- [ ] Feature rollout toggled via backend
- [ ] Admin panel access gated securely
- [ ] Firebase billing alerts set (avoid unintentional charges)

---

## 🧪 QA Testing

- [ ] Manual QA of all major flows
- [ ] Tested across multiple screen sizes/devices
- [ ] Offline + slow network scenarios tested
- [ ] Firestore Emulator tested locally
- [ ] Component unit tests exist
- [ ] Beta Testing
- [ ] Firebase Testing
- [ ] Optional: Detox or Playwright E2E tests

---

## 📈 Scaling Strategy

- [ ] Modular component structure in place
- [ ] Modular component structure in place
- [ ] Feature toggles / Remote Config supports future features
- [ ] Plan for Algolia / Typesense for full-text search
- [ ] Skills and services
- [ ] Apartment Listing
- [ ] Book rent/ swap/ sharing
- [ ] Modify sellscreen to first type of service to upload
- [ ] AI powered chat bot
- [ ] Prepared to split backend load if necessary

---

> 🔒Let's Keep it clean, fast, and secure — users will feel the difference.
