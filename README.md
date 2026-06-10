# SyntraAid Frontend (Complete)

Built on the team's approved design. Content aligned strictly to the six reference documents.
HTML + Tailwind (CDN) + Vanilla JS. Responsive on desktop and mobile.

## Shared core
- js/config.js  : set the backend URL (window.API_BASE)
- js/auth.js    : session (token + user), role-based redirects, route guards
- js/api.js     : fetch wrapper, Bearer token, parses { success, data, message }
- js/layout.js  : the shared dashboard shell (sidebar + header). Every dashboard
                  screen inherits this; per-role nav, responsive mobile drawer.

## Screens
Public: home, about, features, contact, privacy, 404
Auth:   onboarding-login, onboarding-signup, forgot-password, resetpassword,
        Accountpending, onboarding-intro, onboardingmain
Admin (13): dashboard, projects, project-create, project-detail, task-board,
        volunteers, volunteer-profile, invite, attendance, reports, transparency,
        donors, settings
Coordinator (4): dashboard, projects, volunteers, attendance
Volunteer (7): dashboard, tasks, task-detail, attendance, profile, profile-setup,
        project-overview
Donor (5): dashboard, projects, project-detail, funding-summary, project-history

## Run
1. Set the backend URL in js/config.js (local: http://localhost:5000/api,
   or the live Railway URL once deployed).
2. Serve the folder (e.g. VS Code Live Server). Do not double-click files; the
   API calls and saved login session need a served context.
3. Log in with a seeded account; you land on the dashboard for your role.

## Alignment notes (removed/replaced per documents)
- No email-verification screens (backend uses invite token + admin activation).
- No money/funds, no "lives impacted", no events, no teams, no messaging.
- Donor views never show volunteer personal contact details.
- Notifications are in-app only.
