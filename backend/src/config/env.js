const { z } = require("zod");
const dotenv = require("dotenv");
const path = require("path");

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("3000"),
  MONGO_URI: z.string({
    required_error: "MONGO_URI is required for database connection",
  }),
  JWT_SECRET: z.string({
    required_error: "JWT_SECRET is required for authentication",
  }),
  GOOGLE_GENAI_API_KEY: z.string({
    required_error: "GOOGLE_GENAI_API_KEY is required for AI services",
  }),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  
  // Optional OAuth Configuration
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_CALLBACK_URL: z.string().optional(),
  
  // Email Configuration
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),

  // Puppeteer Configuration
  PUPPETEER_EXECUTABLE_PATH: z.string().optional(),
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  process.exit(1);
}

module.exports = _env.data;
