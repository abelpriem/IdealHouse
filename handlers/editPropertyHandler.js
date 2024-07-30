import { Category, Price } from '../data/index.js'
import editProperty from '../logic/editProperty.js'
import errors from '../utils/errors.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const { propertyId } = req.params
    const { title, description, price: priceId, category: categoryId, room, bath, parking, street, lat, lng} = req.body

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    try {
        await editProperty(propertyId, title, description, priceId, categoryId, room, bath, parking, street, lat, lng)
        res.status(200).redirect('/home')
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 401
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).render(`properties/edit`, {
            page: 'Nueva propiedad',
            errors: [error.message],
            csrfToken: req.csrfToken(),
            barra: true,
            categories,
            prices,
            data: { 
                id: propertyId,
                title, 
                description, 
                priceId, 
                categoryId, 
                room, 
                bath, 
                parking, 
                street, 
                lat, 
                lng
            }
        })
    }
}