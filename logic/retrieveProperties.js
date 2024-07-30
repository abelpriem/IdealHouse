import { Property, Price, Category } from '../data/index.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function retrieveProperties() {
    try {
        const porperties = await Property.findAll({
            include: [
                {model: Price, as: 'price'},
                {model: Category, as: 'category'}
            ]
        })

        if(!porperties) {
            throw new NotFoundError('Aun no hay propiedades creadas. Añada una nueva')
        }

        return porperties

    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}