import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { SMTP_CONSTANTS } from './constants';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_CONSTANTS.HOST,
      port: parseInt(SMTP_CONSTANTS.PORT, 10),
      auth: {
        user: SMTP_CONSTANTS.USER,
        pass: SMTP_CONSTANTS.PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, url: string, name: string) {
    const mailOptions = {
      from: `"${process.env.APP_NAME || 'NestJS App'}" <${SMTP_CONSTANTS.FROM}>`,
      to,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Hello, ${name || 'there'}!</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <a href="${url}" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">
            Verify Email
          </a>
          <p>If you did not request this email, you can safely ignore it.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send verification email:', error);
      throw error;
    }
  }
}
