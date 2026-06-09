import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Increase Vercel function timeout for SMTP operations
export const maxDuration = 30

interface ContactBody {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

// ─── Validation ─────────────────────────────────────────────
function validate(body: ContactBody): string | null {
  if (!body.name || body.name.trim().length < 2)
    return "Please enter your full name."

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "Please enter a valid email."

  if (!body.message || body.message.trim().length < 10)
    return "Message must be at least 10 characters."

  return null
}

// ─── Email HTML ─────────────────────────────────────────────
function buildNotificationHtml(b: ContactBody) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#1E1E1E">
      <div style="background:#00338D;padding:24px 32px;border-radius:8px 8px 0 0">
        <h2 style="color:#ffffff;margin:0;font-size:20px">New Contact Form Submission</h2>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px">Hayyak &amp; Solutions — hayyaksa.com</p>
      </div>
      <div style="background:#f8f9fb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:600;width:120px;color:#64748b">Name</td><td style="padding:8px 0">${b.name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${b.email}" style="color:#00338D">${b.email}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b">Phone</td><td style="padding:8px 0">${b.phone || "—"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b">Company</td><td style="padding:8px 0">${b.company || "—"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b">Service</td><td style="padding:8px 0">${b.service || "—"}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
        <p style="font-weight:600;color:#64748b;margin:0 0 8px">Message</p>
        <p style="white-space:pre-wrap;margin:0;line-height:1.6">${b.message}</p>
      </div>
    </div>
  `
}

function buildAutoReplyHtml(name: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#1E1E1E">
      <div style="background:#00338D;padding:24px 32px;border-radius:8px 8px 0 0">
        <h2 style="color:#ffffff;margin:0;font-size:20px">Thank you, ${name}!</h2>
      </div>
      <div style="background:#f8f9fb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
        <p style="margin:0 0 16px;line-height:1.6">
          We have received your message and one of our team members will be in touch with you shortly.
        </p>
        <p style="margin:0 0 16px;line-height:1.6">
          In the meantime, feel free to reach us directly:
        </p>
        <ul style="margin:0 0 24px;padding-left:20px;line-height:1.8">
          <li>Email: <a href="mailto:info@hayyaksa.com" style="color:#00338D">info@hayyaksa.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/966511047242" style="color:#00338D">+966 51 104 7242</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/company/hayyak-solutions" style="color:#00338D">Hayyak &amp; Solutions</a></li>
        </ul>
        <p style="margin:0;color:#64748b;font-size:14px">— The Hayyak &amp; Solutions Team</p>
      </div>
    </div>
  `
}

// ─── POST Route ─────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body: ContactBody = await req.json()

    // Validate input
    const validationError = validate(body)
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      )
    }

    // Check env vars
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const toEmail = process.env.CONTACT_TO_EMAIL

    if (!host || !user || !pass || !toEmail) {
      console.error("Missing SMTP environment variables:", {
        host: !!host,
        user: !!user,
        pass: !!pass,
        toEmail: !!toEmail,
      })
      return NextResponse.json(
        { success: false, error: "Server configuration error. Please email us directly at info@hayyaksa.com" },
        { status: 500 }
      )
    }

    // Create transporter — no verify() call (causes Vercel timeout)
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

    // Send both emails — notification to you + auto-reply to user
    await Promise.all([
      transporter.sendMail({
        from: `"Hayyak & Solutions Website" <${user}>`,
        to: toEmail,
        replyTo: body.email,
        subject: `New enquiry from ${body.name}`,
        html: buildNotificationHtml(body),
      }),
      transporter.sendMail({
        from: `"Hayyak & Solutions" <${user}>`,
        to: body.email,
        subject: "We received your message — Hayyak & Solutions",
        html: buildAutoReplyHtml(body.name),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Contact API Error:", message)

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send your message right now. Please try again or email us directly at info@hayyaksa.com",
      },
      { status: 500 }
    )
  }
}
