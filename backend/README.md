# EduCode Backend

Backend API for EduCode. It uses Express for HTTP routes and Supabase for authentication and database storage.

## Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `.env.example` to `.env`.
5. Fill in `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Supabase Project Settings > API.
6. Run:

```bash
npm install
npm run dev
```

The API runs on `http://localhost:3000` by default.

## Main Routes

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /auth/profile`
- `PUT /auth/change-password`
- `GET /modules`
- `GET /modules/:id`
- `GET /progress`
- `POST /progress/lessons/complete`
- `GET /settings`
- `PUT /settings`
