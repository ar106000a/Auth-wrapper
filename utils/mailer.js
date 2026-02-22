import { google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer/index.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // Must match your Google Cloud redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export const sendEmail = async ({ to, subject, html }) => {
  // 1. Compose the email using Nodemailer's helper (it's great for formatting)
  const mail = new MailComposer({
    from: `Auth wrapper manifested you this <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    textEncoding: 'base64',
  });

  // 2. Build and encode the message for the Gmail API
  const message = await mail.compile().build();
  const rawMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // 3. Send via HTTPS (Port 443 - Never blocked by Railway!)
  return await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: rawMessage },
  });
};