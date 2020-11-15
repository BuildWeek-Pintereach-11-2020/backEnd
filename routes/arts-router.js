const router = require('express').Router()
const Arts = require('../models/arts-model.js')


router.get('/', (req, res) => {
    res.send("restricted endpoint in router working!")
})

//to save an article, matched to a specific user
//endpoint /api/arts/:id => user id
router.post('/:id', (req, res) => {
    const addArt = {...req.body, users_id: req.params.id}
    Arts.add(addArt)
    .then(art => {
        res.status(201).json({ data: art })
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})


router.get('/:id', (req, res) => {
    const {id} = req.params
    Arts.findById(id)
    .then(arts => {
        res.status(200).json({ data: arts })
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})


module.exports = router