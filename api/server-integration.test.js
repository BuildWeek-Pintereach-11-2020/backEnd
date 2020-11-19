const db = require('../data/dbConfig.js')
const request = require('supertest')
const server = require('./server.js')


describe('test restricted arts-router', () => {

    const registerUser = {
        email: 'me@me.com',
        password: '123'
    }
    const loginUser = {
        email: 'me@me.com',
        password: '123'
    }
    let token;
    beforeEach(async ()=> {
        await db('users').truncate()
        request(server)
        .post('/api/auth/register')
        .send(registerUser)
        .then(res => {
            console.log("register response -->", res.body)
        })
    })
    beforeEach((done) => {
        request(server)
        .post('/api/auth/login')
        .send(loginUser)
        .then((res) => {
            token = res.body.token
            console.log("the response you're looking for -->", token)
            done();
        });
    });
    afterEach(async () => {
        await db('users').truncate()
    })
    beforeEach(async ()=> {
        await db('arts').truncate()
    })

   describe('private route [GET]', () => {
       it ('returns 404', () => {
           return request(server).get('/api/arts/1').set('Authorization', token)
           .expect(404)   
       })
       it ('add art, should return 200', async () => {
           await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
           return request(server).get('/api/arts/1').set('Authorization', token)
           .expect(200)   
        })

   })
 

   describe('private route [POST]', () => {
    it ('add art, returns 201', () => {
        return request(server).post('/api/arts/1').send({ art_name: "test", art_url: "test", rating: 5, category: "news" }).set('Authorization', token)
        .expect(201)     
    })
    })


})




