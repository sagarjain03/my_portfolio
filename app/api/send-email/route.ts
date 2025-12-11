import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { senderEmail, message } = await req.json();

        if (!senderEmail || !message) {
            return NextResponse.json(
                { error: 'Email and message are required' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: senderEmail,
            to: 'thesagarjain8@gmail.com',
            subject: `New Message from Portfolio: ${senderEmail}`,
            text: `You have received a new message from your portfolio contact form.\n\nFrom: ${senderEmail}\n\nMessage:\n${message}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3b82f6;">New Message from Portfolio</h2>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
                    <p style="margin-bottom: 10px;"><strong>From:</strong> ${senderEmail}</p>
                    <p style="margin-bottom: 20px;"><strong>Message:</strong></p>
                    <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
