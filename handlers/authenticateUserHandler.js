import jwt from 'jsonwebtoken'
import errors from '../utils/errors.js'
import dotenv from 'dotenv'
import authenticateUser from '../logic/authenticateUser.js'
const { NotFoundError, CredentialsError, ContentError } = errors

dotenv.config()

export default async (req, res) => {
    const { email, password } = req.body
 
    try {  
        const { userId, id, name } = await authenticateUser(email, password)
        const token =  jwt.sign({ sub: userId, id: id, name: name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        return res.cookie('_token', token, {
            httpOnly: true
        }).redirect('/home')

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

        res.status(status).render('auth/login', {
            page: 'Login',
            errors: [error.message],
            user: {
                email: email
            },
            csrfToken: req.csrfToken()
        })
    }
}