const db = require('../data/dbConfig.js')
const request = require('supertest')
const server = require('./server.js')


describe('test restricted endpoints', () => {

    const registerUser = {
        email: 'me@me.com',
        password: '123'
    }
    const loginUser = {
        email: 'me@me.com',
        password: '123'
    }
    let token;
    beforeAll(async ()=> {
        await db('users').truncate()
        request(server)
        .post('/api/auth/register')
        .send(registerUser)
        .then(res => {
            console.log("register response -->", res.body)
        })
    })
    beforeAll((done) => {
        request(server)
        .post('/api/auth/login')
        .send(loginUser)
        .then((res) => {
            token = res.body.token
            console.log("the response you're looking for -->", token)
            done();
        });
    });
    afterAll(async () => {
        await db('users').truncate()
    })
    beforeAll(async ()=> {
        await db('arts').truncate()
    })

    it ('returns 404', () => {
        return request(server).get('/api/arts/1').set('Authorization', token)
        .expect(404)
        
    })




})



