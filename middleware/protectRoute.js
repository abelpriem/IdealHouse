import jwt from 'jsonwebtoken'
import errors from '../utils/errors.js'
import { User } from '../data/models.js'
const { TokenError } = errors
const { JsonWebTokenError } = jwt

export default async function protectRoute(req, res, next) {
    const { _token } = req.cookies

    if (!_token) {
        return res.redirect('/auth/login')
    }

    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        const user = await User.scope('deletePassword').findByPk(decoded.id)

        if (!user) {
            return res.clearCookie('_token').redirect('/auth/login')
        }
        
        req.user = user

        return next()
    } catch(error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            throw new TokenError(error.message)
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        return res.clearCookie('_token').redirect('/auth/login')
    }
}