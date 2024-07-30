import errors from '../utils/errors.js'
import checkProperty from '../logic/checkProperty.js'
const { NotFoundError, ContentError, AuthorizationError } = errors

export default async (req, res) => {
    const { propertyId } = req.params 
    const userId = req.user.id.toString()

    try {
        const result = await checkProperty(propertyId, userId)
        const { property } = result  

        if (result && result.confirmed) {
            res.status(200).render('properties/add-image', {
                page: `Añadir imagen`,
                barra: true,
                csrfToken: req.csrfToken(),
                property
            })
        } else {
            throw new Error('Unexpected response from checkProperty')
        }
    } catch(error) {
        let status = 500

        if (error instanceof AuthorizationError) {
            status = 401
        }

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).redirect('/home')
    }
}