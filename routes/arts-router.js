const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("endpoint in router working!")
})


module.exports = router