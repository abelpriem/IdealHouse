import retrieveProperties from '../logic/retrieveProperties.js'
import errors from '../utils/errors.js'
const { NotFoundError } = errors

export default async (req, res) => {
    try {
        const properties = await retrieveProperties()

        res.json({
            propiedades: properties
        })
    } catch(error) {
        let status = 404

        if (error instanceof NotFoundError) {
            status = 404
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.send('Error')
    }
}