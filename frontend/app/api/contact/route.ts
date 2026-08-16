import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,       // ownfashion.official@gmail.com
        pass: process.env.GMAIL_APP_PASS,   // 16-char Gmail App Password
      },
    });

    // Email sent TO the OwnFashion inbox
    await transporter.sendMail({
      from: `"OwnFashion Contact Form" <${process.env.GMAIL_USER}>`,
      to: "ownfashion.official@gmail.com",
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #fbf9f8; border: 1px solid rgba(0,0,0,0.08);">
          <h2 style="font-family: Georgia, serif; font-weight: 400; font-style: italic; font-size: 28px; color: #000; margin: 0 0 24px;">New Contact Message</h2>
          <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.1); margin-bottom: 24px;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-family: 'Hanken Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; width: 130px; vertical-align: top;">Full Name</td>
              <td style="padding: 10px 0; font-family: Georgia, serif; font-size: 16px; color: #000;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-family: 'Hanken Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; font-family: Georgia, serif; font-size: 16px; color: #000;"><a href="mailto:${email}" style="color: #775a19;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-family: 'Hanken Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; vertical-align: top;">Message</td>
              <td style="padding: 14px 0; font-family: Georgia, serif; font-size: 16px; color: #000; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.1); margin-top: 24px; margin-bottom: 20px;" />
          <p style="font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #747878; margin: 0;">
            This message was submitted via the OwnFashion contact form. Reply directly to respond to ${name}.
          </p>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"OwnFashion" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — OwnFashion",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #fbf9f8; border: 1px solid rgba(0,0,0,0.08);">
          <h2 style="font-family: Georgia, serif; font-weight: 400; font-style: italic; font-size: 28px; color: #000; margin: 0 0 8px;">Thank you, ${name}.</h2>
          <p style="font-family: Georgia, serif; font-size: 16px; color: #444; line-height: 1.7; margin: 0 0 24px;">
            We have received your message and will get back to you within <strong style="color: #775a19;">24–48 business hours</strong>.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.1); margin-bottom: 24px;" />
          <p style="font-family: Georgia, serif; font-style: italic; font-size: 14px; color: #747878; margin: 0;">
            OwnFashion Editorial &nbsp;·&nbsp; ownfashion.official@gmail.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact/route] Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
