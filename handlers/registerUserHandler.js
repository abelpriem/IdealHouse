import errors from '../utils/errors.js'
import registerUser from '../logic/registerUser.js'
import mails from '../utils/email.js'
const { registerEmail } = mails
const { ContentError, DuplicityError, CredentialsError } = errors

export default async (req, res) => {
    const { name, email, password, repeat_password } = req.body

    try {
        const user = await registerUser(name, email, password, repeat_password)   
        
        await registerEmail({
            name: user.name,
            email: user.email,
            token: user.token
        })

        res.status(200).render('templates/message', {
            page: 'Cuenta creada correctamente',
            message: 'Hemos enviado la confirmación por email. Por favor, haga click en el enlace'
        })

    } catch(error) {
        let status = 500

        if (error instanceof CredentialsError) {
            status = 406
        }

        if (error instanceof ContentError || error instanceof TypeError || error instanceof DuplicityError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}. Status: ${status}, message: ${error.message}`)

        res.status(status).render('auth/register', {
            page: 'Registro',
            errors: [error.message],
            user: {
                name: name,
                email: email,
                password: password,
                repeat_password: repeat_password
            }
        })
    }
}