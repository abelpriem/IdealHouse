import categories from './categories.js'
import prices from './prices.js'
import users from './users.js'
import { Category, Price, User } from '../data/index.js'
import db from '../data/db.js'

const importData = async () => {
    try {

        await db.authenticate()
        await db.sync({ force: true })

        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users)
        ])

        console.log('Data successfully imported!')

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await db.authenticate()
        await db.sync({ force: true })

        // Elimina todos los registros de las tablas en el orden correcto
        await Promise.all([
            Category.destroy({ where: {} }),
            Price.destroy({ where: {} })
        ])

        console.log('Data successfully deleted!')

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    deleteData()
} else if (process.argv[2] === '-i') {
    importData()
}