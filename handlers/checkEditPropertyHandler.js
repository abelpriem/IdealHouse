import errors from '../utils/errors.js'
import { Category, Price } from '../data/index.js'
import checkEditProperty from '../logic/checkEditProperty.js'
const { NotFoundError, AuthorizationError } = errors

export default async (req, res) => {
    const { propertyId } = req.params 
    const userId = req.user.id.toString()

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    try {
        const result = await checkEditProperty(propertyId, userId)
        const { property } = result

        if (result && result.confirmed) {
            res.status(200).render('properties/edit', {
                page: `Editar propiedad`,
                barra: true,
                csrfToken: req.csrfToken(),
                categories,
                prices,
                data: property
            })
        } else {
            throw new Error('Unexpected response from checkProperty')
        }
    } catch(error) {
        let status = 500

        if (error instanceof AuthorizationError) {
            status = 401
        }

        if (error instanceof NotFoundError) {
            status = 404
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).redirect('/home')
    }
}