import { User } from '../data/models.js'
import validator from 'validator'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function retrieveUser(userId) {
    const validateId = !validator.isEmpty(userId.toString())

    try{
        if (!validateId) {
            throw new ContentError('Formato de ID inválido. Por favor, inténtelo otra vez')
        }

        const user = await User.findByPk(userId.toString())

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, inténtelo otra vez')
        }

        return user
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}