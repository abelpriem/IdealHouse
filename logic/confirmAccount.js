import { User } from '../data/models.js'
import errors from '../utils/errors.js'
import validator from 'validator'
const { SystemError, NotFoundError, ContentError } = errors

export default async function confirmAccount(token) {
    const validateToken = validator.isAlphanumeric(token)

    try{
        if (!validateToken) {
            throw new ContentError('Formato de token inválido. Por favor, inténtelo otra vez')
        }

        const user = await User.findOne({ where: {token} })

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, inténtelo otra vez')
        }

        user.token = null
        user.confirm = true 

        await user.save()

        return { confirmed: true }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}