import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, recipient } = body

    // Here you would typically integrate with an email sending service
    // like SendGrid, Mailgun, or AWS SES

    // For now, we'll log the data and return a success response
    console.log("Contact form submission:", {
      to: recipient,
      from: email,
      name,
      subject,
      message,
    })

    // In a real implementation, you would add code like:
    // await sendEmail({
    //   to: recipient,
    //   from: email,
    //   subject: `Contact Form: ${subject}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Message:</strong></p>
    //          <p>${message.replace(/\n/g, '<br>')}</p>`
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
