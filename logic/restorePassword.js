import { User } from '../data/models.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError, CredentialsError } = errors

export default async function restorePassword(token, newPassword, repeatNewPassword) {
    const validateToken = validator.isAlphanumeric(token)
    const validateEmptyNewPassword = !validator.isEmpty(newPassword)

    try {
        if (!validateToken) {
            throw new ContentError('Formato de token inválido. Inténtelo otra vez')
        } else if (!validateEmptyNewPassword) {
            throw new ContentError('El campo de la nueva contraseña está vacío. Por favor, vuelva a intentarlo')
        } else if (newPassword.length < 6 || repeatNewPassword.length < 6) {
            throw new ContentError('La contraseña ha de tener, al menos, 6 caracteres')
        }

        const user = await User.findOne({ where: { token }})

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, inténtelo otra vez')
        }

        if (newPassword !== repeatNewPassword) {
            throw new CredentialsError('La nueva contraseña y la repetición son diferentes... Inténtelo otra vez')
        } else {
            const hash = await bcrypt.hash(newPassword, 5)
    
            user.password = hash
            user.token = null
            await user.save()

            return { confirmed: true }
        }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}