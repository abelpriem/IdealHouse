import { Property, Message, User } from '../data/models.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError, AuthorizationError } = errors

export default async function checkOwnProperty(propertyId, userId) {
    try {
        const property = await Property.findByPk(propertyId, {
            include: [
                { model: Message, as: 'messages',
                    include: [
                        { model: User.scope('deletePassword'), as: 'user' }
                    ]
                }
            ]
        })

        if (!property) {
            throw new NotFoundError('Propiedad no encontrada. Vuelva a intentarlo')
        }

        if (property.userId.toString() !== userId.toString()) {
            throw new AuthorizationError('Acceso denegado: no es el autor de la propiedad')
        }

        return property
    } catch(error) {
        if(error instanceof NotFoundError || error instanceof ContentError || error instanceof AuthorizationError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}