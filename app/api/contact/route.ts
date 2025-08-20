import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[v0] RESEND_API_KEY environment variable is missing")
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY environment variable." },
        { status: 500 },
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL
    if (!contactEmail) {
      console.error("[v0] CONTACT_EMAIL environment variable is missing")
      return NextResponse.json(
        { error: "Email service not configured. Please add CONTACT_EMAIL environment variable." },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)
    const body = await request.json()

    const { name, email, message } = body

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
