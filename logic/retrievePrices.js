import { Price } from '../data/index.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function retrievePrices() {
    try {
        const prices = await Price.findAll({ raw: true })

        if(!prices) {
            throw new NotFoundError('Aun no hay precios publicados. Añada una publicación nueva previamente')
        }

        return prices

    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}