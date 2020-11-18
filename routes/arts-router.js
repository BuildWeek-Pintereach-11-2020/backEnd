const router = require('express').Router()
const Arts = require('../models/arts-model.js')



//to save an article, matched to one user
// [POST] endpoint /api/arts/:id   => (user id)
// returns the object of added article
router.post('/:id', (req, res) => {
    const addArt = {...req.body, users_id: req.params.id}

    Arts.add(addArt)
    .then(art => {
        console.log('art!!', art)
        if(art.length > 0){
            res.status(201).json({ message: 'Article added successfully' })
            // res.status(201).json({ data: art })
        } else {
            res.status(400).json({ message: 'Must provide article and user id'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong' })
        res.status(500).json({ message: err.message })
    })
})

//to get an array of all articles saved by one user
// [GET] endpoint /api/arts/:id  => (user id)
// returns an array, ordered by highest rating
router.get('/:id', (req, res) => {
    const {id} = req.params

    Arts.findById(id)
    .then(arts => {
        if(arts.length > 0) {
            res.status(200).json({ data: arts })
        } else {
            res.status(404).json({ message: 'Cannot find any results'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong' })
        // res.status(500).json({ message: err.message })
    })
})

//to get an array of all articles saved by one user, in one category
// [GET] endpoint /api/arts/:id/:category  => (user id, category name)
// returns an array, ordered by highest rating
router.get('/category/:id/:category', (req, res) => {
    const { id, category } = req.params

    Arts.findByCategory(id, category)
    .then(arts => {
        if (arts.length > 0) {
            res.status(200).json({ data: arts })  
        } else {
            res.status(404).json({ message: 'Cannot find any data'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

//to update an article saved by one use
// [PUT] endpoint /api/arts/:id   => (article id)
//returns the object of updated article
router.put('/:id', (req, res) => {
    const {id} = req.params
    const newChange = req.body
    Arts.update(id, newChange)
    .then(updatedArt => {
        res.status(200).json({ data: updatedArt })
    })
    .catch(err =>{
        res.status(500).json({ message: err.message })
    })
})



//to delete an article with the article's id
// [DELETE] endpoint /api/arts/:id   => (article id)
// returns the object of deleted article
router.delete('/:id', (req, res) => {
    const {id} = req.params
    Arts.remove(id)
    .then(([art]) =>{
        res.status(200).json({ data: art })
    })
    .catch(err =>{
        res.status(500).json({ message: err.message })
    })
})


module.exports = router