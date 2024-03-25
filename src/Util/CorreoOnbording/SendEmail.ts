import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); 

async function sendMail(email: string, subject: string, templatePath: string, nombre: string) {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'), 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const template: string = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
  const modifiedTemplate: string = template.replace('<%= fullName %>', nombre);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    html: modifiedTemplate,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Vista previa del correo en Ethereal:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

export default sendMail;