const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/**
 * Robustly finds the chrome binary within the puppeteer cache directory.
 */
function findChromeBinary(startPath) {
  if (!fs.existsSync(startPath)) return null;

  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      const found = findChromeBinary(filename);
      if (found) return found;
    } else if (file === "chrome.exe" || file === "chrome") {
      return filename;
    }
  }
  return null;
}

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile aligns with the job requirements",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("A high-impact technical question tailored to the role"),
        intention: z
          .string()
          .describe("The underlying competency or knowledge area being assessed"),
        answer: z
          .string()
          .describe(
            "A structured guide for the candidate, including key concepts, edge cases, and best practices to mention",
          ),
      }),
    )
    .describe(
      "Critical technical questions derived from the job description and candidate's background",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("A STAR-method based behavioral question"),
        intention: z
          .string()
          .describe("The soft skill or cultural value being tested (e.g., leadership, conflict resolution)"),
        answer: z
          .string()
          .describe(
            "Guidance on how to structure the story using the Situation, Task, Action, Result framework",
          ),
      }),
    )
    .describe(
      "Behavioral and situational questions focused on soft skills and culture fit",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("A specific technical or soft skill required for the role but missing/weak in the profile"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The critical nature of this gap: High (deal-breaker), Medium (important), Low (nice-to-have)",
          ),
      }),
    )
    .describe(
      "Identification of specific skill deficiencies relative to the target role",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("Sequence day in the structured preparation roadmap"),
        focus: z
          .string()
          .describe(
            "The primary theme for the day (e.g., Core Architecture, System Design, Behavioral Deep Dive)",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "Actionable, measurable steps to achieve the day's objective",
          ),
      }),
    )
    .describe(
      "A comprehensive, day-wise strategic roadmap for interview success",
    ),
  title: z
    .string()
    .describe(
      "The official job title being analyzed",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Act as an Elite Technical Interview Coach and Career Strategist. Your goal is to provide a deep, high-level analysis of a candidate's readiness for a specific role.

### INPUT DATA:
1. **Candidate Resume:**
${resume}

2. **Candidate Self-Description (Contextual Details):**
${selfDescription}

3. **Target Job Description:**
${jobDescription}

### TASK:
Analyze the alignment between the candidate and the role. Your output must be professional, insightful, and brutally honest where necessary.

1. **Strategic Match Score:** Calculate a realistic match percentage based on skills, experience levels, and domain expertise.
2. **Technical Deep Dive:** Formulate technical questions that probe areas where the candidate claims expertise OR where the job description has strict requirements. Provide "Gold Standard" answer guides.
3. **Behavioral Archetypes:** Identify the key soft skills required (e.g., "Stakeholder Management" for Seniors, "Rapid Learning" for Juniors) and generate targeted situational questions.
4. **Gap Analysis:** Be precise about missing technologies, methodologies, or soft skills.
5. **Hyper-Focused Preparation Plan:** Create a high-intensity, structured roadmap for the candidate to bridge gaps and master their narrative before the interview.

### CONSTRAINTS:
- Use professional corporate terminology.
- Ensure the "intention" of questions reveals the psychological or technical goal of the interviewer.
- The preparation plan should feel like a premium coaching service.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  let browser;
  let page;

  try {
    // 1. Try to find the chrome executable in the custom cache directory
    const cachePath = path.join(process.cwd(), ".cache", "puppeteer");
    const resolvedPath = findChromeBinary(cachePath);
    
    // 2. Fallback to environment variable (standard for many cloud providers)
    const executablePath = resolvedPath || process.env.PUPPETEER_EXECUTABLE_PATH;

    if (executablePath) {
      console.log(`[Puppeteer] Launching with explicit binary: ${executablePath}`);
    } else {
      console.log("[Puppeteer] No custom binary found, launching with default path...");
    }

    const launchOptions = {
      executablePath: executablePath || undefined,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    };

    // Only add specific flags that are known to help on specific cloud envs 
    // but can be unstable on local Windows/MacOS.
    if (process.env.NODE_ENV === "production") {
      launchOptions.args.push("--single-process", "--no-zygote");
    }

    try {
      browser = await puppeteer.launch(launchOptions);
    } catch (launchError) {
      console.warn(`[Puppeteer] Failed to launch with explicit binary. Retrying with default...`);
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });
    }

    page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.setContent(htmlContent, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      pageRanges: "1",
      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("generatePdfFromHtml error:", error);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (page) {
      try {
        await page.close();
      } catch (err) {
        console.warn("Failed to close Puppeteer page:", err.message);
      }
    }
    if (browser) {
      try {
        await browser.close();
      } catch (err) {
        console.warn("Failed to close Puppeteer browser:", err.message);
      }
    }
  }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate a highly professional, ATS-friendly resume for a candidate based on the following inputs:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

You MUST return a JSON object with a single field "html" containing the raw HTML code for the resume. 

CRITICAL VISUAL DESIGN:
The HTML MUST exactly mimic the visual aesthetic of the following LaTeX template logic:
- Font: 'Times New Roman', Times, serif at 11pt.
- Header: Centered, Bold Candidate name at 24pt, followed by cleanly formatted contact info and links separated by pipes (|), centered.
- Sections: Section headings (like "Technical Skills", "Projects") must be 14pt, bold, uppercase, with a 1pt solid black bottom border that spans the full width of the page.
- Projects/Experience layout: The left side must have the Title (bold) with inline links. The right side must have the Date (italicized).
- Below the Title: Subtitle (italicized).
- Bullet points must be tightly packed (no extra margins) to save space.

IMPORTANT URL HANDLING:
- You must carefully extract and assign the correct URLs for GitHub, LinkedIn, and the Portfolio. You must format them as clickable HTML links (e.g., <a href="...">LinkedIn</a>).
- Look at the "EXTRACTED HYPERLINKS" section at the bottom of the raw resume text to find the exact https:// URLs.
- If an exact URL is missing, search the plain text for strings like "github.com/..." and safely reconstruct the "https://" link. Ensure every project block has working <a> tags for "GitHub" and "Live" links.

CRITICAL CONSTRAINT:
- The resume MUST fit on exactly ONE single A4 page. Be ruthlessly concise and condense or omit older bullet points if necessary.

Include this embedded CSS in your HTML <head> and match its structure:
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.25; margin: 0; padding: 0; color: #000; }
        .header { text-align: center; margin-bottom: 10pt; }
        .name { font-size: 24pt; font-weight: bold; margin-bottom: 2pt; }
        .contact { font-size: 11pt; }
        .contact a, .entry-title a { color: #0000EE; text-decoration: underline; }
        .section { margin-top: 10pt; margin-bottom: 6pt; }
        .section-title { font-size: 14pt; font-weight: bold; border-bottom: 1pt solid #000; margin-bottom: 4pt; padding-bottom: 2pt; text-transform: uppercase; }
        .entry { margin-bottom: 6pt; }
        .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
        .entry-title { font-weight: bold; }
        .entry-location { font-style: italic; }
        .entry-subtitle { font-style: italic; margin-bottom: 2pt; }
        ul { margin: 0; padding-left: 20pt; }
        li { margin-bottom: 2pt; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">Candidate Name</div>
        <div class="contact">Location | email@example.com <br/> <a href="#">LinkedIn</a> | <a href="#">GitHub</a></div>
    </div>
    
    <div class="section"><div class="section-title">Projects</div></div>
    <div class="entry">
        <div class="entry-header">
            <div class="entry-title">ZenBlocks -- UI Component Library | <a href="...">GitHub</a> | <a href="...">Live</a></div>
            <div class="entry-location">2026</div>
        </div>
        <div class="entry-subtitle">React.js, Tailwind CSS</div>
        <ul><li>Built a UI library...</li></ul>
    </div>
    <!-- Build the rest based on Candidate data -->
</body>
</html>
`;

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: z.toJSONSchema(resumePdfSchema),
      },
    });
  } catch (error) {
    console.error("AI resume generation failed:", error);
    throw new Error(`AI resume generation failed: ${error.message}`);
  }

  if (!response || typeof response.text !== "string") {
    throw new Error("AI resume generation returned an unexpected response.");
  }

  let jsonContent;
  try {
    jsonContent = JSON.parse(response.text);
  } catch (error) {
    console.error("Invalid AI resume response text:", response.text);
    throw new Error(`Invalid JSON from AI resume response: ${error.message}`);
  }

  const validation = resumePdfSchema.safeParse(jsonContent);
  if (!validation.success) {
    console.error(
      "Resume PDF schema validation failed:",
      validation.error.format(),
    );
    throw new Error(
      `Resume PDF schema validation failed: ${JSON.stringify(validation.error.format())}`,
    );
  }

  if (!validation.data.html || !validation.data.html.trim()) {
    throw new Error("AI resume response contained empty HTML.");
  }

  const pdfBuffer = await generatePdfFromHtml(validation.data.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
