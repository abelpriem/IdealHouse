import { Property, Price, Category, User, Message } from '../data/models.js'

// Price.hasOne(Property, { foreignKey: 'priceId'})
// Category.hasOne(Property, { foreignKey: 'categoryId'})
// User.hasOne(Property, { foreignKey: 'userId'})

Property.belongsTo(Price, { foreignKey: 'priceId' })
Property.belongsTo(Category, { foreignKey: 'categoryId' })
Property.belongsTo(User, { foreignKey: 'userId' })
Property.hasMany(Message, { foreignKey: 'propertyId' })

Message.belongsTo(Property, { foreignKey: 'propertyId' })
Message.belongsTo(User, { foreignKey: 'userId' })

export {
    Property,
    Price,
    Category,
    User,
    Message
} 