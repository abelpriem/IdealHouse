import retrieveCategories from '../logic/retrieveCategories.js'
import retrievePrices from '../logic/retrievePrices.js'
import retrieveSomeProperties from '../logic/retrieveSomeProperties.js'
import errors from '../utils/errors.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const { _token } = req.cookies

    try {
        const categories = await retrieveCategories()
        const prices = await retrievePrices()
        const { houses, departments } = await retrieveSomeProperties()
    
        res.render('initial', {
            page: 'Inicio',
            barra: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            houses,
            departments,
            token: _token
        })

    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        console.log(`ERROR: ${error.contructor.name}, status: ${status}, message: ${error.message}`)
    }
}