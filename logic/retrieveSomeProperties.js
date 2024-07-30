import { Property, Price, Category } from '../data/index.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function retrieveSomeProperties() {
    try {
        const someProperties = await Property.findAll({
            limit: 3,
            where: {
                categoryId: 1
            },
            include: [
                {model: Price, as: 'price'},
                {model: Category, as: 'category'}
            ],
            order: ['createdAt', 'DESC']
        })

        if(!someProperties) {
            throw new NotFoundError('Aun no hay propiedades creadas. Añada una nueva')
        }

        return someProperties

    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}