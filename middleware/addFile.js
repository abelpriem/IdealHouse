import multer from 'multer'
import path from 'path'
import generateId from '../utils/generateId.js'

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload