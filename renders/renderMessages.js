import checkOwnProperty from '../logic/checkOwnProperty.js'
import { formatDate } from '../utils/index.js'
import errors from '../utils/errors.js'
const { NotFoundError, AuthorizationError, ContentError } = errors

export default async (req, res) => {
    const { propertyId } = req.params
    const { id: userId } = req.user

    try {
        const property = await checkOwnProperty(propertyId, userId)

        res.render('properties/messages', {
            page: 'Mensajes',
            barra: true,
            csrfToken: req.csrfToken(),
            messages: property.messages,
            formatDate
        })
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

        return res.redirect('/home')
    }
}