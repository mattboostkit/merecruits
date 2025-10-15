import { mutation } from "./_generated/server";

// This is a seed script that can be run manually from the Convex dashboard
// or by calling it as a mutation
export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data (optional - comment out if you want to keep existing data)
    // const existingJobs = await ctx.db.query("jobs").collect();
    // for (const job of existingJobs) {
    //   await ctx.db.delete(job._id);
    // }

    // Seed jobs
    const jobs = [
      {
        title: "Marketing Manager",
        slug: "marketing-manager-maidstone",
        location: "Maidstone",
        description: "Leading marketing agency seeks experienced Marketing Manager to oversee campaigns, manage team and drive growth. Excellent opportunity for career progression.",
        salary: "£35,000 - £45,000",
        salaryMin: 35000,
        salaryMax: 45000,
        type: "PERMANENT" as const,
        category: "Marketing",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "Legal Secretary",
        slug: "legal-secretary-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "Well-established law firm requires experienced Legal Secretary to support busy litigation department. Competitive salary and benefits package.",
        salary: "£26,000 - £32,000",
        salaryMin: 26000,
        salaryMax: 32000,
        type: "PERMANENT" as const,
        category: "Legal",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "Office Administrator",
        slug: "office-administrator-medway",
        location: "Medway",
        description: "Growing SME seeks organised Office Administrator to manage daily operations, coordinate meetings and provide administrative support.",
        salary: "£24,000 - £28,000",
        salaryMin: 24000,
        salaryMax: 28000,
        type: "PERMANENT" as const,
        category: "Admin",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Temporary Receptionist",
        slug: "temporary-receptionist-maidstone",
        location: "Maidstone",
        description: "Immediate temporary receptionist role for 3 months to cover maternity leave. Professional office environment with potential for extension.",
        salary: "£12 - £14 per hour",
        type: "TEMPORARY" as const,
        category: "Admin",
        status: "ACTIVE" as const,
        featured: false,
      },
    ];

    for (const job of jobs) {
      await ctx.db.insert("jobs", job);
    }

    // Seed news articles
    const articles = [
      {
        title: "How to Prepare for Your Next Job Interview",
        slug: "how-to-prepare-for-your-next-job-interview",
        excerpt: "Master the art of job interviews with our comprehensive guide. Learn the best strategies for preparation, common questions to expect, and how to make a lasting impression.",
        content: "<h2>Introduction</h2><p>Job interviews can be nerve-wracking, but with the right preparation, you can approach them with confidence. This guide will walk you through everything you need to know to ace your next interview.</p><h2>Research the Company</h2><p>Before your interview, spend time researching the company. Understand their values, mission, recent news, and the role you're applying for.</p><h2>Practice Common Questions</h2><p>Prepare answers for common interview questions like 'Tell me about yourself' and 'Why do you want to work here?'</p>",
        author: "Helen Thompson",
        published: true,
        publishedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
      {
        title: "Top Skills Employers Are Looking For in 2025",
        slug: "top-skills-employers-2025",
        excerpt: "The job market is evolving rapidly. Discover which skills are most in demand and how you can develop them to boost your career prospects.",
        content: "<h2>Digital Literacy</h2><p>In 2025, digital literacy is more important than ever. Employers expect candidates to be proficient with various digital tools and platforms.</p><h2>Adaptability</h2><p>The ability to adapt to change and learn new skills quickly is highly valued in today's fast-paced work environment.</p>",
        author: "Helen Thompson",
        published: true,
        publishedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
      },
    ];

    for (const article of articles) {
      await ctx.db.insert("newsArticles", article);
    }

    // Seed team members
    const team = [
      {
        name: "Helen Thompson",
        role: "Director",
        bio: "Helen founded ME Recruits with over 25 years of recruitment experience. Her expertise in matching candidates with the right opportunities has helped countless professionals advance their careers.",
        imageUrl: "/team/helen-thompson.jpg",
        email: "helen@merecruits.com",
        order: 1,
        active: true,
      },
    ];

    for (const member of team) {
      await ctx.db.insert("teamMembers", member);
    }

    return { success: true, message: "Database seeded successfully!" };
  },
});

// Update Helen Thompson to Helen Barham with correct information
export const updateHelenBarham = mutation({
  args: {},
  handler: async (ctx) => {
    // Find Helen Thompson
    const existingTeam = await ctx.db.query("teamMembers").collect();

    for (const member of existingTeam) {
      if (member.name === "Helen Thompson") {
        await ctx.db.delete(member._id);
      }
    }

    // Add correct Helen Barham info
    await ctx.db.insert("teamMembers", {
      name: "Helen Barham",
      role: "Lead Consultant & Founder",
      bio: "Helen founded ME Recruits, sister company to award-winning TN Recruits, bringing over 20 years of recruitment expertise to the ME postcode area. A strong communicator and influencer, Helen is client-focused, consultative and open-minded. Her approach goes beyond matching CVs to job descriptions – she connects people, purpose and potential. When not building successful partnerships, Helen enjoys family life, drives to the coast, holidays in Devon, long walks, fitness, and a glass of red wine.",
      imageUrl: "",
      email: "helen@merecruits.com",
      order: 1,
      active: true,
    });

    // Update news articles authors
    const articles = await ctx.db.query("newsArticles").collect();
    for (const article of articles) {
      if (article.author === "Helen Thompson") {
        await ctx.db.patch(article._id, { author: "Helen Barham" });
      }
    }

    return { success: true, message: "Helen's info updated to Helen Barham successfully!" };
  },
});
