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
        temperature: 0.7,
        max_tokens: 2000,
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
