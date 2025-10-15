import { v } from "convex/values";
import { action } from "./_generated/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Schema for parsed CV data
const cvDataSchema = z.object({
  fullName: z.string().describe("Candidate's full name"),
  email: z.string().email().optional().describe("Email address if found in CV"),
  phone: z.string().optional().describe("Phone number if found in CV"),
  summary: z.string().describe("Brief professional summary (2-3 sentences)"),
  skills: z.array(z.string()).describe("List of key skills mentioned"),
  experience: z.array(z.object({
    jobTitle: z.string(),
    company: z.string(),
    duration: z.string().describe("E.g., '2020-2023' or '2 years'"),
    description: z.string().optional(),
  })).describe("Work experience (most recent 3 roles)"),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string().optional(),
  })).describe("Educational qualifications"),
  yearsOfExperience: z.number().describe("Estimated total years of professional experience"),
});

export type ParsedCVData = z.infer<typeof cvDataSchema>;

/**
 * Parse a CV using OpenAI GPT-4o-mini
 *
 * This action takes CV text and extracts structured information using AI.
 * Perfect for quickly understanding candidate profiles.
 */
export const parseCV = action({
  args: {
    cvText: v.string(),
    fileName: v.string(),
  },
  handler: async (ctx, args): Promise<ParsedCVData> => {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    try {
      const result = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: cvDataSchema,
        prompt: `You are an expert recruitment consultant. Extract key information from this CV/resume.

CV Text:
${args.cvText}

Instructions:
- Extract the candidate's name, contact details, skills, and experience
- Summarize their professional background in 2-3 sentences
- List their key technical and professional skills
- Extract their most recent 3 work experiences with job titles, companies, and durations
- List their educational qualifications
- Estimate their total years of professional experience
- Be concise but accurate
- If information is not available, use empty strings or empty arrays`,
      });

      return result.object;
    } catch (error) {
      console.error("Error parsing CV with AI:", error);
      throw new Error(`Failed to parse CV: ${error}`);
    }
  },
});

/**
 * Extract text from a PDF CV file stored in Convex
 *
 * This helper function downloads the CV from storage and extracts the text.
 */
export const extractTextFromCV = action({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args): Promise<string> => {
    try {
      // Get the file URL from storage
      const fileUrl = await ctx.storage.getUrl(args.storageId);

      if (!fileUrl) {
        throw new Error("File not found in storage");
      }

      // Download the file
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // For now, we'll use a simple text extraction
      // In production, you might want to use pdf-parse or similar
      const text = buffer.toString('utf-8');

      // Basic cleanup
      return text
        .replace(/[^\x20-\x7E\n]/g, ' ') // Remove non-printable characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
    } catch (error) {
      console.error("Error extracting text from CV:", error);
      throw new Error(`Failed to extract text: ${error}`);
    }
  },
});

/**
 * Complete CV parsing pipeline
 *
 * This action:
 * 1. Downloads the CV from storage
 * 2. Extracts text
 * 3. Parses with AI
 * 4. Returns structured data
 */
export const parseAndAnalyzeCV = action({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
  },
  handler: async (ctx, args): Promise<ParsedCVData> => {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    try {
      // Step 1: Extract text from PDF
      const fileUrl = await ctx.storage.getUrl(args.storageId);

      if (!fileUrl) {
        throw new Error("File not found in storage");
      }

      // Download the file
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Extract text (basic extraction - in production use pdf-parse or similar)
      const cvText = buffer
        .toString('utf-8')
        .replace(/[^\x20-\x7E\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Step 2: Parse with AI
      const result = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: cvDataSchema,
        prompt: `You are an expert recruitment consultant. Extract key information from this CV/resume.

CV Text:
${cvText}

Instructions:
- Extract the candidate's name, contact details, skills, and experience
- Summarize their professional background in 2-3 sentences
- List their key technical and professional skills
- Extract their most recent 3 work experiences with job titles, companies, and durations
- List their educational qualifications
- Estimate their total years of professional experience
- Be concise but accurate
- If information is not available, use empty strings or empty arrays`,
      });

      return result.object;
    } catch (error) {
      console.error("Error parsing CV with AI:", error);
      throw new Error(`Failed to parse CV: ${error}`);
    }
  },
});
