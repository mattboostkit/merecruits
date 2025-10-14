import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ME Recruits privacy policy - how we collect, use, and protect your personal data in accordance with GDPR and UK data protection laws.",
}

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
                  ME Recruits (trading name of TN Recruits Limited, Company Number 9293806) is committed to protecting your privacy and personal data. This privacy policy explains how we collect, use, store, and protect your information when you use our website or services.
                </p>
                <p>
                  We are registered with the Information Commissioner&apos;s Office (ICO) and comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>2.1 Personal Information You Provide</h3>
                <p>When you use our services, we may collect:</p>
                <ul>
                  <li><strong>Contact Details:</strong> Name, email address, phone number, postal address</li>
                  <li><strong>Professional Information:</strong> CV, employment history, qualifications, references, right to work documentation</li>
                  <li><strong>Application Data:</strong> Job applications, cover letters, salary expectations</li>
                  <li><strong>Communication Records:</strong> Correspondence with our recruitment consultants</li>
                  <li><strong>Identity Verification:</strong> Proof of identity and right to work documents</li>
                </ul>

                <h3>2.2 Information We Collect Automatically</h3>
                <ul>
                  <li><strong>Website Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
                  <li><strong>Cookies:</strong> See our Cookie Policy for details</li>
                  <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <h3>3.1 For Job Seekers</h3>
                <p>We use your personal data to:</p>
                <ul>
                  <li>Match you with suitable job opportunities</li>
                  <li>Present your details to prospective employers</li>
                  <li>Provide career advice and interview preparation</li>
                  <li>Verify your qualifications and references</li>
                  <li>Maintain our candidate database</li>
                  <li>Send you relevant job alerts (with your consent)</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>

                <h3>3.2 For Employers</h3>
                <p>We use your data to:</p>
                <ul>
                  <li>Understand your recruitment needs</li>
                  <li>Provide suitable candidate profiles</li>
                  <li>Manage the recruitment process</li>
                  <li>Maintain our client database</li>
                  <li>Improve our services</li>
                </ul>

                <h3>3.3 Website Visitors</h3>
                <ul>
                  <li>Improve website functionality and user experience</li>
                  <li>Analyse website traffic and usage patterns</li>
                  <li>Respond to enquiries through our contact forms</li>
                </ul>

                <h2>4. Legal Basis for Processing</h2>
                <p>We process your personal data under the following legal grounds:</p>
                <ul>
                  <li><strong>Consent:</strong> When you&apos;ve given explicit permission (e.g., job alerts, marketing)</li>
                  <li><strong>Contract:</strong> To perform our recruitment services</li>
                  <li><strong>Legal Obligation:</strong> To comply with employment law and regulations</li>
                  <li><strong>Legitimate Interests:</strong> To operate our business effectively whilst respecting your privacy</li>
                </ul>

                <h2>5. Data Sharing</h2>
                <h3>5.1 Who We Share Your Data With</h3>
                <p>We may share your information with:</p>
                <ul>
                  <li><strong>Prospective Employers:</strong> When presenting you for job opportunities (candidates only, with consent)</li>
                  <li><strong>Service Providers:</strong> IT systems, website hosting, email services (under strict data processing agreements)</li>
                  <li><strong>Professional Advisers:</strong> Lawyers, accountants, auditors (where necessary)</li>
                  <li><strong>Regulatory Bodies:</strong> HMRC, ICO, or other authorities when legally required</li>
                </ul>

                <h3>5.2 Data Protection</h3>
                <p>
                  We never sell your personal data. All third parties we work with are required to maintain appropriate security measures and process data only as instructed.
                </p>

                <h2>6. Data Retention</h2>
                <ul>
                  <li><strong>Active Candidates:</strong> We keep your data whilst you&apos;re actively job seeking and for up to 2 years after your last contact with us</li>
                  <li><strong>Placed Candidates:</strong> We retain placement records for 6 years after placement (legal requirement)</li>
                  <li><strong>Unsuccessful Applications:</strong> Deleted after 6 months unless you consent to remain on our database</li>
                  <li><strong>Client Data:</strong> Retained for the duration of the business relationship plus 6 years</li>
                  <li><strong>Website Data:</strong> Analytics data is typically retained for 26 months</li>
                </ul>

                <h2>7. Your Rights</h2>
                <p>Under UK GDPR, you have the right to:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                  <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for processing at any time</li>
                  <li><strong>Complain:</strong> Lodge a complaint with the ICO</li>
                </ul>

                <p>
                  To exercise any of these rights, please contact us at <a href="mailto:info@merecruits.com" className="text-primary hover:underline">info@merecruits.com</a> or call <a href="tel:01732497979" className="text-primary hover:underline">01732 497979</a>.
                </p>

                <h2>8. Data Security</h2>
                <p>We implement appropriate technical and organisational measures to protect your data, including:</p>
                <ul>
                  <li>Encrypted data transmission (SSL/TLS)</li>
                  <li>Secure password-protected databases</li>
                  <li>Regular security assessments and updates</li>
                  <li>Staff training on data protection</li>
                  <li>Access controls and audit trails</li>
                  <li>Regular backups</li>
                </ul>

                <h2>9. International Transfers</h2>
                <p>
                  We primarily process data within the UK. If we transfer data outside the UK, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.
                </p>

                <h2>10. Cookies</h2>
                <p>
                  Our website uses cookies to enhance your experience. Essential cookies are necessary for the website to function. We also use analytics cookies to understand how visitors use our site. You can manage cookie preferences through your browser settings.
                </p>

                <h2>11. Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for individuals under 16. We do not knowingly collect data from children. If you believe we&apos;ve inadvertently collected such information, please contact us immediately.
                </p>

                <h2>12. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy periodically. Significant changes will be communicated via email or prominent notice on our website. The &quot;Last updated&quot; date at the top indicates when changes were last made.
                </p>

                <h2>13. Contact Us</h2>
                <p>For any questions about this privacy policy or how we handle your data, please contact:</p>
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
                    <strong>Company Number:</strong> 9293806
                  </p>
                </div>

                <h2>14. Complaints</h2>
                <p>
                  If you&apos;re unhappy with how we&apos;ve handled your personal data, you have the right to complain to the Information Commissioner&apos;s Office (ICO):
                </p>
                <div className="bg-slate-50 p-6 rounded-lg not-prose my-6">
                  <p className="font-semibold mb-2">Information Commissioner&apos;s Office</p>
                  <p>Wycliffe House, Water Lane</p>
                  <p>Wilmslow, Cheshire, SK9 5AF</p>
                  <p className="mt-4">
                    <strong>Phone:</strong> 0303 123 1113
                  </p>
                  <p>
                    <strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>
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
