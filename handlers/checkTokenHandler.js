import checkToken from '../logic/checkToken.js'
import errors from '../utils/errors.js'
const { TokenError } = errors

export default async (req, res) => {
    const { token } = req.params

    try {
        await checkToken(token)
        
        res.render('auth/restore-password', {
            page: 'Recuperar contraseña',
            csrfToken: req.csrfToken()
        })
    } catch(error) {
        let status = 500

        if (error instanceof TokenError) {
            status = 401
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).render('auth/confirm-account', {
            page: 'Error al confirmar su cuenta',
            message: 'Ha habido algún error al confirmar su cuenta... Por favor, inténtelo de nuevo',
            error: true,
            csrfToken: req.csrfToken()
        })
    }
}