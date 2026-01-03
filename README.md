# Goal Tracker

A lightweight Goal Tracker app built with Angular (frontend) and Express + TypeScript (backend). The app supports creating goals with categories, priorities, due dates, notes, sub-tasks, reminders, and provides a dashboard with charts and filtering. Data is stored locally in LocalStorage by default with an optional Firebase/Firestore sync (not enabled by default).

## 🚀 Features

- Create goals with: title, category (Work, Personal, Fitness, Learning, Other), priority (Low, Medium, High, Urgent), due date, notes, and sub-tasks.
- View goals in a list with progress bars and filtering by category, priority, status, and free-text search.
- Edit and delete goals with immediate UI updates (LocalStorage persistence).
- Sub-task management with automated progress calculation and status updates.
- Reminders: schedule reminders (datetime-local) and receive browser notifications or in-app toasts when due.
- Dashboard with charts (status distribution, goals per category, monthly trends) using Chart.js + ng2-charts.
- Dark / Light theme toggle, responsive layout, and toasts for user feedback.

## 🧩 Project structure

- `frontend/` - Angular app (client)
- `backend/` - Express + TypeScript API (simple in-memory or standalone server used for initial scaffolding)

## 🧰 Prerequisites

- Node.js (18–20 recommended)
- npm

## Getting started (frontend)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run dev server:

```bash
npx ng serve --port 4300 --open
# or
npm start
```

3. Open the app at http://localhost:4300

## Backend (optional)

The backend is a small Express API used initially for examples. The app currently uses LocalStorage for persistence by default.

1. Install dependencies and build/run:

```bash
cd backend
npm install
npm run dev    # runs with nodemon and ts-node
# or
npm run build && npm start
```

2. The server runs on http://localhost:3000 by default.

## Reminders & Notifications

- The app requests Notification permission when you enable reminders. If permission is granted, reminders trigger browser notifications; otherwise a toast will show inside the app.
- Reminders are only active while the app is open (no service worker / push configured). If you want background notifications when the app is closed, consider enabling the Service Worker + FCM option (requires Firebase configuration).

## Firebase (optional)

- The app includes scaffolding to add Firebase + Firestore later for multi-user sync. You can add your Firebase web config and enable Firestore persistence.

## Tests & CI

- Unit tests (Vitest / Angular testing) will be added to the repo. I can scaffold a GitHub Actions workflow to run lint/build/tests on push/PR — tell me and I'll add it.

## Contributing

- Create an issue or a PR with a clear description and test cases. I can help set up a CI workflow and test coverage reporting.

## TODO / Roadmap

- Add Service Worker + FCM for background notifications
- Add server-side storage (Firestore or Postgres) for multi-user support
- Add unit and integration tests + GitHub Actions
- Accessibility and performance improvements

## License

Specify a license (e.g., MIT) based on your preference.

---

If you'd like I can also:
- Set the GitHub repo description via the API or the `gh` CLI (requires authentication)
- Add a `LICENSE` file (e.g., MIT)
- Create a small GitHub Actions CI workflow to build and run tests on push

Tell me what you'd like next and I'll proceed.