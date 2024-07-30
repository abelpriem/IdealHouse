import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

async function registerEmail(data) {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const { name, email, token } = data

      await transport.sendMail({
        from: 'IdealHouse.dev',
        to: email,
        subject: 'IdealHouse - Confirmación de cuenta',
        text: 'Bienvenido a IdealHouse! Por favor, confirme su email de cuenta para entrar en la aplicación',
        html: `
            <p>Hola ${name}, comprueba tu cuenta de IdealHouse.dev<p>

            <p>Tu cuenta está ya casi lista! Solo necesitas confirmar en el siguiente enlace:
            <a href="${process.env.URL_BACKEND}:${process.env.PORT_SERVER}/auth/confirm-account/${token}">Check account</a></p>

            <p>Si no eres el creador de esta cuenta, puede ignorar este mensaje</p>
        `
      })
}

async function resetPassword(data) {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const { name, email, token } = data

    await transport.sendMail({
      from: 'IdealHouse.dev',
      to: email,
      subject: 'IdealHouse - Recuperar tu contraseña',
      text: 'Por favor, revisa tu restauración de contraseña',
      html: `
          <p>Hola ${name}, comprueba tu contraseña de IdealHouse.dev<p>

          <p>Este es un email para restaurar tu contraseña! Solo necesitas confirmar en el siguiente link para establecer una nueva:
          <a href="${process.env.URL_BACKEND}:${process.env.PORT_SERVER}/auth/restore-password/${token}">Restore your password</a></p>

          <p>Si no has solicitado el cambio de contraseña, puedes ignorar este mensaje</p>
      `
    })
}

const mails = {
  registerEmail,
  resetPassword
}

export default mails