# Poojaghar

**Poojaghar** is an AI-powered Festival & Ritual Assistant — a full-stack web app that helps Indian families (and NRIs) perform pujas and festivals correctly, with the option to book live video-call sessions with certified Panditjis.

🔗 **Live app:** https://poojaghar-719369704160.asia-southeast1.run.app

## Problem

- Young Indians are increasingly disconnected from traditional rituals due to modern lifestyles and lack of accessible guidance.
- Families struggle with the correct steps for pujas, vratas, and festivals, leading to incomplete or incorrect observances.
- Rituals vary significantly by region, making it hard for modern households to navigate diverse traditions.
- Finding a knowledgeable Panditji at the right time is increasingly difficult, especially in urban areas and abroad.
- NRIs face real challenges maintaining cultural continuity from a distance.

## Solution

Poojaghar bridges this gap with AI + human connection: an AI Ritual Guide for step-by-step guidance, paired with the option to book a **live video-call puja** with a certified, verified Panditji — combining authenticity with convenience.

## Core Features

- **AI Ritual Guide** — step-by-step guidance for any ritual, personalized to family tradition
- **Festival Calendar** — auspicious timings and reminders for major Indian festivals
- **Region-Based Variations** — customized rituals for Tamil, Bengali, Gujarati, Marathi, and other traditions
- **Samagri List** — intelligent, personalized pooja item lists per ritual
- **Mantra & Pronunciation** — audio playback and pronunciation guidance
- **Kids Learning Mode** — fun, simplified cultural content for children
- **Live Panditji Video Call Booking** — book certified priests by ritual, language, and region for real-time guided ceremonies

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion (`motion`), Lucide icons
- **Backend:** Express (Node.js), TypeScript, `tsx`
- **AI:** Google Gemini (`@google/genai`)
- **Data/Auth:** Firebase (Firestore + Auth), with `firestore.rules` for access control
- **Build:** Vite + esbuild for production server bundling

## Project Structure

```
Poojaghar/
├── src/
│   ├── App.tsx                 # Main React app
│   ├── main.tsx                  # React entry point
│   ├── index.css                 # Tailwind styles
│   ├── types.ts                  # Shared TypeScript types
│   ├── firebase.ts               # Firebase client config & state types
│   ├── firebase-applet-config.json
│   └── assets/images/            # Panditji photos, ritual/festival imagery
├── server.ts                    # Express backend server
├── firestore.rules              # Firestore security rules
├── firebase-blueprint.json      # Firebase project blueprint
├── security_spec.md             # Security specification
├── index.html                  # App entry HTML
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example                # Required environment variables (see below)
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
GEMINI_API_KEY=your_gemini_api_key
APP_URL=your_deployed_app_url
```

`GEMINI_API_KEY` powers the AI ritual guidance; `APP_URL` is used for self-referential links and callbacks.

## Running Locally

**Prerequisites:** Node.js

```bash
git clone https://github.com/sanskarmishra11/Poojaghar.git
cd Poojaghar
npm install
# Set GEMINI_API_KEY in .env.local
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## Security

Firestore access is governed by `firestore.rules`. See `security_spec.md` for the full security specification, covering authentication, data access boundaries, and Panditji verification handling.

## Business Model

- **Freemium:** Free basic festival guides & reminders; Premium unlocks personalized rituals, mantra library, kids' cultural stories, and advanced guides.
- **Panditji revenue stream:** Commission on live puja bookings, monthly Panditji listing subscriptions, and festival surge-demand packages for NRIs.

## Part of the Poojaghar Ecosystem

This repository is the **full-stack live product**. It's complemented by 6 focused subcomponent projects, each demonstrating a specific engineering discipline in isolation:

1. [Poojaghar-UI-UX](https://github.com/sanskarmishra11/Poojaghar-UI-UX) — Frontend design system
2. [Poojaghar-AI-RitualEngine](https://github.com/sanskarmishra11/Poojaghar-AI-RitualEngine) — AI/rule-based ritual guidance engine
3. [Poojaghar-Security-Auth](https://github.com/sanskarmishra11/Poojaghar-Security-Auth) — Authentication & Panditji verification
4. [Poojaghar-VideoCall-Booking](https://github.com/sanskarmishra11/Poojaghar-VideoCall-Booking) — Real-time video booking system
5. [Poojaghar-Mantra-AudioEngine](https://github.com/sanskarmishra11/Poojaghar-Mantra-AudioEngine) — TTS & pronunciation scoring
6. [Poojaghar-Analytics-BusinessDashboard](https://github.com/sanskarmishra11/Poojaghar-Analytics-BusinessDashboard) — Business & revenue analytics

## Vision

*"To bring Indian traditions to every home with the power of AI and real human connection."*

## Author

Sanskar Mishra
