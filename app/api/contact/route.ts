import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log("[v0] RESEND_API_KEY is missing from environment variables")
      return NextResponse.json({ error: "Server configuration error: Missing API key" }, { status: 500 })
    }

    console.log("[v0] API key found, initializing Resend")
    const resend = new Resend(apiKey)

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("[v0] CONTACT_EMAIL environment variable is missing")
      return NextResponse.json(
        { error: "Email service not configured. Please add CONTACT_EMAIL environment variable." },
        { status: 500 },
      )
    }

    // Get form data
    const body = await request.json()
    const { name, email, message } = body

    console.log("[v0] Sending email with data:", { name, email, messageLength: message?.length })

    // Send email
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
      console.log("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.log("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
