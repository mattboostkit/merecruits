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

    // Seed jobs - Real jobs from ME Recruits site
    const jobs = [
      {
        title: "Business Development Executive",
        slug: "business-development-executive-dartford",
        location: "Dartford",
        description: "Exciting opportunity for a Business Development Executive to join a growing company in Dartford. You will be responsible for identifying new business opportunities, building relationships with clients, and driving sales growth.",
        salary: "-",
        type: "PERMANENT" as const,
        category: "Sales & Account Management",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "CARETAKER & MAINTENANCE OPERATIVE",
        slug: "caretaker-maintenance-operative-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "We are looking for a reliable Caretaker & Maintenance Operative to join our team in Tunbridge Wells. You will be responsible for general maintenance tasks, ensuring the building is clean and well-maintained.",
        salary: "£12 per hour",
        salaryMin: 12,
        salaryMax: 12,
        type: "PERMANENT" as const,
        category: "Trades & Services",
        consultant: "Melissa Staveley",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Digital Marketing Executive",
        slug: "digital-marketing-executive-west-malling",
        location: "West Malling",
        description: "Join a dynamic marketing team as a Digital Marketing Executive in West Malling. You will manage digital campaigns, social media, SEO/SEM strategies, and analytics to drive online engagement and growth.",
        salary: "£30,000 - £34,000",
        salaryMin: 30000,
        salaryMax: 34000,
        type: "PERMANENT" as const,
        category: "Marketing / PR / Events",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "Graduate Talent Sourcing Executive",
        slug: "graduate-talent-sourcing-executive-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "Fantastic graduate opportunity in recruitment! Join our team as a Talent Sourcing Executive in Tunbridge Wells. Earn £22,000 base salary plus uncapped commission. Perfect for ambitious graduates looking to build a career in HR & Recruitment.",
        salary: "£22,000 + Uncapped commission",
        salaryMin: 22000,
        salaryMax: 40000,
        type: "PERMANENT" as const,
        category: "HR & Recruitment",
        consultant: "Ellie Waterman",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "Legal Secretary",
        slug: "legal-secretary-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "Well-established law firm requires experienced Legal Secretary to support busy litigation department. Competitive salary and benefits package.",
        salary: "£25,000 - £27,000",
        salaryMin: 25000,
        salaryMax: 27000,
        type: "PERMANENT" as const,
        category: "Legal",
        consultant: "Isobel Colman",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        title: "Marketing Coordinator",
        slug: "marketing-coordinator-west-malling",
        location: "West Malling",
        description: "Exciting Marketing Coordinator role in West Malling. Support the marketing team with campaign coordination, content creation, event management, and administrative tasks.",
        salary: "£30,000 - £32,000",
        salaryMin: 30000,
        salaryMax: 32000,
        type: "PERMANENT" as const,
        category: "Admin / Secretarial / Office Support",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Marketing Executive",
        slug: "marketing-executive-maidstone",
        location: "Maidstone",
        description: "Join a forward-thinking company as a Marketing Executive in Maidstone. You will develop and execute marketing strategies, manage campaigns, and contribute to brand growth.",
        salary: "-",
        type: "PERMANENT" as const,
        category: "Marketing / PR / Events",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Mortgage Administrator",
        slug: "mortgage-administrator-kings-hill",
        location: "Kings Hill",
        description: "Established mortgage brokerage seeks Mortgage Administrator for their Kings Hill office. Process applications, liaise with lenders, and provide excellent customer service.",
        salary: "£26,200",
        salaryMin: 26200,
        salaryMax: 26200,
        type: "PERMANENT" as const,
        category: "Admin / Secretarial / Office Support",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Operations Coordinator",
        slug: "operations-coordinator-maidstone",
        location: "Maidstone",
        description: "Fast-paced Operations Coordinator role in Maidstone. Coordinate daily operations, manage schedules, and ensure smooth business processes. Competitive hourly rate.",
        salary: "£12 - £13 per hour",
        salaryMin: 12,
        salaryMax: 13,
        type: "TEMPORARY" as const,
        category: "Admin / Secretarial / Office Support",
        consultant: "Melissa Staveley",
        status: "ACTIVE" as const,
        featured: false,
      },
      {
        title: "Purchasing Administrator",
        slug: "purchasing-administrator-dartford",
        location: "Dartford",
        description: "Growing company in Dartford seeks Purchasing Administrator to manage procurement processes, supplier relationships, and inventory control. Great benefits package.",
        salary: "£28,000 - £30,000",
        salaryMin: 28000,
        salaryMax: 30000,
        type: "PERMANENT" as const,
        category: "Admin / Secretarial / Office Support",
        consultant: "Helen Barham",
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
        name: "Helen Barham",
        role: "Lead Consultant & Founder",
        bio: "Helen founded ME Recruits, sister company to award-winning TN Recruits, bringing over 20 years of recruitment expertise to the ME postcode area. A strong communicator and influencer, Helen is client-focused, consultative and open-minded. Her approach goes beyond matching CVs to job descriptions – she connects people, purpose and potential.",
        imageUrl: "",
        email: "helen@merecruits.com",
        order: 1,
        active: true,
      },
      {
        name: "Isobel Colman",
        role: "Legal Recruitment Specialist",
        bio: "Isobel brings extensive experience in legal recruitment, specialising in placing legal secretaries and administrative professionals across Kent's top law firms. With her deep understanding of the legal sector, Isobel ensures perfect matches between candidates and practices.",
        imageUrl: "",
        email: "isobel@merecruits.com",
        order: 2,
        active: true,
      },
      {
        name: "Melissa Staveley",
        role: "Temporary & Contract Specialist",
        bio: "Melissa specialises in temporary and contract placements across administrative, trades, and operations roles. Her quick response times and extensive network make her the go-to consultant for businesses needing immediate staffing solutions.",
        imageUrl: "",
        email: "melissa@merecruits.com",
        order: 3,
        active: true,
      },
      {
        name: "Ellie Waterman",
        role: "Graduate & HR Recruitment Consultant",
        bio: "Ellie focuses on graduate recruitment and HR positions, helping ambitious new professionals start their careers and experienced HR practitioners find their next challenge. Her enthusiastic approach and sector knowledge make her a trusted partner for both candidates and clients.",
        imageUrl: "",
        email: "ellie@merecruits.com",
        order: 4,
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

// Remove duplicate jobs based on slug
export const removeDuplicateJobs = mutation({
  args: {},
  handler: async (ctx) => {
    const allJobs = await ctx.db.query("jobs").collect();

    // Group jobs by slug
    const jobsBySlug = new Map<string, typeof allJobs>();

    for (const job of allJobs) {
      if (!jobsBySlug.has(job.slug)) {
        jobsBySlug.set(job.slug, []);
      }
      jobsBySlug.get(job.slug)!.push(job);
    }

    let duplicatesRemoved = 0;

    // For each slug with duplicates, keep the oldest one and delete the rest
    for (const [slug, jobs] of jobsBySlug.entries()) {
      if (jobs.length > 1) {
        // Sort by creation time (oldest first)
        jobs.sort((a, b) => a._creationTime - b._creationTime);

        // Delete all except the first (oldest) one
        for (let i = 1; i < jobs.length; i++) {
          await ctx.db.delete(jobs[i]._id);
          duplicatesRemoved++;
        }
      }
    }

    const remainingJobs = await ctx.db.query("jobs").collect();

    return {
      success: true,
      message: `Removed ${duplicatesRemoved} duplicate jobs`,
      duplicatesRemoved,
      totalJobsRemaining: remainingJobs.length,
    };
  },
});

// Add all 11 team members with complete information
export const addAllTeamMembers = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing team members
    const existingTeam = await ctx.db.query("teamMembers").collect();
    for (const member of existingTeam) {
      await ctx.db.delete(member._id);
    }

    const allTeamMembers = [
      {
        name: "Neil Simmons",
        role: "MD",
        bio: "Neil brings over 20 years' experience in the recruitment industry, having worked for various agencies across Kent and London. His experience spans both permanent and temporary recruitment across multiple sectors including commercial, financial services, and professional services. Neil's consultative and relationship-focused approach has earned him a reputation for delivering exceptional results for both clients and candidates. Outside of work, Neil enjoys spending time with his family, travelling, playing golf, and supporting his beloved Arsenal FC.",
        imageUrl: "",
        email: "neil@merecruits.com",
        order: 1,
        active: true,
      },
      {
        name: "Ellie Waterman",
        role: "Operations Director",
        bio: "Ellie joined the recruitment industry in 2010, initially working in the financial services sector before moving into operations and business development. Her extensive experience includes managing recruitment operations, developing business strategies, and building high-performing teams. Ellie's structured approach and commitment to excellence ensure smooth operations and outstanding client service. When she's not steering the business forward, Ellie enjoys family time, exploring new restaurants, and practising yoga.",
        imageUrl: "",
        email: "ellie@merecruits.com",
        order: 2,
        active: true,
      },
      {
        name: "Helen Barham",
        role: "Lead Consultant, ME Recruits",
        bio: "Helen founded ME Recruits, sister company to award-winning TN Recruits, bringing over 20 years of recruitment expertise to the ME postcode area. Her experience covers permanent and temporary recruitment across marketing, legal, administrative, and accountancy sectors. A strong communicator and influencer, Helen is client-focused, consultative and open-minded. Her approach goes beyond matching CVs to job descriptions – she connects people, purpose and potential. When not building successful partnerships, Helen enjoys family life, drives to the coast, holidays in Devon, long walks, fitness, and a glass of red wine.",
        imageUrl: "",
        email: "helen@merecruits.com",
        order: 3,
        active: true,
      },
      {
        name: "Kate Byrom",
        role: "Administrator",
        bio: "Kate brings over 15 years of administrative experience across various industries including recruitment, retail, and professional services. Her exceptional organisational skills and attention to detail keep the office running smoothly. Kate's warm and approachable manner makes her the first point of contact for many clients and candidates. She takes pride in ensuring every interaction is positive and professional. Outside of work, Kate loves spending time with her children, baking, and weekend walks in the Kent countryside.",
        imageUrl: "",
        email: "kate@merecruits.com",
        order: 4,
        active: true,
      },
      {
        name: "Sarah Bysouth",
        role: "Accounts Assistant",
        bio: "Sarah joined the team with 8 years of accounts and bookkeeping experience from both practice and industry settings. Her meticulous approach to financial management and compliance ensures the business runs efficiently. Sarah's friendly nature and problem-solving skills make her an invaluable part of the team. When she's not balancing the books, Sarah enjoys gardening, reading historical fiction, and spending quality time with her family.",
        imageUrl: "",
        email: "sarah@merecruits.com",
        order: 5,
        active: true,
      },
      {
        name: "Melissa Staveley",
        role: "Temp Consultant",
        bio: "Melissa has been in recruitment since 2015, specialising in temporary and contract placements across administrative, trades, and operations roles. Her ability to match the right people with the right opportunities at short notice has made her indispensable to clients who need reliable, quick solutions. Melissa's energetic and can-do attitude ensures every client and candidate receives exceptional service. Outside work, Melissa enjoys fitness classes, socialising with friends, and planning her next holiday adventure.",
        imageUrl: "",
        email: "melissa@merecruits.com",
        order: 6,
        active: true,
      },
      {
        name: "Jo Strong",
        role: "Recruitment Consultant",
        bio: "Jo brings 12 years of recruitment experience across financial services, insurance, and professional services sectors. Her thorough understanding of client needs and commitment to finding the perfect match has resulted in long-standing relationships and repeat business. Jo's professional yet personable approach puts both clients and candidates at ease. When she's not connecting talent with opportunity, Jo loves cooking, exploring local farmers' markets, and practising Pilates.",
        imageUrl: "",
        email: "jo@merecruits.com",
        order: 7,
        active: true,
      },
      {
        name: "Rachel Fisher",
        role: "Recruitment Consultant",
        bio: "Rachel joined the recruitment industry in 2017 after a successful career in HR and talent management. Her background gives her unique insight into what both employers and candidates are looking for. Rachel specialises in permanent placements across HR, administration, and marketing roles. Her thoughtful and thorough approach ensures successful long-term matches. Outside of work, Rachel enjoys running, attending theatre productions, and volunteering with local charities.",
        imageUrl: "",
        email: "rachel@merecruits.com",
        order: 8,
        active: true,
      },
      {
        name: "Emma Moss",
        role: "Recruitment Consultant",
        bio: "Emma has been in recruitment since 2018, focusing on office support, customer service, and administrative roles. Her warm personality and genuine care for people make her a natural relationship builder. Emma takes time to understand what motivates candidates and what drives business success, creating matches that benefit everyone. When not at work, Emma loves baking elaborate cakes, walking her dogs, and exploring new coffee shops around Kent.",
        imageUrl: "",
        email: "emma@merecruits.com",
        order: 9,
        active: true,
      },
      {
        name: "Isobel Colman",
        role: "Recruitment Resourcer",
        bio: "Isobel joined the team in 2020 as a Recruitment Resourcer, bringing enthusiasm and a fresh perspective to talent acquisition. Her role involves sourcing candidates, managing databases, and supporting consultants with market research and candidate engagement. Isobel's keen eye for detail and proactive approach ensure no opportunity is missed. She's building her career in recruitment with ambition and dedication. Outside work, Isobel enjoys painting, socialising with friends, and keeping up with the latest fashion trends.",
        imageUrl: "",
        email: "isobel@merecruits.com",
        order: 10,
        active: true,
      },
    ];

    for (const member of allTeamMembers) {
      await ctx.db.insert("teamMembers", member);
    }

    return {
      success: true,
      message: `Successfully added all ${allTeamMembers.length} team members!`,
      count: allTeamMembers.length
    };
  },
});
