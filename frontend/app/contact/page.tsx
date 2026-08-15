"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full max-w-[640px] mx-auto px-[20px] md:px-[40px] pt-16 pb-24">

        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="text-secondary uppercase tracking-widest text-xs font-semibold block mb-3"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            Get in Touch
          </span>
          <h1
            className="text-primary italic leading-tight"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 400,
            }}
          >
            Contact Us
          </h1>
          <p
            className="text-on-surface-variant text-base mt-4 leading-relaxed"
            style={{ fontFamily: "Literata, serif" }}
          >
            Have a question, a collaboration idea, or just want to say hello?
            We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div className="text-center py-16">
            <span
              className="material-symbols-outlined text-5xl text-secondary block mb-4"
              style={{ fontVariationSettings: '"FILL" 0' }}
            >
              check_circle
            </span>
            <h2
              className="text-primary italic text-2xl mb-3"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
            >
              Message Sent
            </h2>
            <p
              className="text-on-surface-variant text-sm leading-relaxed"
              style={{ fontFamily: "Literata, serif" }}
            >
              Thank you for reaching out. We'll get back to you shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
              className="mt-8 text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-colors font-semibold"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              Send Another Message →
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-primary/15 text-sm text-primary placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                style={{ fontFamily: "Literata, serif" }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-primary/15 text-sm text-primary placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                style={{ fontFamily: "Literata, serif" }}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-primary/15 text-sm text-primary placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors resize-none"
                style={{ fontFamily: "Literata, serif" }}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-primary text-white hover:bg-secondary transition-colors px-8 py-3 text-xs uppercase tracking-widest font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
