import sendMessage from '../logic/sendMessage.js'
import errors from '../utils/errors.js'
import { isSeller } from '../utils/index.js'
import { Property, Price, Category } from '../data/index.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const { message } = req.body
    const { propertyId } = req.params
    const { id: userId } = req.user
    
    const property = await Property.findByPk(propertyId, {
        include: [
            { model: Price, as: 'price' },
            { model: Category, as: 'category' }
        ]
    })

    try {
        await sendMessage(message, propertyId, userId)

        return res.render('properties/show', {
            page: 'Propiedad',
            barra: true,
            csrfToken: req.csrfToken(),
            property,
            page: property.title,
            user: req.user,
            isSeller: isSeller(req.user?.id, property.userId),
            send: true
        })
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        } 

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}}`)

        return res.render('properties/show', {
            page: 'Propiedad',
            barra: true,
            errors: [error.message],
            csrfToken: req.csrfToken(),
            property,
            page: property.title,
            user: req.user,
            isSeller: isSeller(req.user?.id, property.userId)
        })
    }
}