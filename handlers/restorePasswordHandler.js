import restorePassword from '../logic/restorePassword.js'
import errors from '../utils/errors.js'
const { ContentError, CredentialsError, NotFoundError } = errors

export default async (req, res) => {
    const { token } = req.params
    const { new_password, repeat_new_password } = req.body

    try {
        const result = await restorePassword(token, new_password, repeat_new_password)

        if (result && result.confirmed) {
            res.status(200).render('auth/confirm-account', {
                page: 'Contraseña restaurada',
                message: 'Su contraseña ha sido restaurada correctamente. Vuelva a iniciar sesión',
                error: false,
                csrfToken: req.csrfToken()
            })
        } else {
            throw new Error('Unexpected response from restorePassword')
        }

    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        } else if (error instanceof CredentialsError) {
            status = 406
        } else if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).render('auth/restore-password', {
            page: 'Restaurar contraseña',
            errors: [error.message],
            csrfToken: req.csrfToken()
        })
    }
}