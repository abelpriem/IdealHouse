import retrieveUser from '../logic/retrieveUser.js'
import errors from '../utils/errors.js'
import { formatDate } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const { id: userId } = req.user

    try {
        const user = await retrieveUser(userId)

        res.render('profile/user', {
            barra: true,
            page: 'Perfil',
            csrfToken: req.csrfToken(),
            user,
            formatDate
        })
    } catch(error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        console.log(`ERROR: ${error.constructor.name}, status: ${status}, message: ${error.message}`)

        return res.redirect('/404')
    }
}