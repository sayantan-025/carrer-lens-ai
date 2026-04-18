const path = require('path');
const projectRoot = 'c:/Users/sayan/OneDrive/Desktop/projects/carrer-lens-ai';

// LOAD ENV FIRST!
const dotenv = require('dotenv');
dotenv.config({ path: path.join(projectRoot, '.env') });

const { generateResumePdf } = require(path.join(projectRoot, 'backend/src/services/ai.service'));

async function test() {
    console.log("Starting PDF generation test with dynamic path resolution...");
    try {
        const buffer = await generateResumePdf({
            resume: "Test Resume Content for Antigravity Debugging",
            selfDescription: "A test candidate exploring AI generation.",
            jobDescription: "Senior Debugging Engineer at CareerLens AI"
        });
        console.log("SUCCESS: PDF buffer generated. Length:", buffer.length);
    } catch (err) {
        console.error("FAILURE:", err.message);
        if (err.stack) console.error(err.stack);
    }
}

test();
