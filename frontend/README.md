# HydroShield - Submission Bundle (MVP)

This bundle contains the backend (provided) and a lightweight frontend (mocked states + SMS alert UI) for the HydroShield hackathon submission.

## Contents
- backend/ — existing backend with SMS integration (Africa's Talking)
- frontend/ — minimal React frontend (mocked state risks + SMS UI)
- backend/.env.example — environment variables example

## Run backend
1. cd backend
2. npm install
3. create `.env` based on `.env`
4. npm run dev   (or `node server.js`)

## Run frontend
1. cd frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173

Frontend expects backend SMS endpoint at POST `/api/alerts/send-sms`.

## Notes
- Make sure Africa's Talking sandbox recipient number is registered for sandbox testing.
- Do **not** commit `.env` or secret keys to GitHub.
