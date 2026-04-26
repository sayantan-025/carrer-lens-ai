# CareerLens AI

<div align="center">

**Career Lens AI — AI-Powered Career Guidance Platform**

[Website](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

---

## 🎯 Overview

CareerLens AI is an intelligent career guidance platform that helps job seekers make informed career decisions by analyzing their resumes against job descriptions, calculating compatibility scores, and generating personalized preparation strategies.

### How It Works

1. **Upload Your Resume** — Submit your resume in PDF or DOCX format
2. **Add Job Details** — Paste the job description you're targeting
3. **Get Career Insights** — Receive AI-generated analysis with readiness scores, missing keywords, skill gaps, and a personalized plan to land the job

---

## ✨ Features

### Core Capabilities

- **📄 Resume Parsing** — Automatically extract and analyze information from PDF and DOCX resumes using Puppeteer
- **🔍 Job Match Analysis** — Deep analysis of job descriptions to find missing keywords and skill gaps
- **📊 Readiness Scoring** — Calculate your compatibility score for any role (0-100%)
- **🎯 Skill Gap Identification** — Identify exactly what skills you're missing for a position
- **📝 Personalized Plans** — Get tailored career guidance and interview preparation strategies
- **💡 AI Recommendations** — Smart suggestions based on your profile and target roles

### Authentication & Security

- **🔐 OAuth Integration** — Sign in with Google or GitHub
- **🍪 JWT Authentication** — Secure token-based sessions with refresh tokens
- **🛡️ Rate Limiting** — Protected API endpoints against abuse
- **📧 Email Notifications** — Password reset and verification emails via SMTP

### User Experience

- **🌙 Dark Mode UI** — Modern, sleek dark interface with smooth gradients
- **✨ Smooth Animations** — Framer Motion powered transitions throughout
- **📱 Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- **⚡ Fast Performance** — Built with Vite for optimal loading speeds
- **🖱️ Interactive Elements** — Mouse-following effects and aurora backgrounds

---

## 🏗️ Project Structure

```
carrer-lens-ai/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── server.js       # Server entry point
│   │   ├── config/         # Database & environment config
│   │   │   ├── database.js # MongoDB connection
│   │   │   ├── env.js      # Environment validation
│   │   │   └── passport.js # OAuth strategy config
│   │   ├── controllers/    # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/    # Express middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── file.middleware.js
│   │   │   ├── rate-limiter.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── models/         # Mongoose data models
│   │   │   ├── blacklist.model.js
│   │   │   ├── interview-report.model.js
│   │   │   └── user.model.js
│   │   ├── routes/         # API route definitions
│   │   │   ├── auth.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── oauth.routes.js
│   │   ├── services/       # Business logic
│   │   │   ├── ai.service.js      # Google Gemini AI
│   │   │   ├── email.service.js   # Nodemailer
│   │   │   └── token.service.js   # JWT tokens
│   │   └── utils/          # Helpers & utilities
│   │       ├── api-error.js
│   │       ├── auth-helpers.js
│   │       └── logger.js
│   └── package.json
│
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── app.jsx         # Main app component
│   │   ├── app.routes.jsx  # Route definitions
│   │   ├── index.css       # Global styles
│   │   ├── main.jsx        # Entry point
│   │   ├── components/     # Reusable UI components
│   │   │   ├── buttons/
│   │   │   │   ├── liquid-cta-button.jsx
│   │   │   │   └── tactical-ghost-button.jsx
│   │   │   └── ui/
│   │   │       ├── card.jsx
│   │   │       ├── dot-loader.jsx
│   │   │       ├── footer.jsx
│   │   │       ├── global-background.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── lenis-scroll.jsx
│   │   │       ├── liquid-metal-border.jsx
│   │   │       ├── logo.jsx
│   │   │       ├── navbar.jsx
│   │   │       ├── progress-bar.jsx
│   │   │       ├── skeleton.jsx
│   │   │       ├── soft-aurora.jsx
│   │   │       ├── spinner.jsx
│   │   │       ├── testimonials-column.jsx
│   │   │       └── toast.jsx
│   │   ├── config/         # App configuration
│   │   ├── context/        # React context providers
│   │   │   └── toast-context.jsx
│   │   ├── features/       # Feature modules
│   │   │   ├── auth/       # Authentication feature
│   │   │   │   ├── auth.context.jsx
│   │   │   │   ├── api/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   └── interview/ # Interview feature
│   │   ├── landing-page/  # Marketing landing page
│   │   │   ├── landing-page.jsx
│   │   │   └── components/
│   │   │       ├── call-to-action.jsx
│   │   │       ├── faq-section.jsx
│   │   │       ├── features.jsx
│   │   │       ├── hero-section.jsx
│   │   │       ├── pricing-plans.jsx
│   │   │       ├── section-title.jsx
│   │   │       ├── testimonials.jsx
│   │   │       ├── trusted-companies.jsx
│   │   │       └── workflow-steps.jsx
│   │   ├── layouts/        # Page layout components
│   │   │   ├── auth-layout.jsx
│   │   │   ├── main-layout.jsx
│   │   │   └── protected-layout.jsx
│   │   └── lib/            # Utility functions
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── package.json            # Root package (dev scripts)
├── puppeteer.config.cjs   # Puppeteer configuration
└── recovery.patch          # Recovery/backup patch
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/sayantan-025/carrer-lens-ai.git
cd carrer-lens-ai

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install
```

### Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/careerlens

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### Running the Application

```bash
# Development mode (from root)
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Building for Production

```bash
npm run build
```

This will:

1. Install all dependencies
2. Install Puppeteer Chrome browser
3. Build the frontend for production

---

## 🛠️ Tech Stack

### Backend

| Technology                                      | Purpose              |
| ----------------------------------------------- | -------------------- |
| [Express.js](https://expressjs.com/)            | Web framework        |
| [MongoDB](https://www.mongodb.com/)             | Database             |
| [Mongoose](https://mongoosejs.com/)             | ODM                  |
| [Passport.js](http://www.passportjs.org/)       | OAuth authentication |
| [JSON Web Token](https://jwt.io/)               | Session management   |
| [Zod](https://zod.dev/)                         | Schema validation    |
| [Puppeteer](https://puppeteer.sh/)              | PDF resume parsing   |
| [Winston](https://github.com/winstonjs/winston) | Logging              |
| [Google Gemini AI](https://ai.google.dev/)      | AI-powered analysis  |

### Frontend

| Technology                                       | Purpose          |
| ------------------------------------------------ | ---------------- |
| [React](https://react.dev/)                      | UI library       |
| [Vite](https://vitejs.dev/)                      | Build tool       |
| [Tailwind CSS v4](https://tailwindcss.com/)      | Styling          |
| [Framer Motion](https://www.framer.com/motion/)  | Animations       |
| [React Router](https://reactrouter.com/)         | Routing          |
| [Axios](https://axios-http.com/)                 | HTTP client      |
| [Lenis](https://github.com/studio-freight/lenis) | Smooth scrolling |
| [OGL](https://github.com/oframe/ogl)             | WebGL graphics   |

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| `GET`  | `/auth/google`          | Initiate Google OAuth login |
| `GET`  | `/auth/google/callback` | Google OAuth callback       |
| `GET`  | `/auth/github`          | Initiate GitHub OAuth login |
| `GET`  | `/auth/github/callback` | GitHub OAuth callback       |
| `POST` | `/auth/register`        | Email/password registration |
| `POST` | `/auth/login`           | Email/password login        |
| `POST` | `/auth/logout`          | Logout user                 |
| `GET`  | `/auth/me`              | Get current user profile    |

### Interview & Career Analysis

| Method | Endpoint                 | Description                       |
| ------ | ------------------------ | --------------------------------- |
| `POST` | `/interview/analyze`     | Analyze resume vs job description |
| `GET`  | `/interview/reports`     | Get user's career reports         |
| `GET`  | `/interview/reports/:id` | Get specific report details       |

---

## 🔧 Scripts

| Command                        | Description                        |
| ------------------------------ | ---------------------------------- |
| `npm run dev`                  | Start development server (backend) |
| `npm run build`                | Build for production (full stack)  |
| `npm run start`                | Start production server (backend)  |
| `cd frontend && npm run dev`   | Start frontend dev server          |
| `cd frontend && npm run build` | Build frontend                     |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with modern React and Express.js
- Powered by Google Gemini AI for intelligent analysis
- Inspired by AI-driven career development tools

---

<div align="center">

**Made with ❤️ by [Sayantan](https://github.com/sayantan-025)**

</div>
