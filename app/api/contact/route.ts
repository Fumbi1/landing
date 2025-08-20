import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)
const contactEmail = process.env.CONTACT_EMAIL || "";

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const body = await request.json()
    const { fullName, email, phoneNumber, schoolName, additionalInfo } = body

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [contactEmail], // my email where you want to receive messages
      subject: `New Contact Form Submission from ${fullName} || "Unknown sender`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber || "Not provided"}</p>
        <p><strong>School:</strong> ${schoolName}</p>
        <p><strong>Role:</strong> ${additionalInfo || "Not provided"}</p>
        
        <hr>
        <p><em>This message was sent from Wardolf contact form.</em></p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    // Success! Return a success response
    return NextResponse.json({
      message: "Email sent successfully",
      id: data?.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 },
    )
  }
}
