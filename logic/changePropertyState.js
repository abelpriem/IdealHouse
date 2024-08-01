import validator from 'validator'
import errors from '../utils/errors.js'
import { Property } from '../data/models.js'
const { SystemError, NotFoundError, ContentError, AuthorizationError } = errors

export default async function changePropertyState(propertyId, userId) {
    const validatePropertyId = !validator.isEmpty(propertyId)
    const validateUserId = !validator.isEmpty(userId)

    try {
        if (!validatePropertyId || !validateUserId) {
            throw new ContentError('Error en la ID de la propiedad o el usuario. Vuelva a intentarlo')
        }

        const property = await Property.findByPk(propertyId)

        if (!property) {
            throw new NotFoundError('Propiedad no encontrada. Inténtelo de nuevo')
        }

        if (property.userId.toString() !== userId) {
            throw new AuthorizationError('Acceso denegado: no es el autor de la propiedad')
        }

        property.publicate = !property.publicate
        await property.save()
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof AuthorizationError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}