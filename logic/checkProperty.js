import { Property } from '../data/models.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError, AuthorizationError } = errors

export default async function checkProperty(propertyId, userId) {
    try {
        const property = await Property.findByPk(propertyId)

        if (!property) {
            throw new NotFoundError('Propiedad no encontrada. Vuelva a intentarlo')
        }

        if (property.publicate) {
            throw new ContentError('Propiedad ya publicada. Inténtelo de nuevo')
        }

        if (property.userId.toString() !== userId) {
            throw new AuthorizationError('Acceso denegado: no es el autor de la propiedad')
        }

        return { property: property, confirmed: true }
    } catch(error) {
        if(error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}