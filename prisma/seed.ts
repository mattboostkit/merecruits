const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Clear existing data
  await prisma.cVUpload.deleteMany()
  await prisma.contactSubmission.deleteMany()
  await prisma.job.deleteMany()
  await prisma.newsArticle.deleteMany()
  await prisma.teamMember.deleteMany()

  // Seed Jobs
  const jobs = await prisma.job.createMany({
    data: [
      {
        title: "Marketing Manager",
        slug: "marketing-manager-maidstone",
        location: "Maidstone",
        description: "Leading marketing agency seeks experienced Marketing Manager to oversee campaigns, manage team and drive growth. You'll be responsible for developing and implementing marketing strategies, managing a small team, and working closely with clients to deliver exceptional results. This is an excellent opportunity for career progression with a dynamic and growing company.",
        salary: "£35,000 - £45,000",
        salaryMin: 35000,
        salaryMax: 45000,
        type: "PERMANENT",
        category: "Marketing",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "Legal Secretary",
        slug: "legal-secretary-tunbridge-wells",
        location: "Tunbridge Wells",
        description: "Well-established law firm requires experienced Legal Secretary to support busy litigation department. You will provide comprehensive secretarial support including audio typing, file management, diary management and client liaison. Previous experience in a legal environment is essential. Competitive salary and benefits package including pension and health insurance.",
        salary: "£26,000 - £32,000",
        salaryMin: 26000,
        salaryMax: 32000,
        type: "PERMANENT",
        category: "Legal",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "Office Administrator",
        slug: "office-administrator-medway",
        location: "Medway",
        description: "Growing SME seeks organised Office Administrator to manage daily operations, coordinate meetings and provide administrative support. You'll be the first point of contact for visitors and phone calls, manage office supplies, and support the management team with various projects. This role suits someone who thrives in a fast-paced environment.",
        salary: "£24,000 - £28,000",
        salaryMin: 24000,
        salaryMax: 28000,
        type: "PERMANENT",
        category: "Admin",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "Temporary Receptionist",
        slug: "temporary-receptionist-maidstone",
        location: "Maidstone",
        description: "Immediate temporary receptionist role for 3 months to cover maternity leave. Professional office environment with potential for extension. You'll be responsible for greeting visitors, managing the switchboard, handling incoming post and general office duties. Excellent communication skills and professional manner essential.",
        salary: "£12 - £14 per hour",
        type: "TEMPORARY",
        category: "Admin",
        status: "ACTIVE",
        featured: false,
      },
      {
        title: "Finance Assistant",
        slug: "finance-assistant-dartford",
        location: "Dartford",
        description: "Established accountancy firm seeks Finance Assistant to join their growing team. You'll assist with bookkeeping, VAT returns, invoicing and general finance administration. AAT qualification or equivalent experience required. Great opportunity to develop your finance career with full study support available.",
        salary: "£25,000 - £30,000",
        salaryMin: 25000,
        salaryMax: 30000,
        type: "PERMANENT",
        category: "Finance",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "HR Coordinator",
        slug: "hr-coordinator-west-malling",
        location: "West Malling",
        description: "Fast-growing company seeks HR Coordinator to support all aspects of the employee lifecycle. You'll assist with recruitment, onboarding, employee relations and HR administration. CIPD qualification desirable but not essential. Great benefits including hybrid working and professional development opportunities.",
        salary: "£28,000 - £34,000",
        salaryMin: 28000,
        salaryMax: 34000,
        type: "PERMANENT",
        category: "HR",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "Operations Manager",
        slug: "operations-manager-maidstone",
        location: "Maidstone",
        description: "Leading logistics company requires experienced Operations Manager to oversee daily operations, manage team and drive continuous improvement. You'll be responsible for ensuring smooth operations, meeting KPIs and developing team members. Previous management experience in logistics or operations essential.",
        salary: "£40,000 - £50,000",
        salaryMin: 40000,
        salaryMax: 50000,
        type: "PERMANENT",
        category: "Operations",
        status: "ACTIVE",
        featured: true,
      },
      {
        title: "Customer Service Advisor",
        slug: "customer-service-advisor-medway",
        location: "Medway",
        description: "Award-winning customer service team seeks enthusiastic Customer Service Advisor. You'll handle customer enquiries via phone and email, resolve issues and provide exceptional service. Full training provided. Great benefits including employee discounts and clear progression path.",
        salary: "£22,000 - £26,000",
        salaryMin: 22000,
        salaryMax: 26000,
        type: "PERMANENT",
        category: "Admin",
        status: "ACTIVE",
        featured: false,
      },
    ],
  })

  console.log(`✅ Created ${jobs.count} jobs`)

  // Seed News Articles
  const news = await prisma.newsArticle.createMany({
    data: [
      {
        title: "Top 5 Interview Tips for 2025",
        slug: "top-5-interview-tips-2025",
        excerpt: "Prepare for success with our expert interview advice that will help you stand out from the competition.",
        content: "Interviews can be nerve-wracking, but with the right preparation, you can walk in with confidence...",
        author: "Sarah Johnson",
        published: true,
        publishedAt: new Date("2025-01-15"),
      },
      {
        title: "The Kent Job Market: What to Expect in 2025",
        slug: "kent-job-market-2025",
        excerpt: "Our analysis of the Kent employment landscape and predictions for the year ahead.",
        content: "The Kent job market continues to show resilience and growth across multiple sectors...",
        author: "Michael Roberts",
        published: true,
        publishedAt: new Date("2025-02-01"),
      },
      {
        title: "How to Write a CV That Gets Noticed",
        slug: "write-cv-gets-noticed",
        excerpt: "Expert tips on crafting a compelling CV that catches recruiters' attention.",
        content: "Your CV is your first impression with a potential employer. Here's how to make it count...",
        author: "Emma Thompson",
        published: true,
        publishedAt: new Date("2025-03-10"),
      },
      {
        title: "Benefits of Working with a Recruitment Agency",
        slug: "benefits-recruitment-agency",
        excerpt: "Discover why partnering with a recruitment agency can accelerate your job search.",
        content: "Recruitment agencies offer unique advantages that can significantly enhance your job search...",
        author: "David Clarke",
        published: true,
        publishedAt: new Date("2025-04-05"),
      },
    ],
  })

  console.log(`✅ Created ${news.count} news articles`)

  // Seed Team Members
  const team = await prisma.teamMember.createMany({
    data: [
      {
        name: "Neil Simmons",
        role: "Managing Director",
        bio: "Neil serves as Managing Director across the TN Recruits group including ME Recruits, TN Recruits Law, TN Recruits Accounts, and TN Recruits Automotive. With a background in media sales and a conscientious, honest, and ethical approach, Neil leads the team with a focus on exceptional service. When not building successful recruitment partnerships, Neil enjoys summer days, family time, and dining out. His hobbies include football, golf, and gardening.",
        imageUrl: "/team/neil-simmons.jpg",
        email: "neil@merecruits.com",
        order: 1,
        active: true,
      },
      {
        name: "Ellie Waterman",
        role: "Operations Director",
        bio: "As Operations Director, Ellie oversees operations across TN Recruits, ME Recruits, TN Recruits Law, TN Recruits Accounts, TN Recruits Automotive, and both temporary divisions. With extensive experience in customer service management, Ellie brings a conscientious, professional, and loyal approach to everything she does. She ensures smooth operations and exceptional service delivery across all divisions. In her spare time, Ellie enjoys wine tastings, Netflix, and hot holidays with family.",
        imageUrl: "/team/ellie-waterman.jpg",
        email: "ellie@merecruits.com",
        order: 2,
        active: true,
      },
      {
        name: "Helen Barham",
        role: "Lead Consultant",
        bio: "Helen is the Lead Consultant at ME Recruits, bringing extensive experience from her background as Head of Advertising, media sales, and performance coaching. As a strong communicator and influencer, Helen takes a client-focused, consultative, and open-minded approach to recruitment. She specialises in understanding both candidate and client needs to create perfect matches. Helen enjoys family life, drives to the coast, holidays in Devon, long walks, and fitness, often unwinding with a good red wine.",
        imageUrl: "/team/helen-barham.jpg",
        email: "helen@merecruits.com",
        order: 3,
        active: true,
      },
      {
        name: "Kate Byrom",
        role: "Administrator",
        bio: "Kate brings a friendly and relaxed approach to her role as Administrator, ensuring smooth operations across the team. With a background in teaching, Kate excels at organisation and supporting both clients and candidates. When she's not keeping the office running efficiently, Kate enjoys cooking and eating good food, going to the gym, and walking her dog.",
        imageUrl: "/team/kate-byrom.jpg",
        email: "kate@merecruits.com",
        order: 4,
        active: true,
      },
      {
        name: "Sarah Bysouth",
        role: "Accounts Assistant",
        bio: "Sarah supports the team as Accounts Assistant, ensuring all financial processes run smoothly and efficiently. Her attention to detail and professional approach help maintain the high standards expected across the ME Recruits and TN Recruits group.",
        imageUrl: "/team/sarah-bysouth.jpg",
        email: "sarah@merecruits.com",
        order: 5,
        active: true,
      },
      {
        name: "Melissa Staveley",
        role: "Temp Consultant",
        bio: "Melissa is a Temp Consultant at TN Recruits Temps, bringing experience as a Key Account Handler and Sales and Production Assistant. With a friendly, good listening, and hard-working approach, Melissa excels at matching temporary candidates with the right opportunities. She loves hot sunny days, 'Tough Mudder' runs, and walking her dog in the woods. In her free time, Melissa enjoys running, family days out, and visiting different places and countries.",
        imageUrl: "/team/melissa-staveley.jpg",
        email: "melissa@merecruits.com",
        order: 6,
        active: true,
      },
      {
        name: "Jo Strong",
        role: "Recruitment Consultant",
        bio: "Jo is a Recruitment Consultant at TN Recruits with valuable experience from the travel industry and accountancy & finance recruitment. Known for her honest, friendly, and consultative approach, Jo builds strong relationships with both clients and candidates. She enjoys G&T, Prosecco, and a nice glass of wine, along with summer holidays and family time. Jo's hobbies include long walks, running, gardening, and spending quality time with family and friends.",
        imageUrl: "/team/jo-strong.jpg",
        email: "jo@merecruits.com",
        order: 7,
        active: true,
      },
      {
        name: "Rachel Fisher",
        role: "Recruitment Consultant, Accounts",
        bio: "Rachel is a Recruitment Consultant specialising in accounts and finance at TN Recruits Accounts. With experience in recruitment and account management, Rachel brings a professional, consultative, and hard-working approach to finding the perfect matches. She enjoys going for walks, camping, and spending time with family. Rachel's dedication and reliability make her a trusted partner for both clients and candidates.",
        imageUrl: "/team/rachel-fisher.jpg",
        email: "rachel@merecruits.com",
        order: 8,
        active: true,
      },
      {
        name: "Emma Moss",
        role: "Recruitment Consultant, Legal",
        bio: "Emma is a Recruitment Consultant at TN Recruits Law, bringing experience from advertising sales into the legal recruitment sector. With a friendly and honest approach, Emma specialises in matching legal professionals with the right opportunities. Her interests in law and psychology complement her recruitment expertise. Emma enjoys wine, yoga, and family time, and stays active through running.",
        imageUrl: "/team/emma-moss.jpg",
        email: "emma@merecruits.com",
        order: 9,
        active: true,
      },
      {
        name: "Isobel Colman",
        role: "Recruitment Resourcer, Legal",
        bio: "Isobel joined the team at TN Recruits Law in July 2024 as a Recruitment Resourcer, bringing fresh energy and enthusiasm to the legal recruitment team. She supports the consultants in sourcing and engaging with talented legal professionals across the region.",
        imageUrl: "/team/isobel-colman.jpg",
        email: "isobel@merecruits.com",
        order: 10,
        active: true,
      },
    ],
  })

  console.log(`✅ Created ${team.count} team members`)
  console.log("🎉 Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
