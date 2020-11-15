const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("restricted endpoint in router working!")
})


module.exports = router