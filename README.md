# Email Analyzer — Full Stack

## Overview

- Backend polls an IMAP mailbox you configure and looks for unseen messages whose subject contains a generated TEST_SUBJECT_TOKEN. When such an email arrives it parses headers and stores the raw + processed data in MongoDB.
- Frontend displays the configured mailbox address and the token, and shows processed emails with their receiving chain and detected ESP.

## Quickstart

1. Install MongoDB and ensure it is running.
2. Setup backend:
   - `cd backend`
   - copy `.env.example` to `.env` and fill values (IMAP and MongoDB URI). If you use Gmail, consider creating an App Password and enabling IMAP.
   - `npm install`
   - `npm run dev` or `npm start`
3. Setup frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
4. Open `http://localhost:3000` and follow instructions on the dashboard — send a test email to the shown mailbox with the token in the subject.

## Notes & Next steps

- For production or automated testing, use webhook-based inbound email providers (Mailgun, Sendgrid, Postmark) rather than IMAP polling — those providers POST to an endpoint when mail arrives.
- The ESP detection uses heuristics (From address domain, Received/Return-Path inspection). You can extend `espDetector.js` to detect custom providers.
- If you want real-time frontend updates, add a WebSocket or Server-Sent Events endpoint and emit `emailProcessed` events from the backend when new mail is processed.

## Troubleshooting

- If you don't see processed emails, check:
  - IMAP credentials in `.env`
  - Server logs (IMAP connection errors)
  - Ensure your mail actually reaches the configured mailbox (spam filters may move it)
