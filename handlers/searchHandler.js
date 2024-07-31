import errors from '../utils/errors.js'
import searchValue from '../logic/searchValue.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const { search } = req.body

    try {
        const properties = await searchValue(search.toString())

        res.render('search', {
            barra: true,
            page: 'Resultados de la búsqueda',
            csrfToken: req.csrfToken(),
            properties
        })
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404

            res.redirect('/404')
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409

            res.redirect('/')
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)
    }
}