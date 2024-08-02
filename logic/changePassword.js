import { User } from '../data/models.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError, CredentialsError } = errors

export default async function changePassword(userId, password, newPassword, repeatNewPassword) {
    const validateId = !validator.isEmpty(userId)
    const validatePassword = !validator.isEmpty(password)
    const validateNewPassword = !validator.isEmpty(newPassword)
    const validateRepeatNewPassword = !validator.isEmpty(repeatNewPassword)

    try {
        if (!validateId) {
            throw new ContentError('Error en el formato ID. Vuelva a intentarlo')
        } else if (!validatePassword || !validateNewPassword || !validateRepeatNewPassword) {
            throw new ContentError('No se pueden enviar campos vacíos. Revíselo e inténtelo de nuevo')
        } else if (newPassword.length < 6 || repeatNewPassword < 6) {
            throw new ContentError('Las contraseñas han de tener 6 caracteres como mínimo')
        }

        const user = await User.findByPk(userId)

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Vuelva a intentarlo')
        }

        
        if (newPassword !== repeatNewPassword) {
            throw new CredentialsError('La nueva contraseña y la contraseña repetida han de ser iguales')
        }
        
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw new CredentialsError('Credenciales incorrectas. Inténtelo de nuevo')
        } else {
            const hash = await bcrypt.hash(newPassword, 5)

            user.password = hash
            await user.save()

            return { sucess: true }
        }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}