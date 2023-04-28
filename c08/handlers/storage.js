const fs = require('fs');

//upload
//download

// 0 0 0 0 0      0       0       0
//         ...   2^2     2^1     2^0

// 1 byte = 8 bit
// 1kb = 1024 byte 2^10 
// 1mb = 1024 kb
// 1gb = 1024 mb
// 1tb = 1024 gb

const MAX_SIZE = 1048576; //1024 * 1024 = 1MB;
const ALLOWED_FILETYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/pjpeg',
    'image/gif'
];

const upload = async (req, res) => {
    //install express-fileupload
    //req.files from request and watch out on naming the key
    // check the file size
    // check if the file type is allowed
    // write file into directory
    // close the request by moving the file in some directory that we use as storage
    console.log(req.files);
    //<input name='document' type='file' => The name field is our key for the req.files.[key];
    if(MAX_SIZE < req.files.document.size)
};

const download = async (req, res) => {};

module.exports = {
    upload,
    download
};