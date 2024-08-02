import retrieveUser from '../logic/retrieveUser.js'
import changePassword from '../logic/changePassword.js'
import { formatDate } from '../utils/index.js'
import errors from '../utils/errors.js'
const { NotFoundError, ContentError, CredentialsError } = errors

export default async (req, res) => {
    const { userId } = req.params
    const { password, newPassword, repeatNewPassword } = req.body
    
    const user = await retrieveUser(userId)
    try {
        await changePassword(userId, password, newPassword, repeatNewPassword)

        res.render('profile/user', {
            barra: true,
            message: 'La contraseña ha sido cambiada correctamente',
            page: 'Perfil',
            csrfToken: req.csrfToken(),
            user,
            formatDate
        })

    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof CredentialsError) {
            status = 406
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        return res.render('profile/user', {
            barra: true,
            page: 'Perfil',
            errors: [error.message],
            csrfToken: req.csrfToken(),
            user,
            formatDate,
            data: {}
        })
    }
}