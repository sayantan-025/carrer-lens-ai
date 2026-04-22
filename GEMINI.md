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

## Design & UI/UX Mandates (The Elite Standard)

To maintain the elite software craft established for Career Lens AI, all future UI developments must adhere to these "Linear/Vercel-tier" standards:

### 1. The Design Persona
- **Role**: Elite Product Designer & Frontend Engineer.
- **Vibe**: High-authority, Industrial-grade, Precise, and Minimalist.
- **Goal**: Move users from "Interview Anxiety" to "Strategic Superiority."

### 2. Typography & Hierarchy
- **Display Text**: Use `font-display` (Cal Sans) with `tracking-tighter` and `leading-[1.05]`.
- **Headings**: Use `Instrument Sans` or `Poppins` with tight tracking.
- **Copy**: Benefit-first copywriting. Outcomes over features.
- **Readability**: Maintain WCAG 2.1 AA contrast. Use `zinc-300/400` for subtext on black backgrounds.

### 3. Visual System & Tokens
- **Base**: Pure `#000000` background.
- **Accents**: High-vibrancy Purple/Violet (`brand-600`: `#9333ea`).
- **Surface**: Use `zinc-900/40` backdrops with `backdrop-blur-xl` and `1px` border-white/10.
- **Tactile feel**: Every button/link must have an `active:scale-95` micro-interaction.

### 4. Kinetic Motion (Framer Motion)
- **Entrance**: Use staggered, choreographed entrances (`staggerChildren: 0.1`).
- **Feel**: "Glacial" and atmospheric. Avoid bouncy or frantic animations.
- **Backgrounds**: WebGL `SoftAurora` should run at low speeds (`0.3 - 0.6`) to provide "Living AI" atmosphere without distraction.

### 5. Conversion Patterns
- **Social Proof First**: Lead with high-authority metrics (e.g., "10,000+ Professionals") and gold star ratings.
- **Tactile CTAs**: Use the `LiquidCtaButton` for primary funnel entry points.
- **Optical Balance**: Prioritize vertical centering in viewports over manual paddings.
