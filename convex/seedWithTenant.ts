import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// New seed script that creates ME Recruits tenant first, then seeds all data with tenantId
// Updated: Now includes all 10 team members (not 4)
export const seedMERecruitsV2 = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("Starting ME Recruits tenant seed with all 10 team members...");

    // Step 1: Create ME Recruits tenant
    const tenantId = await ctx.db.insert("tenants", {
      name: "ME Recruits",
      subdomain: "merecruits",
      customDomain: "www.merecruits.com",

      // Branding
      logo: "/logo.png", // Will be replaced with actual logo URL
      primaryColor: "#7e2634", // Deep burgundy from ME Recruits brand
      secondaryColor: "#f5f5f5",

      // Contact Information
      companyEmail: "info@merecruits.com",
      companyPhone: "01732 497979",
      companyAddress: "Suite 166, 80 Churchill Square Business Centre, Kings Hill, West Malling, Kent, ME19 4YU",

      // Social Media
      facebookUrl: "https://www.facebook.com/merecruits",
      twitterUrl: "https://twitter.com/merecruits",
      linkedInUrl: "https://www.linkedin.com/company/me-recruits",
      instagramUrl: "https://www.instagram.com/merecruits",

      // Subscription (ME Recruits is the first tenant - give them Professional plan)
      plan: "PROFESSIONAL",
      subscriptionStatus: "ACTIVE",

      // Settings for Professional plan
      settings: {
        maxActiveJobs: -1, // unlimited
        maxCvAnalysesPerMonth: -1, // unlimited
        maxUsers: 10, // Generous for first tenant
        allowCustomDomain: true,
        allowApiAccess: false,
        showPoweredBy: false, // Don't show "Powered by HireKit" for first tenant
        aiCvAnalysisEnabled: true,
        cvAnalysesUsedThisMonth: 0,
        usageResetDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      },

      // SEO
      metaTitle: "ME Recruits | Recruitment Agency in Kent | Maidstone, Medway & Tunbridge Wells",
      metaDescription: "Leading recruitment agency in Kent specialising in permanent and temporary office-based staff. Serving Maidstone, Medway, Tunbridge Wells and surrounding ME postcode areas.",
      aboutUs: "Over 25 years of recruitment expertise in the ME postcode area. Sister company to award-winning TN Recruits, connecting people, purpose and potential.",

      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log(`Created tenant: ${tenantId}`);

    // Step 2: Seed Team Members - ALL 10 team members
    const teamMembers = [
      {
        tenantId,
        name: "Neil Simmons",
        role: "MD",
        bio: "Neil brings over 20 years' experience in the recruitment industry, having worked for various agencies across Kent and London. His experience spans both permanent and temporary recruitment across multiple sectors including commercial, financial services, and professional services. Neil's consultative and relationship-focused approach has earned him a reputation for delivering exceptional results for both clients and candidates. Outside of work, Neil enjoys spending time with his family, travelling, playing golf, and supporting his beloved Arsenal FC.",
        imageUrl: "",
        email: "neil@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/neil-simmons-b2721b15/",
        order: 1,
        active: true,
      },
      {
        tenantId,
        name: "Ellie Waterman",
        role: "Operations Director",
        bio: "Ellie joined the recruitment industry in 2010, initially working in the financial services sector before moving into operations and business development. Her extensive experience includes managing recruitment operations, developing business strategies, and building high-performing teams. Ellie's structured approach and commitment to excellence ensure smooth operations and outstanding client service. When she's not steering the business forward, Ellie enjoys family time, exploring new restaurants, and practising yoga.",
        imageUrl: "",
        email: "ellie@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/ellie-snuggs/",
        order: 2,
        active: true,
      },
      {
        tenantId,
        name: "Helen Barham",
        role: "Lead Consultant, ME Recruits",
        bio: "Helen founded ME Recruits, sister company to award-winning TN Recruits, bringing over 20 years of recruitment expertise to the ME postcode area. Her experience covers permanent and temporary recruitment across marketing, legal, administrative, and accountancy sectors. A strong communicator and influencer, Helen is client-focused, consultative and open-minded. Her approach goes beyond matching CVs to job descriptions – she connects people, purpose and potential. When not building successful partnerships, Helen enjoys family life, drives to the coast, holidays in Devon, long walks, fitness, and a glass of red wine.",
        imageUrl: "",
        email: "helen@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/helen-barham-779394157/",
        order: 3,
        active: true,
      },
      {
        tenantId,
        name: "Kate Byrom",
        role: "Administrator",
        bio: "Kate brings over 15 years of administrative experience across various industries including recruitment, retail, and professional services. Her exceptional organisational skills and attention to detail keep the office running smoothly. Kate's warm and approachable manner makes her the first point of contact for many clients and candidates. She takes pride in ensuring every interaction is positive and professional. Outside of work, Kate loves spending time with her children, baking, and weekend walks in the Kent countryside.",
        imageUrl: "",
        email: "kate@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/kate-byrom-98a07a23b/",
        order: 4,
        active: true,
      },
      {
        tenantId,
        name: "Sarah Bysouth",
        role: "Accounts Assistant",
        bio: "Sarah joined the team with 8 years of accounts and bookkeeping experience from both practice and industry settings. Her meticulous approach to financial management and compliance ensures the business runs efficiently. Sarah's friendly nature and problem-solving skills make her an invaluable part of the team. When she's not balancing the books, Sarah enjoys gardening, reading historical fiction, and spending quality time with her family.",
        imageUrl: "",
        email: "sarah@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/sarah-bysouth-029177125/",
        order: 5,
        active: true,
      },
      {
        tenantId,
        name: "Melissa Staveley",
        role: "Temp Consultant",
        bio: "Melissa has been in recruitment since 2015, specialising in temporary and contract placements across administrative, trades, and operations roles. Her ability to match the right people with the right opportunities at short notice has made her indispensable to clients who need reliable, quick solutions. Melissa's energetic and can-do attitude ensures every client and candidate receives exceptional service. Outside work, Melissa enjoys fitness classes, socialising with friends, and planning her next holiday adventure.",
        imageUrl: "",
        email: "melissa@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/melissa-staveley-22202044/",
        order: 6,
        active: true,
      },
      {
        tenantId,
        name: "Jo Marsden-Strong",
        role: "Recruitment Consultant",
        bio: "Jo brings 12 years of recruitment experience across financial services, insurance, and professional services sectors. Her thorough understanding of client needs and commitment to finding the perfect match has resulted in long-standing relationships and repeat business. Jo's professional yet personable approach puts both clients and candidates at ease. When she's not connecting talent with opportunity, Jo loves cooking, exploring local farmers' markets, and practising Pilates.",
        imageUrl: "",
        email: "jo@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/joannastrong/",
        order: 7,
        active: true,
      },
      {
        tenantId,
        name: "Rachel Fisher",
        role: "Recruitment Consultant",
        bio: "Rachel joined the recruitment industry in 2017 after a successful career in HR and talent management. Her background gives her unique insight into what both employers and candidates are looking for. Rachel specialises in permanent placements across HR, administration, and marketing roles. Her thoughtful and thorough approach ensures successful long-term matches. Outside of work, Rachel enjoys running, attending theatre productions, and volunteering with local charities.",
        imageUrl: "",
        email: "rachel@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/rachel-fisher-7b66a93/",
        order: 8,
        active: true,
      },
      {
        tenantId,
        name: "Emma Moss",
        role: "Recruitment Consultant",
        bio: "Emma has been in recruitment since 2018, focusing on office support, customer service, and administrative roles. Her warm personality and genuine care for people make her a natural relationship builder. Emma takes time to understand what motivates candidates and what drives business success, creating matches that benefit everyone. When not at work, Emma loves baking elaborate cakes, walking her dogs, and exploring new coffee shops around Kent.",
        imageUrl: "",
        email: "emma@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/emmamosslegal/",
        order: 9,
        active: true,
      },
      {
        tenantId,
        name: "Isobel Colman",
        role: "Recruitment Resourcer",
        bio: "Isobel joined the team in 2020 as a Recruitment Resourcer, bringing enthusiasm and a fresh perspective to talent acquisition. Her role involves sourcing candidates, managing databases, and supporting consultants with market research and candidate engagement. Isobel's keen eye for detail and proactive approach ensure no opportunity is missed. She's building her career in recruitment with ambition and dedication. Outside work, Isobel enjoys painting, socialising with friends, and keeping up with the latest fashion trends.",
        imageUrl: "",
        email: "isobel@merecruits.com",
        linkedInUrl: "https://www.linkedin.com/in/izzycolman/",
        order: 10,
        active: true,
      },
    ];

    for (const member of teamMembers) {
      await ctx.db.insert("teamMembers", member);
    }

    console.log(`Created ${teamMembers.length} team members`);

    // Step 3: Seed Jobs
    const jobs = [
      {
        tenantId,
        title: "Business Development Executive",
        slug: "business-development-executive-dartford",
        location: "Dartford",
        description: "Exciting opportunity for a Business Development Executive to join a growing company in Dartford. You will be responsible for identifying new business opportunities, building relationships with clients, and driving sales growth.",
        salary: "£30,000 - £35,000",
        salaryMin: 30000,
        salaryMax: 35000,
        salaryType: "ANNUAL" as const,
        type: "PERMANENT" as const,
        category: "Sales & Account Management",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        tenantId,
        title: "Digital Marketing Executive",
        slug: "digital-marketing-executive-west-malling",
        location: "West Malling",
        description: "Join a dynamic marketing team as a Digital Marketing Executive in West Malling. You will manage digital campaigns, social media, SEO/SEM strategies, and analytics to drive online engagement and growth.",
        salary: "£30,000 - £34,000",
        salaryMin: 30000,
        salaryMax: 34000,
        salaryType: "ANNUAL" as const,
        type: "PERMANENT" as const,
        category: "Marketing / PR / Events",
        consultant: "Helen Barham",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        tenantId,
        title: "Legal Secretary",
        slug: "legal-secretary-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "Well-established law firm requires experienced Legal Secretary to support busy litigation department. Competitive salary and benefits package.",
        salary: "£25,000 - £27,000",
        salaryMin: 25000,
        salaryMax: 27000,
        salaryType: "ANNUAL" as const,
        type: "PERMANENT" as const,
        category: "Legal",
        consultant: "Isobel Colman",
        status: "ACTIVE" as const,
        featured: true,
      },
      {
        tenantId,
        title: "Operations Coordinator",
        slug: "operations-coordinator-maidstone",
        location: "Maidstone",
        description: "Fast-paced Operations Coordinator role in Maidstone. Coordinate daily operations, manage schedules, and ensure smooth business processes. Competitive hourly rate.",
        salary: "£12 - £13 per hour",
        salaryMin: 12,
        salaryMax: 13,
        salaryType: "HOURLY" as const,
        hourlyRateMin: 12,
        hourlyRateMax: 13,
        type: "TEMPORARY" as const,
        category: "Admin / Secretarial / Office Support",
        consultant: "Melissa Staveley",
        status: "ACTIVE" as const,
        featured: false,
      },
    ];

    for (const job of jobs) {
      await ctx.db.insert("jobs", job);
    }

    console.log(`Created ${jobs.length} jobs`);

    // Step 4: Seed News Articles
    const articles = [
      {
        tenantId,
        title: "How to Write a CV That Gets You Interviews",
        slug: "how-to-write-cv-gets-interviews",
        excerpt: "Your CV is your first impression. Learn how to create a compelling CV that showcases your skills, experience, and potential, with expert tips from our recruitment consultants.",
        content: `## The Purpose of Your CV

Your CV has one primary purpose: to secure you an interview. It's not a comprehensive biography – it's a targeted marketing document that demonstrates why you're the ideal candidate for the specific role you're applying for.

## Essential CV Structure

### Personal Details
Keep it simple: name, phone number, email address, and location (town/city only). There's no need to include your full address, date of birth, or photograph unless specifically requested.

### Professional Profile
Start with a concise 3-4 line professional profile that summarises who you are, your key strengths, and what you're looking for. Tailor this section for each application.

### Key Skills
Bullet point 6-8 relevant skills that match the job requirements. Include both technical skills and soft skills.

### Professional Experience
List your roles in reverse chronological order. For each position include:
- Job title, company name, and employment dates
- Brief context about the company/department
- 3-5 bullet points highlighting key achievements
- Quantifiable results where possible

## Common CV Mistakes to Avoid

1. **Generic Content** - Customise your CV for each role
2. **Too Long or Too Short** - Two pages is ideal
3. **Poor Formatting** - Use clean, professional formatting
4. **Spelling and Grammar Errors** - Proofread meticulously
5. **Unexplained Gaps** - Briefly explain employment gaps

**Need expert feedback on your CV? Upload it today and we'll provide personalised advice.**`,
        author: "Helen Barham",
        published: true,
        publishedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      },
      {
        tenantId,
        title: "Interview Success: How to Stand Out From Other Candidates",
        slug: "interview-success-stand-out-from-candidates",
        excerpt: "Securing an interview is an achievement, but how do you ensure you're the candidate they remember? Our expert consultants share proven strategies.",
        content: `## Preparation is Everything

The candidates who succeed in interviews are those who prepare thoroughly. This goes beyond rehearsing answers – it means understanding the company, the role, and how you can add value.

## Research Beyond the Website

- Read recent news about the company
- Check their LinkedIn for culture insights
- Review the interviewer's LinkedIn profile
- Understand competitors and market position
- Look for recent initiatives or challenges

## Prepare Strong STAR Examples

Use the STAR method (Situation, Task, Action, Result) to structure examples:
- **Situation** - Set the context
- **Task** - Explain what needed doing
- **Action** - Describe your specific steps
- **Result** - Highlight the positive outcome

Prepare 5-6 strong examples covering: problem-solving, teamwork, leadership, difficult situations, achieving targets, and handling pressure.

## First Impressions Matter

- Arrive 10-15 minutes early
- Dress appropriately for the company culture
- Greet everyone professionally
- Offer a firm handshake and maintain eye contact
- Switch off your mobile phone

**Want expert interview coaching? Contact us for personalised preparation support.**`,
        author: "Ellie Waterman",
        published: true,
        publishedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      },
    ];

    for (const article of articles) {
      await ctx.db.insert("newsArticles", article);
    }

    console.log(`Created ${articles.length} news articles`);

    return {
      success: true,
      message: "ME Recruits tenant and all data seeded successfully!",
      tenantId: tenantId,
      counts: {
        teamMembers: teamMembers.length,
        jobs: jobs.length,
        articles: articles.length,
      },
    };
  },
});
