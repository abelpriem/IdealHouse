import errors from '../utils/errors.js'
import validator from 'validator'
import { Price, Property } from '../data/index.js'
import { Sequelize } from 'sequelize'
const { SystemError, NotFoundError, ContentError } = errors

export default async function searchValue(search) {
    try {
        const validateSearch = !validator.isEmpty(search)

        if(!validateSearch || !search.trim()) {
            throw new ContentError('Error en formulario de búsqueda. Vuelva a intentarlo')
        }

        const properties = await Property.findAll({
            where: {
                title: {
                    [Sequelize.Op.like] : '%' + search + '%'
                }
            },
            include: [
                { model: Price, as: 'price'}
            ]
        })

        console.log(properties)

        if (!properties || properties.length === 0) {
            throw new NotFoundError('Propiedades no encontradas. Inténtelo de nuevo')
        }

        return properties
    } catch(error) {
        if(error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}