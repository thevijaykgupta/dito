import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, suggestion } = await request.json();

  // Configure your SMTP transporter (use environment variables in production)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SUGGESTION_EMAIL_USER,
      pass: process.env.SUGGESTION_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SUGGESTION_EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'thevijaykgupta@gmail.com',
    subject: 'New Suggestion from Tuffly',
    text: `Name: ${name}\nEmail: ${email}\nSuggestion: ${suggestion}`,
  });

  return NextResponse.json({ success: true });
} 
