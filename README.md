# HELPDESKCRM-service — Local & Hosted Setup Notes

This repository contains a backend (Express/Mongo) in `backend/` and a React frontend in `react-app/`.

Purpose of changes: your frontend is deployed on Vercel and backend on Render. You asked not to use `.env` files, so the API clients were updated to use a top-level constant you can set directly in code.

What to edit before deploying
- Frontend client: open `react-app/src/api/api.js` and set `BACKEND_BASE_URL` to your Render backend root (no `/api`), e.g. `https://my-backend.onrender.com`.
- (Optional) `backend/src/api/api.js` also contains a `BACKEND_BASE_URL` constant if that file is used in a browser context; set it the same way.

Local development / testing
1. Backend
   ```powershell
   cd backend
   npm install
   npm run dev
   ```
   - Backend listens on `PORT` from env or `5000` by default.

2. Frontend
   ```powershell
   cd react-app
   npm install
   npm run dev
   ```
   - Vite dev server usually runs on `http://localhost:5173`.

Quick verification
- Check backend root: `curl http://localhost:5000/` should return `Helpdesk API Running`.
- Ensure `react-app/src/api/api.js` baseURL points at `http://localhost:5000/api` (it will by default when `BACKEND_BASE_URL` is empty).

CORS / Production notes
- `backend/server.js` currently enables CORS broadly (allows all origins). If you want to restrict access, replace `app.use(cors())` with an allowlist including your Vercel domain, for example:

```js
const allowed = ['https://your-frontend.vercel.app', 'http://localhost:5173'];
app.use(cors({ origin: (origin, cb) => !origin || allowed.includes(origin) ? cb(null, true) : cb(null, false) }));
```

Security reminder
- Hard-coding secrets in source is not recommended for production. Setting a `BACKEND_BASE_URL` is fine; do not hard-code private keys or JWT secrets into source.

If you want, I can also:
- inject your actual Render backend URL into the two `api.js` files now (you must provide it),
- create a small script to run both services together via `concurrently`, or
- add more deployment instructions for Vercel/Render (build hooks, health checks).
