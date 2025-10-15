import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const analyzeCVForJob = action({
  args: {
    cvText: v.string(),
    jobTitle: v.string(),
    jobDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const { cvText, jobTitle, jobDescription } = args;

    try {
      // Initialize OpenAI client inside the handler to access environment variables
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });
      const completion = await openai.chat.completions.create({
        model: "gpt-5-mini-2025-08-07",
        messages: [
          {
            role: "system",
            content: `You are an expert recruitment consultant with 25+ years of experience helping candidates improve their CVs. You work for ME Recruits, a specialist recruitment agency in Kent's ME postcode area.

Your role is to analyze CVs against specific job descriptions and provide constructive, actionable feedback to help candidates improve their chances of securing an interview.

Your feedback should be:
- Specific and actionable
- Focused on improving the match between the CV and job requirements
- Constructive and encouraging
- Practical and implementable
- Professional yet friendly

Structure your response with:
1. Overall Assessment (2-3 sentences)
2. Key Strengths (3-4 bullet points highlighting what's working well)
3. Areas for Improvement (4-6 specific, actionable recommendations)
4. Keywords to Add (5-8 relevant keywords from the job description that should be incorporated)
5. Suggested CV Structure (brief recommendations on format/structure)
6. Final Encouragement (1-2 sentences)`,
          },
          {
            role: "user",
            content: `Please analyze this CV for the following role:

**Job Title:** ${jobTitle}

**Job Description:**
${jobDescription}

**Candidate's CV:**
${cvText}

Please provide detailed, actionable feedback to help this candidate improve their CV specifically for this role.`,
          },
        ],
        max_completion_tokens: 2000,
      });

      const analysis = completion.choices[0]?.message?.content || "Unable to generate analysis.";

      return {
        success: true,
        analysis,
        model: "gpt-5-mini-2025-08-07",
      };
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze CV",
        analysis: "",
      };
    }
  },
});

export const scoreCVQuick = action({
  args: {
    cvText: v.string(),
  },
  handler: async (ctx, args) => {
    const { cvText } = args;

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-5-mini-2025-08-07",
        messages: [
          {
            role: "system",
            content: `You are an expert CV reviewer with 25+ years of recruitment experience at ME Recruits.

Your task is to quickly score a CV out of 10 and provide brief, actionable feedback.

Scoring criteria (each worth 2 points):
1. Professional formatting and structure (2 points)
2. Clear, concise professional profile/summary (2 points)
3. Relevant skills clearly listed (2 points)
4. Achievements with quantifiable results (2 points)
5. No spelling/grammar errors, appropriate length (2 points)

Respond ONLY in this exact format:
SCORE: X/10
STRENGTHS: [2-3 bullet points]
QUICK WINS: [2-3 specific improvements that would boost the score]`,
          },
          {
            role: "user",
            content: `Please score this CV:\n\n${cvText}`,
          },
        ],
        max_completion_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        console.error("No response from OpenAI:", completion);
        return {
          success: false,
          error: "No response received from AI. Please try again.",
          score: 0,
          feedback: "",
        };
      }

      // Parse the score from the response
      const scoreMatch = response.match(/SCORE:\s*(\d+)\/10/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

      return {
        success: true,
        score,
        feedback: response,
        model: "gpt-5-mini-2025-08-07",
      };
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to score CV",
        score: 0,
        feedback: "",
      };
    }
  },
});

export const generateImprovedCV = action({
  args: {
    cvText: v.string(),
    jobTitle: v.string(),
    jobDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const { cvText, jobTitle, jobDescription } = args;

    try {
      // Initialize OpenAI client inside the handler to access environment variables
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-5-mini-2025-08-07",
        messages: [
          {
            role: "system",
            content: `You are an expert recruitment consultant with 25+ years of experience rewriting CVs for maximum impact. You work for ME Recruits, a specialist recruitment agency in Kent's ME postcode area.

Your task is to take a candidate's CV and rewrite it to be perfectly tailored for a specific job role.

Your rewritten CV should:
- Maintain all factual information from the original CV
- Restructure and reword content to align with the job requirements
- Incorporate relevant keywords from the job description naturally
- Highlight achievements and skills most relevant to the target role
- Use strong action verbs and quantifiable results where possible
- Follow a professional, ATS-friendly format
- Be concise yet comprehensive (aim for 2 pages maximum)
- Use UK English spelling and conventions

Format the CV as plain text with clear sections using headers like:
PROFESSIONAL PROFILE
KEY SKILLS
PROFESSIONAL EXPERIENCE
EDUCATION & QUALIFICATIONS

Do not add fictional information - only enhance and restructure what's already provided.`,
          },
          {
            role: "user",
            content: `Please rewrite this CV to be perfectly tailored for the following role:

**Target Job Title:** ${jobTitle}

**Job Description:**
${jobDescription}

**Original CV:**
${cvText}

Please provide a complete rewritten CV that will maximize this candidate's chances of securing an interview for this specific role.`,
          },
        ],
        max_completion_tokens: 3000,
      });

      const improvedCV = completion.choices[0]?.message?.content || "Unable to generate improved CV.";

      return {
        success: true,
        improvedCV,
        model: "gpt-5-mini-2025-08-07",
      };
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate improved CV",
        improvedCV: "",
      };
    }
  },
});
