import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "ME Recruits terms and conditions for recruitment services - important information for candidates and clients.",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-4 text-primary-foreground hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-primary-foreground/90">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="prose prose-slate max-w-none pt-8">
                <h2>1. Introduction</h2>
                <p>
                  These terms and conditions govern your use of ME Recruits&apos; website and recruitment services. ME Recruits is a trading name of TN Recruits Limited, registered in England and Wales (Company Number 9293806).
                </p>
                <p>
                  By using our website or services, you agree to be bound by these terms. Please read them carefully. If you do not agree with any part of these terms, you should not use our services.
                </p>

                <h2>2. Definitions</h2>
                <ul>
                  <li><strong>&quot;We&quot;, &quot;us&quot;, &quot;our&quot;:</strong> TN Recruits Limited trading as ME Recruits</li>
                  <li><strong>&quot;Client&quot;:</strong> Any organisation seeking recruitment services</li>
                  <li><strong>&quot;Candidate&quot;:</strong> Any individual seeking employment through our services</li>
                  <li><strong>&quot;Placement&quot;:</strong> The engagement of a Candidate by a Client</li>
                  <li><strong>&quot;Services&quot;:</strong> Recruitment and employment services provided by us</li>
                </ul>

                <h2>3. Our Services</h2>
                <h3>3.1 Scope of Services</h3>
                <p>ME Recruits provides recruitment services including:</p>
                <ul>
                  <li>Permanent recruitment</li>
                  <li>Temporary and contract staffing</li>
                  <li>Executive search</li>
                  <li>Candidate sourcing and screening</li>
                  <li>Career advice and guidance</li>
                </ul>

                <h3>3.2 No Guarantee</h3>
                <p>
                  Whilst we make every effort to find suitable candidates for clients and suitable positions for candidates, we cannot guarantee successful placements or employment outcomes.
                </p>

                <h2>4. Terms for Candidates</h2>
                <h3>4.1 Registration</h3>
                <p>
                  By registering with us, you confirm that all information provided is accurate, complete, and up to date. You must inform us immediately of any changes to your details.
                </p>

                <h3>4.2 CV and Application Materials</h3>
                <ul>
                  <li>You retain ownership of your CV and application materials</li>
                  <li>You grant us permission to present your details to prospective employers</li>
                  <li>We may format or edit your CV for presentation purposes</li>
                  <li>You must not provide false or misleading information</li>
                </ul>

                <h3>4.3 References and Verification</h3>
                <p>
                  You authorise us to approach referees, verify qualifications, and conduct background checks as necessary for employment purposes.
                </p>

                <h3>4.4 Interviews and Job Offers</h3>
                <ul>
                  <li>You must inform us immediately of interview outcomes</li>
                  <li>You must notify us of any job offers received</li>
                  <li>You should not accept offers without consulting us first</li>
                  <li>We facilitate negotiations but final decisions rest with you and the employer</li>
                </ul>

                <h3>4.5 Conduct</h3>
                <p>
                  You agree to:
                </p>
                <ul>
                  <li>Conduct yourself professionally at all times</li>
                  <li>Attend scheduled interviews punctually</li>
                  <li>Provide reasonable notice if you need to cancel or reschedule</li>
                  <li>Not approach clients directly to circumvent our fees</li>
                </ul>

                <h2>5. Terms for Clients</h2>
                <h3>5.1 Fees</h3>
                <p>
                  Our fees are agreed in writing before commencement of services. Standard terms include:
                </p>
                <ul>
                  <li><strong>Permanent Placements:</strong> A percentage of the candidate&apos;s first year salary (typically 15-25%)</li>
                  <li><strong>Temporary Workers:</strong> An hourly or daily rate plus margin</li>
                  <li><strong>Contract Workers:</strong> Agreed fee structure</li>
                </ul>

                <h3>5.2 Payment Terms</h3>
                <ul>
                  <li>Invoices are payable within 30 days unless otherwise agreed</li>
                  <li>Late payments may incur interest at 8% above Bank of England base rate</li>
                  <li>We reserve the right to suspend services for overdue accounts</li>
                </ul>

                <h3>5.3 Replacement Guarantee</h3>
                <p>
                  For permanent placements, we offer a replacement guarantee:
                </p>
                <ul>
                  <li>If a candidate leaves within 3 months, we&apos;ll provide a free replacement</li>
                  <li>Between 3-6 months, we&apos;ll provide a replacement at 50% fee</li>
                  <li>Subject to candidate leaving due to unsatisfactory performance (not redundancy or client circumstances)</li>
                </ul>

                <h3>5.4 Client Responsibilities</h3>
                <p>Clients must:</p>
                <ul>
                  <li>Provide accurate job descriptions and requirements</li>
                  <li>Inform us of interview outcomes within 48 hours</li>
                  <li>Not approach candidates directly to avoid fees</li>
                  <li>Comply with all employment legislation</li>
                  <li>Verify candidates&apos; right to work in the UK</li>
                </ul>

                <h2>6. Website Use</h2>
                <h3>6.1 Acceptable Use</h3>
                <p>You must not:</p>
                <ul>
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorised access to our systems</li>
                  <li>Transmit any harmful code or viruses</li>
                  <li>Scrape, copy, or redistribute content without permission</li>
                  <li>Impersonate another person or organisation</li>
                </ul>

                <h3>6.2 Intellectual Property</h3>
                <p>
                  All content on this website, including text, graphics, logos, and software, is owned by TN Recruits Limited or our licensors and is protected by copyright and intellectual property laws.
                </p>

                <h3>6.3 User Content</h3>
                <p>
                  By submitting content (CVs, applications, enquiries), you grant us a licence to use, store, and process this information for the purposes of providing our services.
                </p>

                <h2>7. Data Protection</h2>
                <p>
                  We process personal data in accordance with our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and applicable data protection laws including UK GDPR.
                </p>

                <h2>8. Confidentiality</h2>
                <p>
                  We maintain strict confidentiality regarding:
                </p>
                <ul>
                  <li>Candidate personal information and career aspirations</li>
                  <li>Client recruitment needs and business information</li>
                  <li>Salary negotiations and employment terms</li>
                </ul>

                <h2>9. Liability</h2>
                <h3>9.1 Our Liability</h3>
                <p>
                  Nothing in these terms excludes our liability for:
                </p>
                <ul>
                  <li>Death or personal injury caused by negligence</li>
                  <li>Fraud or fraudulent misrepresentation</li>
                  <li>Any other liability that cannot be excluded by law</li>
                </ul>

                <h3>9.2 Limitations</h3>
                <p>
                  Subject to 9.1 above:
                </p>
                <ul>
                  <li>We&apos;re not liable for any indirect or consequential losses</li>
                  <li>Our total liability is limited to the fees paid for the relevant service</li>
                  <li>We&apos;re not liable for candidate or client conduct after introduction</li>
                  <li>We&apos;re not liable for employment-related disputes</li>
                </ul>

                <h3>9.3 Indemnity</h3>
                <p>
                  You agree to indemnify us against any claims, losses, or damages arising from:
                </p>
                <ul>
                  <li>Your breach of these terms</li>
                  <li>Your violation of any laws or regulations</li>
                  <li>False or misleading information you provide</li>
                </ul>

                <h2>10. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We&apos;re not responsible for the content, privacy practices, or terms of these external sites.
                </p>

                <h2>11. Termination</h2>
                <p>
                  Either party may terminate their use of our services by providing written notice. Termination does not affect:
                </p>
                <ul>
                  <li>Outstanding fees or obligations</li>
                  <li>Any placements made before termination</li>
                  <li>Confidentiality obligations</li>
                  <li>Rights and remedies available at law</li>
                </ul>

                <h2>12. Force Majeure</h2>
                <p>
                  We&apos;re not liable for failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, strikes, or technical failures.
                </p>

                <h2>13. Complaints Procedure</h2>
                <p>
                  If you have a complaint:
                </p>
                <ol>
                  <li>Contact your consultant or email <a href="mailto:info@merecruits.com" className="text-primary hover:underline">info@merecruits.com</a></li>
                  <li>We&apos;ll acknowledge your complaint within 2 working days</li>
                  <li>We&apos;ll investigate and respond within 10 working days</li>
                  <li>If you&apos;re not satisfied, you may escalate to our Managing Director</li>
                </ol>

                <h2>14. Changes to Terms</h2>
                <p>
                  We may update these terms from time to time. Significant changes will be notified via email or website notice. Continued use of our services constitutes acceptance of updated terms.
                </p>

                <h2>15. Governing Law</h2>
                <p>
                  These terms are governed by English law. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>

                <h2>16. Severability</h2>
                <p>
                  If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                </p>

                <h2>17. Entire Agreement</h2>
                <p>
                  These terms, together with our Privacy Policy and any written service agreements, constitute the entire agreement between you and ME Recruits.
                </p>

                <h2>18. Contact Information</h2>
                <div className="bg-slate-50 p-6 rounded-lg not-prose my-6">
                  <p className="font-semibold mb-2">TN Recruits Limited (trading as ME Recruits)</p>
                  <p>Suite 166, 80 Churchill Square Business Centre</p>
                  <p>Kings Hill, West Malling</p>
                  <p>Kent, ME19 4YU</p>
                  <p className="mt-4">
                    <strong>Email:</strong> <a href="mailto:info@merecruits.com" className="text-primary hover:underline">info@merecruits.com</a>
                  </p>
                  <p>
                    <strong>Phone:</strong> <a href="tel:01732497979" className="text-primary hover:underline">01732 497979</a>
                  </p>
                  <p className="mt-4">
                    <strong>Company Number:</strong> 9293806<br />
                    <strong>VAT Number:</strong> 199331865
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Registered Address: 1 The Old Stables, Eridge Park, Tunbridge Wells, Kent, TN3 9JT
                  </p>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg not-prose my-6">
                  <p className="text-sm">
                    <strong>Professional Membership:</strong> ME Recruits is a member of the Recruitment & Employment Confederation (REC), committed to raising standards in recruitment and protecting the interests of clients and candidates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
