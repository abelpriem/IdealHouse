import { User } from '../data/models.js'
import validator from 'validator'
import errors from '../utils/errors.js'
import generateId from '../utils/generateId.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function restoreAccount(email) {
    const validateFormatEmail = validator.isEmail(email) 
    const validateEmptyEmail = !validator.isEmpty(email)

    try {
        if (!validateEmptyEmail) {
            throw new ContentError('Formato de email incorrecto. Vuelva a intentarlo')
        }else if (!validateFormatEmail) {
            throw new ContentError('Formato email inválido. Inténtelo de nuevo')
        }

        const user = await User.findOne({ where: { email }})

        if (!user) {
            throw new NotFoundError('Token incorrecto o inválido. Compruebe sus credentiales')
        }

        user.token = generateId()
        await user.save()

        return user
         
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}