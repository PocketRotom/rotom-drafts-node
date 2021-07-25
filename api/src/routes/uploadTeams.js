const express = require("express");
const router = express.Router({mergeParams: true});
const multer = require('multer');


let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '../../../public/images/teams');
    },
    filename: function (req, file, callback) {
        let filename = req.body.id + ".png";
        callback(null, filename);
    }
});


let upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        callback(null, true);
    },
    limits: {
        "fieldSize": 10485760
    }
});

router.post('/', async function (request, response) {
    const result = await new Promise(function (resolve) {
        try {
            upload.any()(request, response, function(err) {
                if(err) {
                    console.log(err);
                    resolve(undefined);
                    return;
                }
                let data = [];
                for (let i = 0; i < request.files.length; i++) {
                    data[i] = {
                        'filename': request.body.id + ".png",
                    };
                }
                resolve(data);
            });
        } catch (error) {
            console.log(error);
            resolve(undefined);
        }
    });
    if (!result) {
        response.status(500).json({'success': false, 'message': 'Something is wrong', 'data': []});
        return;
    }
    response.status(200).json({'success': true, 'message': 'Successfully', 'data': result});
});



module.exports = router;