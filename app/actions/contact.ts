"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// basic safety: prevents HTML injection
const escape = (str = "") =>
  str.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")

export async function sendContactEmail(formData) {
  try {
    const { name, email, phone, company, message } = formData

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields" }
    }

    const result = await resend.emails.send({
      from: "H&S Website <info@hayyaksa.com>",
      to: ["info@hayyaksa.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><b>Name:</b> ${escape(name)}</p>
        <p><b>Email:</b> ${escape(email)}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Company:</b> ${company || "Not provided"}</p>

        <h3>Message:</h3>
        <p>${escape(message)}</p>
      `,
    })

    if (result.error) {
      return { success: false, error: "Email failed to send" }
    }

    return { success: true }

  } catch (err) {
    return { success: false, error: "Something went wrong" }
  }
}