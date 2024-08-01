import { Property, Category, Price } from '../data/index.js'
import { isSeller } from '../utils/index.js'

export default async (req, res) => {

    const { propertyId } = req.params

    const property = await Property.findByPk(propertyId, {
        include: [
            { model: Price, as: 'price' },
            { model: Category, as: 'category' }
        ]
    })

    if (!property || !property.publicate) {
        return res.redirect('/404')
    }

    res.render('properties/show', {
        page: 'Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        property,
        page: property.title,
        user: req.user,
        isSeller: isSeller(req.user?.id, property.userId)
    })
}