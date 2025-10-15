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

// Update all team members with LinkedIn URLs
export const updateTeamLinkedIn = mutation({
  args: {},
  handler: async (ctx) => {
    const teamMembers = await ctx.db.query("teamMembers").collect();

    const linkedInUpdates = [
      { name: "Neil Simmons", linkedInUrl: "https://www.linkedin.com/in/neil-simmons-b2721b15/" },
      { name: "Ellie Waterman", linkedInUrl: "https://www.linkedin.com/in/ellie-snuggs/" },
      { name: "Helen Barham", linkedInUrl: "https://www.linkedin.com/in/helen-barham-779394157/" },
      { name: "Kate Byrom", linkedInUrl: "https://www.linkedin.com/in/kate-byrom-98a07a23b/" },
      { name: "Sarah Bysouth", linkedInUrl: "https://www.linkedin.com/in/sarah-bysouth-029177125/" },
      { name: "Melissa Staveley", linkedInUrl: "https://www.linkedin.com/in/melissa-staveley-22202044/" },
      { name: "Jo Strong", linkedInUrl: "https://www.linkedin.com/in/joannastrong/", newName: "Jo Marsden-Strong" },
      { name: "Rachel Fisher", linkedInUrl: "https://www.linkedin.com/in/rachel-fisher-7b66a93/" },
      { name: "Emma Moss", linkedInUrl: "https://www.linkedin.com/in/emmamosslegal/" },
      { name: "Isobel Colman", linkedInUrl: "https://www.linkedin.com/in/izzycolman/" },
    ];

    let updatedCount = 0;

    for (const update of linkedInUpdates) {
      const member = teamMembers.find(m => m.name === update.name);
      if (member) {
        const patches: any = { linkedInUrl: update.linkedInUrl };
        if (update.newName) {
          patches.name = update.newName;
        }
        await ctx.db.patch(member._id, patches);
        updatedCount++;
      }
    }

    return {
      success: true,
      message: `Updated ${updatedCount} team members with LinkedIn URLs`,
      updatedCount,
    };
  },
});

// Count all articles (for debugging)
export const countArticles = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("newsArticles").collect();
    return {
      total: articles.length,
      articles: articles.map(a => ({ title: a.title, slug: a.slug, published: a.published })),
    };
  },
});

// Delete ALL articles (use with caution)
export const deleteAllArticles = mutation({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("newsArticles").collect();
    let deleted = 0;
    for (const article of articles) {
      await ctx.db.delete(article._id);
      deleted++;
    }
    return {
      success: true,
      message: `Deleted ${deleted} articles`,
      deleted,
    };
  },
});

// Replace all blog articles with 4 unique, high-quality articles
export const replaceBlogArticles = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all existing articles
    const existingArticles = await ctx.db.query("newsArticles").collect();
    let deletedCount = 0;
    for (const article of existingArticles) {
      await ctx.db.delete(article._id);
      deletedCount++;
    }

    // Create 4 new unique articles
    const newArticles = [
      {
        title: "The Kent Job Market in 2025: Opportunities in the ME Postcode Area",
        slug: "kent-job-market-2025-me-postcode-opportunities",
        excerpt: "Discover the latest employment trends across Kings Hill, Maidstone, and West Malling. Our analysis reveals which sectors are hiring and what opportunities await job seekers in Kent's thriving ME postcode area.",
        content: `<h2>Kent's Growing Economy</h2>
<p>The ME postcode area, encompassing Kings Hill, West Malling, Maidstone, Aylesford, and surrounding towns, has experienced remarkable economic growth over the past year. With excellent transport links to London and a thriving local business community, the region continues to attract major employers across multiple sectors.</p>

<h2>Sectors Experiencing Growth</h2>
<p>Our latest market research reveals significant recruitment activity in several key sectors:</p>

<h3>Financial Services & Accountancy</h3>
<p>Kings Hill Business Park remains a hub for financial services, with companies actively recruiting accountants, financial analysts, and mortgage administrators. Salaries in this sector have increased by 8% year-on-year, reflecting the demand for qualified professionals.</p>

<h3>Legal Services</h3>
<p>Maidstone and Tunbridge Wells continue to be centres for legal recruitment. Law firms are seeking legal secretaries, paralegals, and administrative support staff to meet growing client demands. The hybrid working model has made these roles more attractive to candidates across a wider geographical area.</p>

<h3>Marketing & Digital</h3>
<p>The digital transformation of Kent businesses has created strong demand for marketing professionals. From Marketing Executives to Digital Marketing Coordinators, companies are investing in building their brand presence and online engagement.</p>

<h3>Administration & Office Support</h3>
<p>Professional administrative roles remain consistently in demand across all sectors. Companies value skilled administrators who can manage operations efficiently, with salaries ranging from £25,000 to £32,000 depending on experience and responsibility level.</p>

<h2>Salary Insights</h2>
<p>Average salaries in the ME postcode area have increased across most sectors. Entry-level graduate positions start around £22,000-£24,000, mid-level professional roles typically range from £28,000-£38,000, and senior positions command £45,000-£65,000+.</p>

<h2>What Employers Are Looking For</h2>
<p>Beyond technical skills, employers increasingly prioritise adaptability, digital literacy, and strong communication abilities. Hybrid working has become the norm, with most positions offering 2-3 days working from home per week.</p>

<h2>Opportunities for Job Seekers</h2>
<p>Whether you're a graduate starting your career, an experienced professional seeking progression, or someone looking for a career change, the ME postcode area offers diverse opportunities. Our team at ME Recruits has access to roles across all sectors and can provide personalised guidance to help you find your perfect position.</p>

<p><strong>Contact us today to discuss your career aspirations and discover what opportunities are available for you.</strong></p>`,
        author: "Helen Barham",
        published: true,
        publishedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      },
      {
        title: "How to Write a CV That Gets You Interviews",
        slug: "how-to-write-cv-gets-interviews",
        excerpt: "Your CV is your first impression. Learn how to create a compelling CV that showcases your skills, experience, and potential, with expert tips from our recruitment consultants who review hundreds of CVs every week.",
        content: `<h2>The Purpose of Your CV</h2>
<p>Your CV has one primary purpose: to secure you an interview. It's not a comprehensive biography of your entire working life – it's a targeted marketing document that demonstrates why you're the ideal candidate for the specific role you're applying for.</p>

<h2>Essential CV Structure</h2>

<h3>Personal Details</h3>
<p>Keep it simple: name, phone number, email address, and location (town/city only). There's no need to include your full address, date of birth, or photograph unless specifically requested.</p>

<h3>Professional Profile</h3>
<p>Start with a concise 3-4 line professional profile that summarises who you are, your key strengths, and what you're looking for. Tailor this section for each application to align with the job description.</p>

<h3>Key Skills</h3>
<p>Bullet point 6-8 relevant skills that match the job requirements. Include both technical skills (e.g., advanced Excel, case management systems) and soft skills (e.g., stakeholder management, problem-solving).</p>

<h3>Professional Experience</h3>
<p>List your roles in reverse chronological order (most recent first). For each position include:</p>
<ul>
<li>Job title, company name, and employment dates</li>
<li>Brief context about the company/department</li>
<li>3-5 bullet points highlighting key achievements and responsibilities</li>
<li>Quantifiable results where possible (e.g., "Reduced processing time by 25%")</li>
</ul>

<h3>Education & Qualifications</h3>
<p>Include relevant qualifications, professional certifications, and training. If you're an experienced professional, keep this section brief – your work experience is more important than your GCSEs.</p>

<h2>Common CV Mistakes to Avoid</h2>

<h3>1. Generic Content</h3>
<p>Sending the same CV for every application rarely works. Customise your professional profile and highlight relevant experience for each role.</p>

<h3>2. Too Long or Too Short</h3>
<p>Two pages is ideal for most professionals. Graduates can use one page; senior executives might need three. Be concise and relevant.</p>

<h3>3. Poor Formatting</h3>
<p>Use a clean, professional format with consistent fonts, clear headings, and plenty of white space. Avoid tables, text boxes, or graphics that might not be compatible with applicant tracking systems.</p>

<h3>4. Spelling and Grammar Errors</h3>
<p>Proofread meticulously. Ask someone else to review it. A single typo can eliminate you from consideration.</p>

<h3>5. Unexplained Gaps</h3>
<p>If you have employment gaps, briefly explain them (e.g., "Career break for family responsibilities" or "Travelled in Southeast Asia"). Honesty is always the best policy.</p>

<h2>Tailoring Your CV for Different Sectors</h2>

<h3>Legal Sector</h3>
<p>Emphasise attention to detail, specific legal software experience (e.g., case management systems), and your understanding of confidentiality and compliance.</p>

<h3>Financial Services</h3>
<p>Highlight analytical skills, relevant qualifications (AAT, ACCA, CeMAP), software proficiency (Sage, Excel, financial systems), and any regulatory knowledge.</p>

<h3>Marketing</h3>
<p>Showcase measurable campaign results, digital platform experience, creative projects, and your understanding of analytics tools.</p>

<h2>The Power of Keywords</h2>
<p>Many companies use applicant tracking systems (ATS) to screen CVs. Include relevant keywords from the job description naturally throughout your CV. If the advert mentions "stakeholder management" or "Sage 50", ensure these exact phrases appear in your CV where genuinely applicable.</p>

<h2>Final Checks Before Sending</h2>
<ul>
<li>Is your CV tailored to this specific role?</li>
<li>Have you proofread for errors?</li>
<li>Is your contact information correct and current?</li>
<li>Have you saved it as a PDF with a professional filename (e.g., "FirstName_LastName_CV.pdf")?</li>
<li>Does your email address sound professional?</li>
</ul>

<p><strong>Need expert feedback on your CV? Our recruitment consultants at ME Recruits offer free CV reviews. Upload your CV today and we'll provide personalised advice to strengthen your applications.</strong></p>`,
        author: "Rachel Fisher",
        published: true,
        publishedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
      {
        title: "Interview Success: How to Stand Out From Other Candidates",
        slug: "interview-success-stand-out-from-candidates",
        excerpt: "Securing an interview is an achievement, but how do you ensure you're the candidate they remember? Our expert recruitment consultants share proven strategies to help you shine in your next interview.",
        content: `<h2>Preparation is Everything</h2>
<p>The candidates who succeed in interviews are those who prepare thoroughly. This goes far beyond rehearsing answers to common questions – it means truly understanding the company, the role, and how you can add value.</p>

<h2>Research Beyond the Website</h2>
<p>Most candidates visit the company website. Go further:</p>
<ul>
<li>Read recent news articles about the company</li>
<li>Check their LinkedIn company page for culture insights and recent updates</li>
<li>Review the interviewer's LinkedIn profile (if you know who'll be interviewing you)</li>
<li>Understand their competitors and market position</li>
<li>Look for recent initiatives, challenges, or growth areas</li>
</ul>

<p>This deeper knowledge allows you to ask insightful questions and demonstrate genuine interest.</p>

<h2>Prepare Strong Examples</h2>
<p>Use the STAR method (Situation, Task, Action, Result) to structure examples that demonstrate your skills and achievements:</p>

<h3>Situation</h3>
<p>Set the context briefly</p>

<h3>Task</h3>
<p>Explain what needed to be done</p>

<h3>Action</h3>
<p>Describe the specific steps you took</p>

<h3>Result</h3>
<p>Highlight the positive outcome, preferably with quantifiable results</p>

<p>Prepare 5-6 strong STAR examples covering different competencies: problem-solving, teamwork, leadership, dealing with difficult situations, achieving targets, and handling pressure.</p>

<h2>First Impressions Matter</h2>
<p>You have approximately 7 seconds to make a first impression. Ensure it's positive:</p>
<ul>
<li>Arrive 10-15 minutes early (but wait outside until 5 minutes before)</li>
<li>Dress appropriately for the company culture (research this)</li>
<li>Greet everyone professionally, including reception staff</li>
<li>Offer a firm handshake, maintain eye contact, and smile</li>
<li>Switch off your mobile phone completely</li>
</ul>

<h2>Master the Common Questions</h2>

<h3>"Tell Me About Yourself"</h3>
<p>Prepare a 60-90 second professional summary covering: who you are professionally, key achievements, relevant skills, and why you're interested in this role. Keep it concise and relevant.</p>

<h3>"Why Do You Want This Job?"</h3>
<p>Show you've researched the role and company. Explain specifically what attracts you to the position, how it aligns with your career goals, and what you can contribute.</p>

<h3>"What Are Your Strengths and Weaknesses?"</h3>
<p>For strengths, choose 2-3 that are directly relevant to the role with examples. For weaknesses, be honest about an area you're developing, explain what you're doing to improve it, and frame it positively.</p>

<h3>"Where Do You See Yourself in Five Years?"</h3>
<p>Show ambition aligned with potential career progression in their company. Avoid saying you plan to start your own business or move to a completely different career.</p>

<h2>Ask Intelligent Questions</h2>
<p>Always prepare thoughtful questions. This demonstrates interest and engagement. Good examples include:</p>
<ul>
<li>"What does success look like in this role during the first 6 months?"</li>
<li>"What are the biggest challenges facing the team/department currently?"</li>
<li>"How would you describe the company culture?"</li>
<li>"What opportunities are there for professional development?"</li>
<li>"What are the next steps in the interview process?"</li>
</ul>

<p>Never ask about salary, holidays, or benefits in a first interview unless the interviewer brings it up.</p>

<h2>Body Language and Communication</h2>
<ul>
<li>Maintain good eye contact without staring</li>
<li>Sit up straight and lean slightly forward to show engagement</li>
<li>Use natural hand gestures when speaking</li>
<li>Mirror the interviewer's energy level</li>
<li>Listen actively and don't interrupt</li>
<li>Take a moment to think before answering difficult questions</li>
</ul>

<h2>Handle Difficult Questions Professionally</h2>
<p>If asked about redundancies, employment gaps, or why you're leaving your current role, stay positive and professional. Never criticise previous employers. Focus on what you learned and how you're moving forward positively.</p>

<h2>Follow Up Effectively</h2>
<p>Within 24 hours, send a brief thank-you email reiterating your interest and highlighting one or two key points from the discussion. This keeps you top of mind and demonstrates professionalism.</p>

<h2>Virtual Interview Tips</h2>
<p>With many first-stage interviews conducted via video call:</p>
<ul>
<li>Test your technology beforehand</li>
<li>Ensure good lighting (face the window or use a lamp)</li>
<li>Choose a neutral, tidy background</li>
<li>Position the camera at eye level</li>
<li>Look at the camera when speaking, not the screen</li>
<li>Minimise distractions and inform household members</li>
<li>Dress professionally (yes, even on the bottom half!)</li>
</ul>

<p><strong>Want expert interview coaching? Contact ME Recruits for personalised preparation support to help you excel in your interviews.</strong></p>`,
        author: "Ellie Waterman",
        published: true,
        publishedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
      },
      {
        title: "Why Using a Recruitment Agency Gets You Better Job Opportunities",
        slug: "why-recruitment-agency-gets-better-opportunities",
        excerpt: "Many job seekers wonder whether to apply directly or work with a recruitment agency. Discover the hidden advantages of partnering with specialist recruiters and how it can accelerate your career progression.",
        content: `<h2>Access to the Hidden Job Market</h2>
<p>Did you know that approximately 70% of jobs are never advertised publicly? Many companies prefer to use trusted recruitment agencies for their hiring needs, particularly for senior roles or when they need discretion. By working with a specialist recruiter like ME Recruits, you gain access to these exclusive opportunities that you'd never find on job boards.</p>

<h2>Expert Market Knowledge</h2>
<p>Recruitment consultants live and breathe the job market. We know:</p>
<ul>
<li>Current salary benchmarks for your role and experience level</li>
<li>Which companies are hiring and their recruitment timelines</li>
<li>Company cultures and working environments</li>
<li>Growth opportunities within organisations</li>
<li>Skills that are currently in highest demand</li>
</ul>

<p>This insider knowledge helps you make informed career decisions and negotiate better packages.</p>

<h2>Professional CV and Interview Guidance</h2>
<p>At ME Recruits, we provide:</p>
<ul>
<li>Free CV reviews with specific improvement recommendations</li>
<li>Tailored advice on highlighting your strengths for specific roles</li>
<li>Interview preparation and coaching</li>
<li>Detailed briefings about the company and role before your interview</li>
<li>Insights into what the interviewer is looking for</li>
<li>Feedback after interviews to help you improve</li>
</ul>

<h2>We Work for You and the Employer</h2>
<p>A common misconception is that recruitment agencies only work for employers. In reality, we're matchmakers. Our success depends on finding the right fit for both candidate and client. We're motivated to:</p>
<ul>
<li>Understand your career aspirations, not just your CV</li>
<li>Find roles that align with your values and goals</li>
<li>Negotiate the best possible salary and benefits on your behalf</li>
<li>Ensure you're happy and successful in your new role</li>
</ul>

<h2>Time-Saving and Efficiency</h2>
<p>Job hunting while employed is challenging. Let us do the heavy lifting:</p>
<ul>
<li>We search for suitable opportunities on your behalf</li>
<li>We submit your CV only to relevant, pre-approved positions</li>
<li>We handle initial screening calls and coordinate interview schedules</li>
<li>We manage all communication with potential employers</li>
<li>We keep you updated throughout the process</li>
</ul>

<p>This means you can focus on your current job while we work to find your next opportunity.</p>

<h2>Salary Negotiation Support</h2>
<p>Negotiating salary can be uncomfortable. Your recruitment consultant acts as an intermediary, discussing salary expectations with the employer and advocating for the best possible package. We know:</p>
<ul>
<li>What the employer is genuinely prepared to pay</li>
<li>How your salary expectations compare to market rates</li>
<li>When and how to negotiate effectively</li>
<li>What additional benefits might be available</li>
</ul>

<h2>Confidentiality and Discretion</h2>
<p>When you're employed but exploring new opportunities, discretion is crucial. We:</p>
<ul>
<li>Never share your details without your explicit permission</li>
<li>Can approach companies on your behalf without revealing your identity initially</li>
<li>Understand the importance of protecting your current position</li>
<li>Schedule interviews at times that work for you</li>
</ul>

<h2>Ongoing Support and Career Advice</h2>
<p>Our relationship doesn't end when you start a new job. We provide:</p>
<ul>
<li>Regular check-ins during your notice period and after you start</li>
<li>Ongoing career advice as your circumstances evolve</li>
<li>Support if issues arise in your new role</li>
<li>Future opportunities as your career progresses</li>
</ul>

<h2>Multiple Opportunities Simultaneously</h2>
<p>Rather than applying to one job at a time and waiting for responses, we can put you forward for multiple suitable positions simultaneously. This gives you:</p>
<ul>
<li>More chances of securing interviews</li>
<li>The ability to compare opportunities</li>
<li>Stronger negotiating position if you have multiple offers</li>
<li>Faster route to your next role</li>
</ul>

<h2>Honest Feedback</h2>
<p>If you're not successful after an interview, many companies won't provide detailed feedback. As your recruitment partner, we:</p>
<ul>
<li>Request comprehensive feedback from every interview</li>
<li>Share this with you constructively</li>
<li>Help you understand what to improve</li>
<li>Keep you in mind for future suitable opportunities</li>
</ul>

<h2>Specialist Sector Knowledge</h2>
<p>At ME Recruits, our consultants specialise in specific sectors:</p>
<ul>
<li>Helen Barham focuses on marketing, legal, and accountancy roles</li>
<li>Isobel Colman specialises in legal recruitment</li>
<li>Ellie Waterman works with graduate and HR opportunities</li>
<li>Melissa Staveley handles temporary and contract positions</li>
</ul>

<p>This specialisation means your consultant truly understands your industry, the skills required, career progression paths, and can speak your language.</p>

<h2>It's Completely Free for Candidates</h2>
<p>All our services are completely free for job seekers. We're paid by employers when we successfully fill their positions. You get expert support, market insights, and access to exclusive opportunities at no cost.</p>

<h2>Getting Started with ME Recruits</h2>
<p>Working with us is straightforward:</p>
<ol>
<li>Upload your CV or email it directly to us</li>
<li>We'll arrange an initial conversation to understand your background and aspirations</li>
<li>We'll proactively search for opportunities that match your criteria</li>
<li>When suitable roles arise, we'll contact you with full details</li>
<li>If you're interested, we'll put you forward and support you through the entire process</li>
</ol>

<p><strong>Ready to access better opportunities? Register with ME Recruits today by uploading your CV or calling us on 01732 497979. Let our 25+ years of recruitment expertise work for you.</strong></p>`,
        author: "Helen Barham",
        published: true,
        publishedAt: Date.now() - 21 * 24 * 60 * 60 * 1000, // 21 days ago
      },
    ];

    for (const article of newArticles) {
      await ctx.db.insert("newsArticles", article);
    }

    return {
      success: true,
      message: `Deleted ${deletedCount} old articles and created ${newArticles.length} new unique blog posts`,
      deleted: deletedCount,
      created: newArticles.length,
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
