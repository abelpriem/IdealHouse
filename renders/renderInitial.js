import { Property, Price, Category } from '../data/index.js'
import retrieveCategories from '../logic/retrieveCategories.js'
import retrievePrices from '../logic/retrievePrices.js'

export default async (req, res) => {
    try {
        const categories = await retrieveCategories()
        const prices = await retrievePrices()

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
    
        res.render('initial', {
            page: 'Inicio',
            barra: true,
            categories,
            prices,
            houses,
            departments
        })

    } catch(error) {
        console.log(error)
    }
}