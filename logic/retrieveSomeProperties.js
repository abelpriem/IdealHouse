import { Property, Price, Category } from '../data/index.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function retrieveSomeProperties() {
    try {
        const [houses, departments] = await Promise.all([
            Property.findAll({
                limit: 3,
                where: {
                    categoryId: 1
                },
                include: [
                    {model: Price, as: 'price'},
                    {model: Category, as: 'category'}
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            }),
            Property.findAll({
                limit: 3,
                where: {
                    categoryId: 2
                },
                include: [
                    {model: Price, as: 'price'},
                    {model: Category, as: 'category'}
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        ])

        if(!houses || !departments) {
            throw new NotFoundError('Aun no hay propiedades creadas. Añada una nueva')
        }

        return { houses: houses, departments: departments }

    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}