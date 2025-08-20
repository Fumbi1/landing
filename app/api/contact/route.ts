import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z, ZodError } from 'zod';

// Initialize Resend
const resend = new Resend("re_QEUe5oaG_KqEjvTQzEuZcQV523YewRaF1");

// Validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().optional(),
  schoolName: z.string().min(2, 'School name must be at least 2 characters'),
  additionalInfo: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Digital Solutions <noreply@waldorf-solutions.com>',
      to: ['info@waldorf-solutions.com'], // Replace with your actual email
      subject: `New Contact Request from ${validatedData.schoolName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px; text-align: center;">
              New Contact Request 📚
            </h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 4px solid #06b6d4;">
            <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Full Name:</strong>
              <span style="color: #64748b; margin-left: 10px;">${validatedData.fullName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Email:</strong>
              <span style="color: #64748b; margin-left: 10px;">${validatedData.email}</span>
            </div>
            
            ${validatedData.phoneNumber ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Phone:</strong>
              <span style="color: #64748b; margin-left: 10px;">${validatedData.phoneNumber}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">School Name:</strong>
              <span style="color: #64748b; margin-left: 10px;">${validatedData.schoolName}</span>
            </div>
            
            ${validatedData.additionalInfo ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Additional Information:</strong>
              <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0; line-height: 1.6;">${validatedData.additionalInfo}</p>
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="text-center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              This message was sent from the Waldorf Schools Digital Solutions contact form.
            </p>
            <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Also send a confirmation email to the user
    await resend.emails.send({
      from: 'Digital Solutions <noreply@waldorf-solutions.com>',
      to: [validatedData.email],
      subject: 'Thank you for your interest - Digital Solutions for Waldorf Schools',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px; text-align: center;">
              Thank You! 🌟
            </h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px;">
            <h2 style="color: #1e293b; margin-top: 0;">Dear ${validatedData.fullName},</h2>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in Digital Solutions for Waldorf Schools! We have received your inquiry regarding <strong>${validatedData.schoolName}</strong>.
            </p>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
              Our team will review your request and get back to you within 24 hours. We're excited to help your school embrace digital solutions that align with Waldorf pedagogy.
            </p>
            
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4; margin: 20px 0;">
              <h3 style="color: #0c4a6e; margin-top: 0; font-size: 16px;">What happens next?</h3>
              <ul style="color: #64748b; margin: 10px 0; padding-left: 20px;">
                <li>Our education technology specialist will review your needs</li>
                <li>We'll prepare a customized solution proposal</li>
                <li>Schedule a demo tailored to your school's requirements</li>
                <li>Provide implementation timeline and support details</li>
              </ul>
            </div>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to explore our website or contact us directly if you have any urgent questions.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://waldorf-solutions.com" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #64748b; line-height: 1.6;">
              Best regards,<br>
              <strong>The Digital Solutions Team</strong><br>
              <span style="color: #94a3b8;">Transforming Waldorf Education with Technology</span>
            </p>
          </div>
          
          <div style="text-center; margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              <strong>Contact Us:</strong><br>
              📧 info@waldorf-solutions.com<br>
              📞 +49 30 123 456<br>
              🌍 Berlin, Germany
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}