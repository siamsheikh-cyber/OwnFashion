import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Disclaimer & Affiliate Disclosure | Own Fashion",
  description:
    "Review the official Amazon Affiliate disclosure, editorial independence policies, and product pricing accuracy disclaimer for Own Fashion.",
};

export default function DisclaimerPage() {
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
                Editorial Transparency
              </span>
            </div>

            <h1
              className="text-primary text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-4 leading-[1.15]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Affiliate &amp; Content Disclaimer
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
            {/* Highlighted Box: Official Amazon Affiliate Statement */}
            <div className="bg-[#ECE7DC] border border-primary/15 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-secondary font-bold text-base">★</span>
                <h2
                  className="text-primary text-xl sm:text-2xl font-normal"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Amazon Affiliate Disclosure
                </h2>
              </div>
              <p className="text-on-surface-variant font-normal leading-relaxed">
                <strong className="text-primary font-semibold">Own Fashion</strong> is a participant in the <strong className="text-primary font-semibold">Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated international marketplaces.
              </p>
              <p className="text-on-surface-variant text-sm italic">
                As an Amazon Associate, we earn from qualifying purchases at absolutely zero additional cost to you.
              </p>
            </div>

            {/* 1. What Are Affiliate Links */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                1. How Affiliate Links Work
              </h2>
              <p>
                Throughout our website—including article reviews, seasonal capsule guides, product carousels, and lookbook breakdowns—we include links to fashion garments, accessories, footwear, and lifestyle essentials available on Amazon.
              </p>
              <p>
                When you click on these links (such as &ldquo;View on Amazon&rdquo; or related product links) and subsequently complete a purchase, Amazon pays us a small percentage commission. This referral fee is paid directly by the retailer from their operating budget—<strong className="text-primary font-semibold">it does not increase the price you pay in any way</strong>.
              </p>
              <p>
                These affiliate commissions allow us to sustain our independent editorial team, conduct extensive fabric and fit research, and keep our digital publication free and accessible to all readers.
              </p>
            </div>

            {/* 2. Editorial Independence */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                2. Editorial Integrity &amp; Objective Curation
              </h2>
              <p>
                Our editorial integrity is our most valued asset. Products featured on Own Fashion are selected, tested, and curated independently based on quality of construction, authentic customer satisfaction ratings, versatility, and aesthetic value.
              </p>
              <p>
                We do not accept monetary compensation from manufacturers or third-party sellers in exchange for guaranteed positive reviews or algorithmic placement. If an item does not meet our editorial benchmarks for design and longevity, we do not recommend it.
              </p>
            </div>

            {/* 3. Pricing, Ratings & Availability Disclaimer */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                3. Pricing, Ratings &amp; Inventory Accuracy
              </h2>
              <p>
                Product pricing, star ratings, customer review tallies, promotional discounts, and inventory availability displayed across our site are accurate at the time of editorial curation and review.
              </p>
              <p>
                However, third-party merchants and Amazon adjust prices, stock levels, and promotions dynamically in real-time. Therefore:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
                <li>Estimated upper-bound prices (e.g. &ldquo;$160 Under&rdquo;) reflect historical pricing at the time of writing.</li>
                <li>The final, binding price and current stock availability will always be displayed on Amazon upon redirection.</li>
                <li>We cannot guarantee that any specific item will remain in stock or maintain a specific price point after publication.</li>
              </ul>
            </div>

            {/* 4. Merchant Transactions & Customer Service */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                4. Orders, Fulfillment &amp; Merchant Responsibility
              </h2>
              <p>
                Own Fashion is an editorial and curation magazine; we are not a retail storefront, manufacturer, or shipping warehouse. We do not process financial transactions, store billing information, or fulfill physical merchandise.
              </p>
              <p>
                For questions regarding order status, shipping times, returns, exchanges, sizing adjustments, or product warranties, please contact <strong className="text-primary font-semibold">Amazon Customer Support</strong> or the specific third-party seller directly through your Amazon account.
              </p>
            </div>

            {/* 5. General Fashion & Styling Advice */}
            <div className="space-y-4">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                5. General Styling &amp; Fashion Advice
              </h2>
              <p>
                All fashion styling advice, sizing tips, and wardrobe composition suggestions are provided as general inspiration. Because fit, personal comfort, and garment drape vary across body types, we encourage readers to consult brand size charts and verified purchaser fit feedback before finalizing orders.
              </p>
            </div>

            {/* 6. Contact */}
            <div className="space-y-4 border-t border-primary/10 pt-8">
              <h2
                className="text-primary text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                6. Questions &amp; Inquiries
              </h2>
              <p>
                If you have questions regarding our affiliate relationships, editorial guidelines, or wish to report a broken product link, please reach out via our{" "}
                <Link href="/contact" className="text-secondary underline hover:text-primary transition-colors">
                  Contact Page
                </Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
