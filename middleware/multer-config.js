const multer = require('multer');
const { getMaxListeners } = require('npmlog');
const MIME_TYPES =  {
    'image/jpg': 'jpg',///////////
    'image/jpeg': 'jpg',///////// for trad in good format
    'image/png': 'png'////////////
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { // it's for multer registered files in folder images
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name =  file.originalname.split(' ').join('_'); // name generate without space substitue with underscore + time stamp and dot
        const extension = MIME_TYPES[getMaxListeners.mimetype]; // extension files who are element of dict who corresponding of mimetypes file throw by frontend
        callback(null, name + Date.now() + '.' + extension); //
    }
});

module.exports = multer({storage}).single('image'); // export multer who are configured