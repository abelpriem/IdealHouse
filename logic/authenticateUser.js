import { User } from '../data/models.js'
import errors from '../utils/errors.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import generateId from '../utils/generateId.js'
const { SystemError, NotFoundError, CredentialsError, ContentError } = errors

export default async function authenticateUser(email, password) {
    const validateEmail = validator.isEmail(email)
    const validatePassword = !validator.isEmpty(password)

    try {
        if (!validateEmail) {
            throw new ContentError('Email vacío o inválido. Inténtelo de nuevo')
        } else if (!validatePassword) {
            throw new ContentError('Campo de contraseña vacío. Inténtelo otra vez')
        }

        const user = await User.findOne({ where: { email }})

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, inténtelo otra vez')
        }

        if (!user.confirm) {
            throw new CredentialsError('Su cuenta aún no ha sido confirmada')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw new CredentialsError('Credentiales incorrectas. Inténtelo de nuevo')
        }

        const userId = generateId()

        return { userId, id: user.id, name: user.name}
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof CredentialsError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}