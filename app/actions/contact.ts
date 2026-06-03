"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const { name, email, phone, company, message } = formData

    const { error } = await resend.emails.send({
      from: "H&S Website <onboarding@resend.dev>",
      to: ["info@hayyaksa.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00338D; border-bottom: 2px solid #4B9FE1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #00338D;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${phone ? `<a href="tel:${phone}" style="color: #00338D;">${phone}</a>` : "Not provided"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Not provided"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #00338D;">Message:</h3>
            <div style="background-color: #f8f9fb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This email was sent from the H&S website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Failed to send email. Please try again." }
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}
