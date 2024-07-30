import createNewPropertie from '../logic/createNewPropertie.js'
import errors from '../utils/errors.js'
import { Category, Price } from '../data/models.js'
const { ContentError } = errors

const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
])

export default async (req, res) => {
    const { id: userId } = req.user
    const { title, description, room, bath, parking, street, lat, lng, price: priceId, category: categoryId} = req.body
    
    try { 
        const propertyId = await createNewPropertie(title, description, room, bath, parking, street, lat, lng, priceId, categoryId, userId)
        res.redirect(`/properties/add-image/${propertyId}`)
    } catch(error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, Status: ${status}, message: ${error.message}`)

        res.status(status).render('properties/create', {
            page: 'Nueva propiedad',
            errors: [error.message],
            csrfToken: req.csrfToken(),
            barra: true,
            categories,
            prices,
            data: req.body
        })
    }
}