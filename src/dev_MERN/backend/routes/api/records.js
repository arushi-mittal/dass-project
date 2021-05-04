const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Record = require('../../models/Records');


// Related to records
// @GET ALL RECORDS
// api: /
router.get('/', auth, (req, res) => {
    const _id = req.user.id

    const filter = { _id: _id, role: 'admin' }
    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { admin_email: user.email, status: 'record' }
            Record.find(recordFilter)
                .then(record => res.json(record))
        });
})

// adding a record
// @POST A RECORD
// api: /add
router.post('/add', auth, (req, res) => {
    const _id = req.user.id

    const filter = { _id: _id, role: 'admin' }
    User.findOne(filter)
        .select('email')
        .then(user => {

            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const newRecord = new Record({ ...req.body, admin_email: user.email });
            newRecord.save()
                .then(record => {
                    res.status(200).json(record);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        });
})


// Related to violations
// @GET all violations
// api: /violations
router.get('/violations', auth, (req, res) => {
    const _id = req.user.id

    const filter = { _id: _id, role: 'admin' }
    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { admin_email: user.email, status: 'violation' }
            Record.find(recordFilter)
                .then(record => res.json(record))
        });
})

// @PUT - convert a record to a violation 
// api: /markViolation
router.put('/markViolation', auth, (req, res) => {
    // console.log(req)
    const _id = req.user.id;
    const filter = { _id, role: 'admin' }

    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { _id: req.body.id, status: { $in: ["record", "bookmarked"] } }
            const change = { status: 'violation' }
            Record.findOneAndUpdate(recordFilter, change, { new: true })
                .then(
                    updatedRecord => {
                        if (!updatedRecord) return res.status(400).json({ msg: 'Can not mark as Violation.' })
                        res.json({ updatedRecord })
                    })
        });
})

// Related to bookmarked records
// @GET All bookmarked records
// api: /bookmarked
router.get('/bookmarked', auth, (req, res) => {
    const _id = req.user.id

    const filter = { _id: _id, role: 'admin' }
    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { admin_email: user.email, status: 'bookmarked' }
            Record.find(recordFilter)
                .then(record => res.json(record))
        });
})

// @PUT - convert a record to a bookmarked record (save for later) 
// api: /bookmark
router.put('/bookmark', auth, (req, res) => {
    const _id = req.user.id;
    const filter = { _id, role: 'admin' }

    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { _id: req.body.id, status: 'record' }
            const change = { status: 'bookmarked' }
            Record.findOneAndUpdate(recordFilter, change, { new: true })
                .then(updatedRecord => {
                    if (!updatedRecord) return res.status(400).json({ msg: 'Can not Bookmark the record' })
                    res.json({ updatedRecord })
                })
                .catch(err => console.log(err))
        });
})


// Related to deleted records 
// @GET - all the deleted records 
// api: /deleted
router.get('/deleted', auth, (req, res) => {
    // console.log("inside records api", req.user)
    const _id = req.user.id

    const filter = { _id: _id, role: 'admin' }
    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { admin_email: user.email, status: 'deleted' }
            Record.find(recordFilter)
                .then(record => res.json(record))
        });
})

// @PUT - delete a selected record  
// api: /delete
router.put('/delete', auth, (req, res) => {
    const _id = req.user.id;
    const filter = { _id, role: 'admin' }

    User.findOne(filter)
        .select('email')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Not registered as Admin' })
            const recordFilter = { _id: req.body.id, status: { $in: ["record", "bookmarked"] } }
            const change = { status: 'deleted' }
            Record.findOneAndUpdate(recordFilter, change, { new: true })
                .then(
                    updatedRecord => {
                        if (!updatedRecord) return res.status(400).json({ msg: 'Can not delete the record' })
                        res.json({ updatedRecord })
                    }
                )
        });
})


module.exports = router;