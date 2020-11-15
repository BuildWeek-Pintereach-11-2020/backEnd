const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../models/users-model.js')
const { isValid } = require('./isValid.js')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secret.js')

router.post('/register', (req, res) => {
    const credentials = req.body
  
    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const hash = bcrypt.hashSync(credentials.password, rounds)
        credentials.password = hash
        
        //save user to database
        Users.add(credentials)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            // res.status(500).json({ message: 'issue with your email or password'})
            res.status(500).json({ message: err.message })
        })

    } else {
        res.status(400).json({ message: 'please provide an email and password'})
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if(isValid(req.body)){
        console.log('jwtSecret', jwtSecret)
        Users.findBy( email )
        //returns an array with user object inside
        //must destructor the user array
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = makeToken(user)
                res.status(200).json({ message: 'Welcome to our API', token })
            } else {
                res.status(401).json({ message: 'invalide email or password' })
            }
        })
        .catch(err => {
            // res.status(500).json({ message: 'issue with your email or password'})
            res.status(500).json({ message: err.message })
        })

    } else {
        res.status(400).json({ message: 'please provide an email and password'})
    }
})


function makeToken(user) {
    const payload = {
        subject: user.id,
        email: user.email 
    }
    const options = {
        expiresIn: '1 hour',
    }
    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router