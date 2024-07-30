import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './data/db.js'
import csrf from 'csurf'
import upload from './middleware/addFile.js'
import cookieParser from 'cookie-parser'
import protectRoute from './middleware/protectRoute.js'
import { registerUserHandler, restoreAccountHandler, confirmAccountHandler, restorePasswordHandler, checkTokenHandler, authenticateUserHandler, createNewPropertieHandler, checkPropertyHandler, addImageHandler, checkEditPropertyHandler, editPropertyHandler, deletePropertyHandler } from './handlers/index.js'
import { renderLogin, renderRegister, renderRestoreAccount, renderHome, renderNewProperties, renderProperty } from './renders/index.js'

dotenv.config()

// SERVER
const server = express()

// DB CONNECTION
try {
    await db.authenticate()
    db.sync()
    console.log('Database conected succesfully!')
} catch(error) {
    console.log('ERROR on database conection...')
}

// PARSING DATA JSON
const jsonBodyParser = express.json()

// ENABLING: CORS - PUBLIC - URLENCODE - COOKIEPARSER - CSRF
server.use(cors())
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(csrf({ cookie: true }))

// ENABLING RENDER PUG
server.set('view engine', 'pug')
server.set('views', './views')

// ROUTES

// ROUTE - LOGIN USER
server.get('/auth/login', renderLogin)
server.post('/auth/login', authenticateUserHandler)

// ROUTE - CONFIRM ACCOUNT
server.get('/auth/confirm-account/:token', confirmAccountHandler)

// ROUTE - REGISTER USER
server.get('/auth/register', renderRegister)
server.post('/auth/register', jsonBodyParser, registerUserHandler)

// ROUTE - RESTORE ACCOUNT
server.get('/auth/restore-account', renderRestoreAccount)
server.post('/auth/restore-account', jsonBodyParser, restoreAccountHandler)

// ROUTE - CONFIRM TOKEN & RESTORE PASSWORD
server.get('/auth/restore-password/:token', checkTokenHandler)
server.post('/auth/restore-password/:token', restorePasswordHandler)

// ROUTE - INIT PAGE
server.get('/')

// ROUTE - CATEGORIES
server.get('/categories/:id')

// ROUTE - PAGE 404
server.get('/404')

// ROUTE - SEARCH
server.post('/search')

// ROUTE - HOME
server.get('/home', protectRoute, renderHome)

// ROUTE - CREATE PROPERTIES
server.get('/properties/create', protectRoute, renderNewProperties)
server.post('/properties/create', protectRoute, createNewPropertieHandler)

// ROUTE - ADD IMAGES ON PROPERTIES
server.get('/properties/add-image/:propertyId', protectRoute, checkPropertyHandler)
server.post('/properties/add-image/:propertyId', protectRoute, upload.single('image'), addImageHandler)

// ROUTE - EDIT PROPERTIES
server.get('/properties/edit/:propertyId', protectRoute, checkEditPropertyHandler)
server.post('/properties/edit/:propertyId', protectRoute, editPropertyHandler)

// ROUTE - DELETE PROPERTY
server.post('/properties/delete/:propertyId', protectRoute, deletePropertyHandler)

// ROUTE - PUBLIC VIEW
server.get('/property/:propertyId', renderProperty)

// CONNECTION
server.listen(process.env.PORT_SERVER, () => console.log(`Server online! Listening on port: ${process.env.PORT_SERVER}`))

