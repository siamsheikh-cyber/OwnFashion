import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Own Fashion",
  description:
    "Learn how Own Fashion collects, uses, and safeguards your information, including our cookie policies, analytics, and third-party disclosures.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full">
        {/* Hero Header */}
        <section className="relative w-full border-b border-primary/10 bg-[#ECE7DC] py-16 md:py-24 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#775a19_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

          <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 border border-primary/20 bg-background/80 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              <span
                className="text-primary text-[11px] uppercase tracking-[0.2em] font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Transparency &amp; Trust
              </span>
            </div>

            <h1
              className="text-primary text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-4 leading-[1.15]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Privacy Policy
            </h1>

            <p
              className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
              style={{ fontFamily: "Literata, Georgia, serif" }}
            >
              Last Updated: February 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24">
          <div
            className="space-y-12 text-on-surface-variant text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "Literata, Georgia, serif" }}
          >
            {/* 1. Overview */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                1. Overview &amp; Commitment
              </h2>
              <p>
                At <strong className="text-primary font-semibold">Own Fashion</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we deeply respect your personal privacy. This Privacy Policy explains what information we may collect when you visit our website, how we utilize this data, and the precautions we take to safeguard your browsing experience.
              </p>
              <p>
                By accessing and using Own Fashion, you consent to the data practices described in this statement. If you do not agree with any terms in this policy, please discontinue use of the site.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                2. Information We Collect
              </h2>
              <p>
                We do not require users to create personal accounts or disclose sensitive private information to browse our fashion editorials and curated product recommendations. We may, however, gather the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>
                  <strong className="text-primary font-semibold">Log &amp; Technical Data:</strong> When you navigate our pages, our servers automatically record standard connection information, including your IP address, browser version, operating system, referring URL, pages viewed, time spent on pages, and date/time stamps.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Voluntarily Provided Information:</strong> When you contact us through our contact form, send feedback, or subscribe to our newsletter, we receive the information you provide, such as your name, email address, and message contents.
                </li>
              </ul>
            </div>

            {/* 3. Cookies, Analytics & Tracking */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                3. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                Own Fashion uses standard cookies, web beacons, and similar tracking technologies to enhance user navigation, analyze editorial trends, and evaluate overall site performance:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>
                  <strong className="text-primary font-semibold">Google Analytics:</strong> We utilize Google Analytics to understand aggregate traffic patterns, visitor demographics, and popular content. Google Analytics collects anonymized interaction data without identifying individuals.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Microsoft Clarity:</strong> We may use behavioral analysis tools such as Microsoft Clarity to capture heatmaps and navigational flows to optimize design layout and usability.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Affiliate Tracking Cookies:</strong> When you click on product links redirecting to merchant platforms (such as Amazon.com), a tracking cookie is placed by the merchant to credit qualifying purchases. These cookies do not transmit personally identifiable information to us.
                </li>
              </ul>
              <p>
                You can configure your browser settings to decline or delete cookies at any time. Please note that disabling cookies may slightly affect certain interactive website features.
              </p>
            </div>

            {/* 4. Third-Party Links & Affiliate Partners */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                4. Third-Party Links &amp; Merchant Redirection
              </h2>
              <p>
                Our articles and curated sliders contain links to external third-party websites, predominantly <strong className="text-primary font-semibold">Amazon.com</strong> and associated retail partners. We do not operate or control these third-party platforms.
              </p>
              <p>
                Once you click an outbound link and leave Own Fashion, we strongly encourage you to review the privacy policies and terms of service of each external website you visit. We are not responsible for the privacy practices, content, or transaction policies of third-party merchants.
              </p>
            </div>

            {/* 5. How We Use Collected Information */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                5. How We Use Your Information
              </h2>
              <p>The information we collect is strictly used to:</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>Ensure seamless site operation, uptime, and responsive layout performance.</li>
                <li>Analyze reader interest in specific fashion categories, styles, and curated guides.</li>
                <li>Respond promptly to reader inquiries, feedback, and editorial collaboration requests.</li>
                <li>Detect and mitigate technical errors, bot spam, and security vulnerabilities.</li>
              </ul>
              <p>
                We do not sell, lease, or distribute your personal data or contact details to third-party advertisers or data brokers under any circumstances.
              </p>
            </div>

            {/* 6. Data Security & Storage */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                6. Data Security &amp; Retention
              </h2>
              <p>
                We implement industry-standard technical measures (including SSL/HTTPS encryption) to protect data transmitted through our site. However, no data transmission across the internet is 100% immune from security risks. We retain minimal log data only for as long as necessary to maintain operational security and analytics auditing.
              </p>
            </div>

            {/* 7. Children's Privacy */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                7. Children&rsquo;s Online Privacy
              </h2>
              <p>
                Own Fashion is intended for general audiences aged 13 and older. We do not knowingly collect personal identifiable information from children under 13. If you believe a minor has submitted personal details through our contact forms, please reach out to us and we will promptly remove the records.
              </p>
            </div>

            {/* 8. Contact & Policy Updates */}
            <div className="space-y-4 border-t border-primary/10 pt-8">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                8. Contact &amp; Updates
              </h2>
              <p>
                We reserve the right to revise or modify this Privacy Policy as our editorial operations or applicable legal requirements evolve. Changes will be posted directly to this page with an updated revision date.
              </p>
              <p>
                If you have questions regarding this policy or our data practices, please visit our{" "}
                <Link href="/contact" className="text-secondary underline hover:text-primary transition-colors">
                  Contact Page
                </Link>{" "}
                to get in touch with our editorial team.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
