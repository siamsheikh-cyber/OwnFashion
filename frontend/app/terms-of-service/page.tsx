import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Own Fashion",
  description:
    "Read the terms, conditions, and intellectual property guidelines governing your access and use of the Own Fashion website.",
};

export default function TermsOfServicePage() {
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
                Editorial Guidelines
              </span>
            </div>

            <h1
              className="text-primary text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-4 leading-[1.15]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Terms of Service
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
            {/* 1. Acceptance */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                1. Acceptance of Terms
              </h2>
              <p>
                Welcome to <strong className="text-primary font-semibold">Own Fashion</strong>. By browsing, reading, accessing, or interacting with our digital publication, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, along with our Privacy Policy and Affiliate Disclaimer.
              </p>
              <p>
                If you do not agree to these terms in their entirety, you must refrain from using this website.
              </p>
            </div>

            {/* 2. Intellectual Property & Copyright */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                2. Intellectual Property &amp; Copyright
              </h2>
              <p>
                All original content featured on Own Fashion—including but not limited to written articles, editorial essays, curated outfit compositions, branding, graphics, logos, layouts, and software code—is the property of Own Fashion and is protected by international copyright and intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and view site content for personal, non-commercial use. You may not reproduce, republish, syndicate, alter, sell, or exploit any written or visual material from this website without explicit prior written authorization from our editorial team.
              </p>
            </div>

            {/* 3. Permitted & Prohibited Use */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                3. User Conduct &amp; Prohibited Actions
              </h2>
              <p>When utilizing our website, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>Engage in automated data scraping, crawling, or harvesting without express permission.</li>
                <li>Attempt to compromise site infrastructure, circumvent security barriers, or inject malicious code.</li>
                <li>Misrepresent your identity or submit fraudulent communications via our contact forms.</li>
                <li>Use site assets or editorial materials for unlawful commercial promotion.</li>
              </ul>
            </div>

            {/* 4. Editorial Opinion & Informational Disclaimer */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                4. Editorial Nature of Content
              </h2>
              <p>
                The articles, trend reports, product roundups, and styling guides published on Own Fashion reflect the independent research and editorial perspectives of our writers. All content is provided solely for general informational and inspiration purposes.
              </p>
              <p>
                While we strive for thorough accuracy in our editorial reviews, we make no express warranties regarding the completeness, currentness, or suitability of any styling advice or product recommendation for your individual lifestyle or sizing requirements.
              </p>
            </div>

            {/* 5. External Links & Affiliate Relationships */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                5. External Links &amp; Third-Party Retailers
              </h2>
              <p>
                Own Fashion participates in affiliate marketing programs, notably the <strong className="text-primary font-semibold">Amazon Services LLC Associates Program</strong>. When you click outbound affiliate links and make qualifying purchases on third-party merchant sites, we may earn an affiliate commission.
              </p>
              <p>
                We do not sell products directly, manage inventory, process payments, or fulfill customer orders. Any purchase you make is conducted entirely between you and the respective third-party merchant (e.g., Amazon.com), governed solely by that merchant&rsquo;s terms, return policies, and pricing structures.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Own Fashion, its founders, authors, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>Your access to, use of, or inability to access the website.</li>
                <li>Any discrepancies in product descriptions, pricing, colorways, or stock availability on merchant platforms.</li>
                <li>Transactions, shipping issues, defective goods, or disputes between you and third-party retailers.</li>
              </ul>
            </div>

            {/* 7. Changes to Terms */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                7. Amendments &amp; Revisions
              </h2>
              <p>
                We reserve the discretion to update or revise these Terms of Service at any time. Continued use of Own Fashion following the publication of revised terms constitutes your acceptance of the updated terms.
              </p>
            </div>

            {/* 8. Contact */}
            <div className="space-y-4 border-t border-primary/10 pt-8">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                8. Contact Information
              </h2>
              <p>
                For questions regarding these terms, rights clearances, or editorial inquiries, please visit our{" "}
                <Link href="/contact" className="text-secondary underline hover:text-primary transition-colors">
                  Contact Page
                </Link>{" "}
                or reach out directly to our editorial desk.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
