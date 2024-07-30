import { Property } from '../data/models.js'
import errors from '../utils/errors.js'
import validator from 'validator'
const { SystemError, NotFoundError, ContentError } = errors
 
export default async function addImage(propertyId, fileName) {
    const validateId = !validator.isEmpty(propertyId)
    const validateName = !validator.isEmpty(fileName) 

    try {
        if (!validateId) {
            throw new ContentError('La ID de la propiedad está vacía. Inténtelo de nuevo')
        } else if (!validateName) {
            throw new ContentError('El nombre del archivo está vacío. Inténtelo de nuevo')
        }

        const property = await Property.findByPk(propertyId)

        if (!property) {
            throw new NotFoundError('La publicación no existe. Por favor, vuelva a intentarlo')
        }

        property.publicate = true
        property.image = fileName

        await property.save()

        return property
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}