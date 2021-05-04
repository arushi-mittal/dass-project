const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require("../../models/User");
const UserVideo = require("../../models/UserVideo")

const auth = require("../../middleware/auth");

var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        console.log(ext)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage, limits:{fileSize: 100000000}, }).single("file")


//=================================
//             User
//=================================


router.post('/', auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post('/uploadInfo', auth, (req, res) => {
    console.log(req.body)
    const { fileName, filePath, userEmail, description } = req.body
    newUserVideo = new UserVideo({fileName, filePath, userEmail, description})
    newUserVideo.save()
        .then( videoInfo => {
            console.log(videoInfo)
            res.json({videoInfo})
        })
        .catch( err => {
            res.status(404).json(`${err}`)
        } )
})

router.post('/getVideos', auth, (req, res) => {
    const { email } = req.body
    const condition = {
        userEmail: email
    }
    console.log(condition)
    UserVideo.find(condition)
        .then(response => {
            res.json({response})
        })
        .catch(err => {
            res.status(404).json(`${err}`)
        })
})

router.post('/deleteVideo', auth, (req, res) => {
    const { _id } = req.body
    const condition = {
        _id: _id
    }
    UserVideo.deleteOne(condition)
        .then(response => {
            res.json({response})
        })
        .catch(err => {
            res.status(404).json(`${err}`)
        })
})



module.exports = router;
