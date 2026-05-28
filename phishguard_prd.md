# PhishGuard AI – Project Requirements Document (PRD)

## Project Overview

PhishGuard AI is an AI-powered cybersecurity assistant designed to help users identify phishing attempts, scam messages, suspicious links, and online fraud in real time.

The platform focuses on:
- Cybersecurity awareness
- Explainable AI
- Real-time scam detection
- Beginner-friendly interaction
- Modern AI-powered protection

---

# Project Goals

- Help users detect phishing attempts and scams quickly
- Improve cybersecurity awareness
- Provide explainable AI-generated scam analysis
- Create a simple and accessible platform
- Build a scalable MVP for hackathon presentation

---

# Target Users

- Students vulnerable to fake internships and phishing emails
- General internet users exposed to online scams
- Elderly individuals vulnerable to OTP and banking scams
- Job seekers targeted through fake recruitment messages
- Small organizations lacking cybersecurity awareness tools

---

# Core Features

## AI Scam Message Analyzer
Users can paste suspicious messages, emails, or social media texts for AI analysis.

## Risk Level Detection
The platform categorizes threats into:
- Low
- Medium
- High
- Critical

## Explainable AI Analysis
The AI explains why content may be suspicious.

## Cybersecurity Safety Tips
Users receive security recommendations after analysis.

## Suspicious URL Detection
Users can analyze suspicious links and websites.

## User-Friendly Dashboard
Modern dashboard optimized for accessibility and clarity.

## Multi-Category Scam Detection
Supports:
- Banking scams
- Fake job offers
- OTP scams
- Phishing emails
- Social engineering attacks

## Real-Time AI Response
Fast AI-generated scam analysis and feedback.

---

# User Stories

1. As a student, I want to verify suspicious internship messages.
2. As an elderly user, I want simple scam explanations.
3. As a job seeker, I want to validate recruitment emails.
4. As a general internet user, I want AI-based scam analysis.
5. As a small business owner, I want phishing awareness support.

---

# Proposed Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js / Streamlit |
| Backend | FastAPI |
| AI | OpenAI API |
| Database | Supabase / SQLite |
| Authentication | Clerk |
| Deployment | Vercel + Railway |
| Version Control | GitHub |

---

# Functional Requirements

- Accept text and URL inputs
- Generate AI-based phishing analysis
- Display categorized risk levels
- Provide beginner-friendly explanations
- Maintain responsive UI
- Support multiple scam categories

---

# Non-Functional Requirements

- Fast response times
- Simple user experience
- Scalable architecture
- Reliable AI-generated outputs
- Cross-platform accessibility

---

# Success Metrics

- Accurate scam detection
- Positive usability feedback
- Functional MVP deployment
- Clear AI explanations
- Smooth demo performance during judging

---

# Future Scope

- Browser extension integration
- Voice scam detection
- Mobile application support
- Multilingual support
- WhatsApp and email integration
- Advanced cybersecurity dashboard

---

# Conclusion

PhishGuard AI combines artificial intelligence and cybersecurity awareness into a practical, accessible, and modern solution designed to help users recognize digital threats before becoming victims of online scams.
