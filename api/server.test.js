const server = require('./server.js')
const request = require('supertest')

describe('GET', () => {
    it ('has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it ('has process.env.DB_ENV not to be "development', () => {
        expect(process.env.DB_ENV).not.toBe('development')
    })

    it ('returns 200 OK', () => {
        return request(server).get('/')
        .expect(200)
        .expect('Content-Type', /text/)
        .expect('Content-Length', '20')
        // .expect('Content-Type', /json/)

    })

    
})
