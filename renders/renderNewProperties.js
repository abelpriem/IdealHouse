import { Category, Price } from '../data/models.js'

export default async (req, res) => {
    
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create', {
        page: 'Nueva propiedad',
        csrfToken: req.csrfToken(),
        barra: true,
        categories,
        prices,
        data: {}
    })
}