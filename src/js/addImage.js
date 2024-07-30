import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imágenes aquí',       // Message
    acceptedFiles: '.png,.jpg,.jpeg,.webp,',            // Default extenesion
    maxFilesize: 5,                                     // Max size
    maxFiles: 1,                                        // Max files
    parallelUploads: 1,                                 // Uploads
    autoProcessQueue: false,                            // Wait until upload
    addRemoveLinks: true,                               // Remove link
    dictRemoveFile: 'Borrar archivo',                   // Remove message
    directMaxFilesExceeded: 'El limite es 1 archivo',   // Message
    headers: {                                          // Reading token
        'CSRF-Token': token
    },
    paramName: 'image',                                 // Multer's file to upload
    init: function() {                                  // Button to submit 
        const dropzone = this
        const btnPublish = document.querySelector("#publish")

        btnPublish.addEventListener('click', function() {
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function() {
            if (dropzone.getActiveFiles().length == 0) {
                window.location.href = '/home' 
            }
        })
    }
}