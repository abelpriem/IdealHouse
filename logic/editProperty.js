import { Property } from '../data/index.js'
import validator from 'validator'
import errors from '../utils/errors.js'
const {SystemError, ContentError, NotFoundError} = errors

export default async function editProperty(propertyId, title, description, priceId, categoryId, room, bath, parking, street, lat, lng) {
    const validateTitle = !validator.isEmpty(title)
    const validateDescription = !validator.isEmpty(description)
    const validateRoom = !validator.isEmpty(room)
    const validateBath = !validator.isEmpty(bath)
    const validateParking = !validator.isEmpty(parking)
    const validateStreet = !validator.isEmpty(street)
    const validateLat = !validator.isEmpty(lat)
    const validateLng = !validator.isEmpty(lng)
    const validatePrice = !validator.isEmpty(priceId)
    const validateCategory = !validator.isEmpty(categoryId)
    
    try {
        if (!validateTitle) {
            throw new ContentError('El campo del título está vacío. Revíselo de nuevo')
        } else if (!validateDescription) {
            throw new ContentError('El campo de la descripción está vacío. Revíselo de nuevo')
        } else if (!validateCategory) {
            throw new ContentError('Debe seleccionar una categoría válida')
        } else if (!validatePrice) {
            throw new ContentError('Debe seleccionar rango de precios')
        } else if (!validateRoom) {
            throw new ContentError('Debe seleccionar un número de habitaciones')
        } else if (!validateBath) {
            throw new ContentError('Debe seleccionar un número de baños')
        } else if (!validateParking) {
            throw new ContentError('Debe seleccionar un número plazas de párking')
        } else if (!validateStreet || !validateLat || !validateLng) {
            throw new ContentError('Por favor, seleccione la ubicación para la obtención de coordenadas')
        }
        
        const property = await Property.findByPk(propertyId)

        if (!property) {
            throw new NotFoundError('Propiedad no encontrada. Inténtelo de nuevo')
        }

        property.set({
            title, 
            description, 
            priceId, 
            categoryId, 
            room, 
            bath, 
            parking, 
            street, 
            lat, 
            lng
        })

        await property.save()
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}