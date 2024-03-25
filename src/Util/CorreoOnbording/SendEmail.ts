import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';

async function sendMail(email: string, subject: string, templatePath: string, nombre: string) {
  const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'madonna.lockman@ethereal.email',
      pass: 'e5RgtNScxpJ4pHqQhF'
    }
  });

  const template: string = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
  const modifiedTemplate: string = template
    .replace('<%= fullName %>', nombre)

  const mailOptions = {
    from: 'karedimor@gmail.com',
    to: email,
    subject: subject,
    html: modifiedTemplate,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Vista previa del correo en Ethereal: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

export default sendMail;