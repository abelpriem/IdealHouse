import { Property, User } from '../data/index.js'
import fs from 'fs/promises'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, AuthorizationError } = errors

export default async function deleteProperty(propertyId, userId) {
    try {
        const user = await User.findByPk(userId)
        const property = await Property.findByPk(propertyId)

        if (!user) {
            throw new NotFoundError('Usuario no encontrada. Inténtelo de nuevo')
        } else if (!property) {
            throw new NotFoundError('Propiedad no encontrada. Inténtelo de nuevo')
        } 

        console.log(property.userId)

        if (property.userId.toString() === userId) {
            const path = `./public/uploads/${property.image}`

            await fs.unlink(path)
            await property.destroy()
        } else {
            throw new AuthorizationError('Acceso denegado: El usuario no es el dueño de la propiedad publicada')
        }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof AuthorizationError) {
            throw error
        } 

        throw new SystemError(error.message)
    }
}