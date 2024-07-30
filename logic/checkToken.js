import { User } from '../data/models.js'
import errors from '../utils/errors.js'
const { SystemError, TokenError } = errors

export default async function checkToken(token) {
    try {
        const user = await User.findOne({ where: { token }})

        if (!user) {
            throw new TokenError('Token incorrecto o inválido. Compruebe sus credentiales')
        }

        return user
    } catch(error) {
        if (error instanceof TokenError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}