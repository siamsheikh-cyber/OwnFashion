"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { ImPinterest2 } from "react-icons/im";
import { PiTiktokLogoLight } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";

// ─── Social Links ─────────────────────────────────────────────────────────────
const socialLinks = [
  {
    id: "contact-pinterest",
    icon: ImPinterest2,
    label: "Pinterest",
    href: "https://www.pinterest.com/ownfashion",
    handle: "@ownfashion",
  },
  {
    id: "contact-instagram",
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/ownfashion",
    handle: "@ownfashion",
  },
  {
    id: "contact-facebook",
    icon: CiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/ownfashion",
    handle: "OwnFashion",
  },
  {
    id: "contact-tiktok",
    icon: PiTiktokLogoLight,
    label: "TikTok",
    href: "https://www.tiktok.com/@ownfashion",
    handle: "@ownfashion",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xljrwoej", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const msg =
          data?.errors?.map((err: { message: string }) => err.message).join(", ") ??
          "Something went wrong. Please try again.";
        setError(msg);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("contact-form-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full">

        {/* ══════════════════════════════════════════
            1. HERO HEADER BANNER
        ══════════════════════════════════════════ */}
        <section
          id="contact-hero"
          className="relative w-full overflow-hidden"
          style={{ minHeight: "460px" }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/own-fashion-c-hero.jpg')" }}
          />

          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-primary/70" />

          {/* Subtle grid texture over overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px)",
            }}
          />

          {/* Corner accents */}
          <div aria-hidden="true" className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/15" />
          <div aria-hidden="true" className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/15" />
          <div aria-hidden="true" className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/15" />
          <div aria-hidden="true" className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/15" />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 max-w-3xl mx-auto">
            <span
              className="uppercase tracking-widest text-secondary-container mb-6 block"
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 600,
              }}
            >
              OwnFashion · Contact
            </span>

            <h1
              className="italic text-white leading-tight mb-6"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Get in Touch with Us
            </h1>

            <div aria-hidden="true" className="w-16 border-t border-secondary-container mb-6 mx-auto" />

            <p
              className="text-white/75 leading-relaxed max-w-xl"
              style={{
                fontFamily: "Literata, serif",
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.7,
              }}
            >
              Have questions about our fashion recommendations, style guides, or
              partnerships? Reach out to us below.
            </p>

            <button
              onClick={scrollToForm}
              id="hero-scroll-cta"
              className="mt-10 inline-flex items-center gap-3 border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 px-8 py-3.5 group"
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Send a Message
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. TWO-COLUMN GRID: Connect + Form
        ══════════════════════════════════════════ */}
        <section
          id="contact-form-section"
          className="w-full max-w-[1100px] mx-auto px-5 md:px-10 py-20 md:py-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* ── LEFT: Connect with Us (borderless) ─────── */}
            <div className="flex flex-col gap-8">
              {/* Section Header */}
              <div className="pb-6 border-b border-primary/10">
                <span
                  className="uppercase tracking-widest text-secondary block mb-3"
                  style={{
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    fontWeight: 600,
                  }}
                >
                  Social & Contact
                </span>
                <h2
                  className="text-primary italic"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  Connect with Us
                </h2>
              </div>

              {/* Direct Email */}
              <a
                id="contact-email-link"
                href="mailto:contact@ownfashion.com"
                className="flex items-center gap-5 group"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-primary/15 flex items-center justify-center bg-surface-container-low group-hover:bg-secondary-container group-hover:border-secondary/30 transition-all duration-300">
                  <MdOutlineEmail className="text-[24px] text-on-surface-variant group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <p
                    className="text-on-surface-variant uppercase tracking-widest mb-1"
                    style={{
                      fontFamily: "Hanken Grotesk, sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                    }}
                  >
                    Direct Support
                  </p>
                  <span
                    className="text-primary group-hover:text-secondary transition-colors duration-300"
                    style={{ fontFamily: "Literata, serif", fontSize: "16px", lineHeight: 1.4 }}
                  >
                    contact@ownfashion.com
                  </span>
                </div>
              </a>

              <div className="border-t border-primary/8" />

              {/* Social Links */}
              <div className="flex flex-col gap-5">
                {socialLinks.map(({ id, icon: Icon, label, href, handle }) => (
                  <Link
                    key={id}
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 border border-primary/15 flex items-center justify-center bg-surface-container-low group-hover:bg-secondary-container group-hover:border-secondary/30 transition-all duration-300">
                      <Icon className="text-[24px] text-on-surface-variant group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    <div className="flex-grow">
                      <p
                        className="text-on-surface-variant uppercase tracking-widest mb-1"
                        style={{
                          fontFamily: "Hanken Grotesk, sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </p>
                      <span
                        className="text-primary group-hover:text-secondary transition-colors duration-300"
                        style={{ fontFamily: "Literata, serif", fontSize: "16px", lineHeight: 1.4 }}
                      >
                        {handle}
                      </span>
                    </div>
                    <span className="text-on-surface-variant/35 group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300 text-base">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Bottom note */}
              <p
                className="text-on-surface-variant italic pt-2"
                style={{ fontFamily: "Literata, serif", fontSize: "13px", lineHeight: 1.7 }}
              >
                We typically respond within{" "}
                <span className="text-secondary not-italic font-semibold">
                  24–48 business hours.
                </span>
              </p>
            </div>

            {/* ── RIGHT: Contact Form ─────────────────────── */}
            <div className="flex flex-col gap-0">
              {/* Form Header */}
              <div className="pb-6 border-b border-primary/10 mb-8">
                <span
                  className="uppercase tracking-widest text-secondary block mb-3"
                  style={{
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    fontWeight: 600,
                  }}
                >
                  Message Us
                </span>
                <h2
                  className="text-primary italic"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  Send Us a Message
                </h2>
              </div>

              {submitted ? (
                /* ── Success State ──────────────────────── */
                <div
                  id="contact-success"
                  className="text-center py-14 border border-primary/10 bg-surface px-8"
                >
                  <span
                    className="material-symbols-outlined text-secondary block mb-5"
                    style={{ fontSize: "52px", fontVariationSettings: '"FILL" 0' }}
                  >
                    check_circle
                  </span>
                  <h3
                    className="text-primary italic text-2xl mb-3"
                    style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                  >
                    Message Sent
                  </h3>
                  <p
                    className="text-on-surface-variant text-sm leading-relaxed mb-8 max-w-xs mx-auto"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    Thank you for reaching out. We read every message personally
                    and will get back to you shortly.
                  </p>
                  <button
                    id="send-another-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-colors font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.14em" }}
                  >
                    Send Another Message →
                  </button>
                </div>
              ) : (
                /* ── Form ──────────────────────────────── */
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="uppercase tracking-widest text-on-surface-variant font-semibold"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                      }}
                    >
                      Full Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-surface border border-primary/12 text-sm text-primary placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary hover:border-primary/30 transition-colors duration-200"
                      style={{ fontFamily: "Literata, serif", fontSize: "15px" }}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="uppercase tracking-widest text-on-surface-variant font-semibold"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                      }}
                    >
                      Email Address <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-surface border border-primary/12 text-sm text-primary placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary hover:border-primary/30 transition-colors duration-200"
                      style={{ fontFamily: "Literata, serif", fontSize: "15px" }}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="uppercase tracking-widest text-on-surface-variant font-semibold"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                      }}
                    >
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={7}
                      required
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-surface border border-primary/12 text-sm text-primary placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary hover:border-primary/30 transition-colors duration-200 resize-none"
                      style={{ fontFamily: "Literata, serif", fontSize: "15px" }}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 border border-error/30 bg-error-container px-4 py-3"
                    >
                      <span
                        className="material-symbols-outlined text-error flex-shrink-0 mt-0.5"
                        style={{ fontSize: "18px", fontVariationSettings: '"FILL" 0' }}
                      >
                        error_outline
                      </span>
                      <p
                        className="text-on-error-container"
                        style={{ fontFamily: "Literata, serif", fontSize: "13px", lineHeight: 1.5 }}
                      >
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-1 gap-4 flex-wrap">
                    <p
                      className="text-on-surface-variant italic"
                      style={{ fontFamily: "Literata, serif", fontSize: "12px" }}
                    >
                      * Required fields
                    </p>
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-white hover:bg-secondary disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 px-9 py-3.5 flex items-center gap-2"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="material-symbols-outlined animate-spin"
                            style={{ fontSize: "16px" }}
                          >
                            progress_activity
                          </span>
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
