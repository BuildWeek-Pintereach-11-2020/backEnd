const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const ArtsRouter = require('../routes/arts-router.js')
const AuthRouter = require('../auth/auth-router.js')
const restricted = require('../auth/restricted-middleware.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.use('/api/auth', AuthRouter)
server.use('/api/arts', restricted, ArtsRouter)
// server.use('/api/arts', ArtsRouter)

server.get('/', (req, res) => { 
    res.send("endpoint is working!")
})

module.exports = server