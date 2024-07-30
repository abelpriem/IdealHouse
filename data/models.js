import { DataTypes } from 'sequelize'
import db from './db.js'

// MODEL - USERS
const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false // FOR EMPTY FIELD
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
}, {
    tableName: 'users' ,
    scopes: {
        deletePassword: {
            attributes: {
                exclude: ['password', 'token', 'confirm', 'createdAt', 'updatedAt']
            }
        }
    }
})

// MODEL - PROPERTIES
const Property = db.define('property', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bath: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'properties'
})

// MODEL - CATEGORIES
const Category = db.define('category', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'categories'
})

// MODEL - PRICES
const Price = db.define('price', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'prices'
})

export {
    User,
    Property,
    Category,
    Price
}