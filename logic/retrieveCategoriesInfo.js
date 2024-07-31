import { Category, Property, Price } from '../data/index.js'
import errors from '../utils/errors.js'
import validator from 'validator'
const { SystemError, NotFoundError, ContentError } = errors

export default async function retrieveCategoriesInfo(categoryId) {
    const validateId = !validator.isEmpty(categoryId)

    try {
        if (!validateId) {
            throw new ContentError('El ID de la categoría es inválido o está vacío. Inténtelo de nuevo')
        }

        const category = await Category.findByPk(categoryId)

        if (!category) {
            throw new NotFoundError('Categoría no encontrada. Por favor, vuelva a intentarlo')
        }

        const properties = await Property.findAll({
            where: {
                categoryId: categoryId
            },
            include: [
                {model: Price, as: 'price'}
            ]
        })

        if (!properties) {
            throw new NotFoundError('Propiedad no encontrada. Por favor, vuelva a intentarlo')
        }

        return { category: category, properties: properties}

    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}