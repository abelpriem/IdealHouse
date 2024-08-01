import changePropertySate from '../logic/changePropertyState.js'
import errors from '../utils/errors.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const { propertyId } = req.params
    const { id: userId } = req.user

    try {
        await changePropertySate(propertyId, userId.toString())

        res.json({ result: true})
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)
    }
}