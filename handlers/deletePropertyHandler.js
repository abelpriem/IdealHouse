import deleteProperty from '../logic/deleteProperty.js'
import errors from '../utils/errors.js'
const { NotFoundError, AuthorizationError } = errors

export default async (req, res) => {
    const { propertyId } = req.params
    const userId = req.user.id.toString()

    console.log(userId)

    try {
        await deleteProperty(propertyId, userId)
        res.status(200).redirect('/home')
    } catch(error) {
        let status = 500

        if (error instanceof AuthorizationError) {
            status = 401
        }

        if (error instanceof NotFoundError) {
            status = 404
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)
        
        res.status(status).redirect('/home')
    }
}