const router = require('express').Router()
const postController =  require('../controllers/postController')
const auth = require('../middleware/auth')
const postValidation = require('../middleware/postValidation')
var cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

router.post('/',[auth, postValidation.create], postController.createPost)

router.get('/list',[auth], postController.getPost);

// upload to s3 codes
router.route("/upload")
    .post(auth, cors(), uploadToS3);


function uploadToS3(req, res) {

        var upload = multer({
            storage: multerS3({ 
                s3: s3Config,
                bucket: process.env.S3_BUCKET_NAME,
                metadata: function(req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                contentDisposition: 'inline',
                key: function(req, file, cb) {
                    cb(null, fullPath);
                }
            }),
            fileFilter: function(req, file, callback) {
                callback(null, true)
            }
        }).any();

        upload(req, res, async function  (err) {
                const files = req.files;
                return res.send({ 'responseCode': 200, 'responseMessage': "File uploaded successfully.", result: files });
            })

}




module.exports = router