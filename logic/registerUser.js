import { User } from '../data/models.js'
import errors from '../utils/errors.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import generateId from '../utils/generateId.js'
const { SystemError, ContentError, CredentialsError, DuplicityError } = errors

export default async function registerUser(name, email, password, repeat_password) {
    const validateName = !validator.isEmpty(name)
    const validateEmail = validator.isEmail(email)
    const validatePassword = !validator.isEmpty(password)
    const validateRepeatPassword = !validator.isEmpty(repeat_password)

    try {
        if (!validateName || !validatePassword || !validateRepeatPassword) {
            throw new ContentError('Algunos campos están vacíos... Inténtelo de nuevo')
        } else if (!validateEmail) {
            throw new ContentError('Formato email inválido. Inténtelo de nuevo')
        }

        if (password !== repeat_password) {
            throw new CredentialsError('La contraseña ha de ser la misma. Inténtelo de nuevo')
        } else if (password.length < 6 || repeat_password.length < 6) {
            throw new ContentError('La contraseña debe tener, al menos, 6 caracteres')
        }

        const hash = await bcrypt.hash(password, 5)
        const user = await User.create({ name: name, email: email, password: hash, token: generateId()})

        return user
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new DuplicityError('El usuario ya ha sido registrado')
        }

        if (error instanceof ContentError || error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}