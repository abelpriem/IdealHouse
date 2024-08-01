import errors from '../utils/errors.js'
import validator from 'validator'
import { Message } from '../data/models.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function sendMessage(message, propertyId, userId) {
    const validateMessage = !validator.isEmpty(message)

    try {
        if (!validateMessage || message.length < 10) {
            throw new ContentError('El mensaje no puede ir vacío o es muy corto. Inténtelo de nuevo')
        } 

        const result = await Message.create({ message: message, propertyId, userId })

        return result

    } catch(error) {   
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}