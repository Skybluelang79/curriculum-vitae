require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const MAIL_CONFIGURED = Boolean(EMAIL_USER && EMAIL_PASS);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));

app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  if (!MAIL_CONFIGURED) {
    return res.status(503).json({
      success: false,
      message: 'Contact form is not configured. Please email directly.'
    });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
    html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Or access at http://127.0.0.1:${PORT}`);
  if (!MAIL_CONFIGURED) {
    console.warn('WARNING: EMAIL_USER / EMAIL_PASS are not set. The contact form will fail.');
    console.warn('Copy .env.example to .env and fill in a Gmail address + Google App Password.');
  }
});

module.exports = app;