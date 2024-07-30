
import errors from '../utils/errors.js'
import mails from '../utils/email.js'
import restoreAccount from '../logic/restoreAccount.js'
const { resetPassword } = mails
const { ContentError, NotFoundError } = errors

export default async (req, res) => {
    const { email } = req.body

    try {
        const user = await restoreAccount(email)
        await resetPassword({
            name: user.name,
            email: email,
            token: user.token
        })

        res.status(200).render('templates/message', {
            page: 'Email de confirmación enviado',
            message: 'Por favor, haga click en el link de su email para restaurar su contraseña'
        })

    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).render('auth/restore-account', {
            page: 'Restaurar cuenta',
            message: 'Ha habido algún error durante el proceso... Por favor, inténtelo de nuevo',
            errors: [error.message],
            csrfToken: req.csrfToken()
        })
    }
}