# Career Lens AI - Project Context

Career Lens AI is an AI-powered interview preparation platform. It helps candidates prepare for specific job roles by analyzing their resumes (or self-descriptions) against job descriptions using Google Gemini AI. It generates structured interview reports and professional PDF resumes.

## Project Architecture

The project follows a full-stack JavaScript architecture (MERN-like, using Express and React).

### Backend (`/backend`)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **AI Service:** Google Generative AI (`@google/genai`) using `gemini-2.5-flash-lite`.
- **Key Features:**
  - **Interview Report Generation:** Analyzes resume/self-description + job description to generate match scores, technical/behavioral questions, skill gaps, and a preparation plan.
  - **Resume PDF Generation:** AI generates an ATS-friendly HTML resume (mimicking LaTeX style) which is then converted to PDF using Puppeteer.
  - **Authentication:** JWT-based auth with cookie storage and token blacklisting for logout.
  - **File Handling:** `multer` for resume uploads and `pdf-parse` for text extraction.

### Frontend (`/frontend`)

- **Build Tool:** Vite
- **Library:** React 19
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4, Framer Motion for animations.
- **Key Features:**
  - Dashboard for managing interview reports.
  - Landing page with analytics visualization, FAQ, and testimonials.
  - Protected routes for authenticated users.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB URI
- Google Gemini API Key

### Environment Variables

Create a `.env` file in the root (or backend) with:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Installation & Running

**Root Level:**

- Install all dependencies and build frontend: `npm run build`
- Start the server (backend + served frontend): `npm start` or `npm run dev`

**Individual Directories:**

- **Backend:** `npm install` then `node server.js` or `nodemon server.js`
- **Frontend:** `npm install` then `npm run dev` (for development) or `npm run build` (for production)

## Key Files & Directories

- `backend/src/services/ai.service.js`: Main logic for Gemini AI interactions (structured JSON output).
- `backend/src/controllers/interview.controller.js`: Handles report generation and PDF downloads.
- `backend/src/models/interviewReport.model.js`: Mongoose schema for the structured AI reports.
- `frontend/src/features/interview/services/interview.api.js`: API client for interview features.

## Development Conventions

- **AI Prompting:** Structured JSON output is enforced via Zod schemas and Gemini's `responseMimeType: "application/json"`.
- **PDF Generation:** Puppeteer is used in headless mode. The service includes a fallback mechanism to find the Chrome binary in a `.cache` directory (optimized for cloud deployments like Render).
- **Authentication:** Middleware `authMiddleware` protects routes by verifying the `token` cookie.
- **Styling:** Uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin.
