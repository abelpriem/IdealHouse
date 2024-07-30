import { Category } from '../data/index.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function retrieveCategories() {
    try {
        const categories = await Category.findAll({ raw: true })

        if(!categories) {
            throw new NotFoundError('Aun no hay categorías publicadas. Añada una publicación nueva previamente')
        }

        return categories

    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}