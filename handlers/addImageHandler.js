import addImage from '../logic/addImage.js'
import errors from '../utils/errors.js'
const { NotFoundError, ContentError } = errors

export default async (req, res, next) => {
    const { propertyId } = req.params
    const file = req.file

    try {
        await addImage(propertyId, file.originalname)
        next()
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        res.status(status).send('Error al subir el archivo')
    }
}