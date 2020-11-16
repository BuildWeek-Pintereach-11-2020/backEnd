const router = require('express').Router()
const Arts = require('../models/arts-model.js')


router.get('/', (req, res) => {
    res.send("restricted endpoint in router working!")
})

//to save an article, matched to a specific user
// [POST] endpoint /api/arts/:id => user id
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

//to get an array of all articles saved by a particular user
// [GET] endpoint /api/arts/:id => user id
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

//to delete an article with the article's id
// [DELETE] endpoint /api/arts/:id => article id
// returns the deleted article
router.delete('/:id', (req, res) => {
    const {id} = req.params
    Arts.remove(id)
    .then(art =>{
        res.status(200).json({ data: art })
    })
    .catch(err =>{
        res.status(500).json({ message: err.message })
    })
})


module.exports = router