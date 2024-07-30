import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.URL_MYSQL_IDEALHOUSE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    port: process.env.PORT_MYSQL, 
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,             // Max connections
        min: 0,             // Min connections
        acquire: 30000,     // Max ms until error
        idle: 10000         // Min ms to finish
    },
    logging: false
})

export default db

