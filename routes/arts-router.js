const router = require('express').Router()
const Arts = require('../models/arts-model.js')


router.get('/', (req, res) => {
    res.send("restricted endpoint in router working!")
})

router.post('/', (req, res) => {
    Arts.add(req.body)
    .then(art => {
        res.status(201).json({ data: art })
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

module.exports = router