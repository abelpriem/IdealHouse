import retrieveCategoriesInfo from '../logic/retrieveCategoriesInfo.js'
import errors from '../utils/errors.js'
const { NotFoundError, ContentError} = errors

export default async (req, res) => {
    const { categoryId } = req.params

    try {
        const { category, properties } = await retrieveCategoriesInfo(categoryId)

        res.render('category', {
            barra: true,
            page: 'Categorías',
            csrfToken: req.csrfToken(),
            category,
            properties
        })
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404

            return res.redirect('404')
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.contructor.name}, status: ${status}, message: ${error.message}`)
    }
}   