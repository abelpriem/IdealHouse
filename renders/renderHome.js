import { Price, Category, Property, Message, User } from '../data/index.js'

export default async (req, res) => {
    try {
        const { id } = req.user

        const { pagina: actualPage} = req.query
        const expresion = /^[0-9]$/
    
        if (!expresion.test(actualPage)) {
            return res.redirect('/home?pagina=1')
        }    

        const limit = 5
        const offset = ((actualPage * limit) - limit)

        const [properties, total, user] = await Promise.all([
            await Property.findAll({ 
                limit,
                offset,
                where: { userId: id }, 
                include: [
                { model: Category, as: 'category'},
                { model: Price, as: 'price'},
                { model: Message, as: 'messages'}
            ]}),
            Property.count({
                where: { userId: id }
            })
        ])
    
        res.render('page/home', {
            page: 'Mis propiedades',
            barra: true,
            properties,
            total,
            offset,
            limit,
            csrfToken: req.csrfToken(),
            totalPages: Math.ceil(total/limit),
            actualPage
        })
    } catch(error) {
        let status = 500

        console.log(`ERROR: ${error.name}, status: ${status}, message: ${error.message}`)
    }
}