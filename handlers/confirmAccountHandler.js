import errors from '../utils/errors.js'
import confirmAccount from '../logic/confirmAccount.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const token = req.params.token
    
    try {
        const result = await confirmAccount(token)

        if (result && result.confirmed) {
            res.status(200).render('auth/confirm-account', {
                page: 'Cuenta confirmada',
                message: 'La cuenta ha sido confirmada correctamente',
                error: false,
                csrfToken: req.csrfToken()
            })
        } else {
            throw new Error('Unexpected response from confirmAccount')
        }
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}. Status: ${status}, message: ${error.message}`)

        res.status(status).render('auth/confirm-account', {
            page: 'Error al confirmar su cuenta',
            message: 'Ha habido algún error al confirmar su cuenta... Por favor, inténtelo de nuevo',
            error: true,
            csrfToken: req.csrfToken()
        })
    }
}