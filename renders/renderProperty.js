import { Property, Category, Price } from '../data/index.js'

export default async (req, res) => {

    const { propertyId } = req.params
    const property = await Property.findByPk(propertyId, {
        include: [
            { model: Price, as: 'price' },
            { model: Category, as: 'category' }
        ]
    })

    res.render('properties/show', {
        page: 'Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        property,
        page: property.title
    })
}