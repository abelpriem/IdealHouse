import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Root',
        email: 'ideal@house.com',
        confirm: 1,
        password: bcrypt.hashSync('123123123', 10)

    }
]

export default users