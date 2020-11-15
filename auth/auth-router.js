const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../models/users-model.js')

router.post('/register', (req, res) => {
    const credentials = req.body
  
    if(credentials){
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const hash = bcrypt.hashSync(credentials.password, rounds)
        credentials.password = hash
        
        //save user to database
        Users.add(credentials)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            // res.status(500).json({ message: 'issue encountered with your email or password'})
            res.status(500).json({ message: err.message })
        })

    } else {
        res.status(400).json({ message: 'please provide an email and password'})
    }
})

module.exports = router