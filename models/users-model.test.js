const db = require('../data/dbConfig.js')
const Users = require('./users-model.js')


describe('users-model', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    
    describe('add, adds a user', () => {
        it ('make sure db is empty first', async () => {
            const usersDb = await db('users')
            expect(usersDb).toHaveLength(0)
        })
        it ('adds a user, then length should be 1', async () => {
            await Users.add({ email: "me@me.com", password: "123" })
            const usersDb = await db('users')
            expect(usersDb).toHaveLength(1)
        })
    })

    describe('findById, finds user by primary key', () => {
        it ('add a user then find that user by id', async () => {
            await db('users').insert({ email: "me@me.com", password: "123" })
            const userObject = await Users.findById(1)
            expect(userObject).toMatchObject({ id: 1, email: "me@me.com", password: "123"})
        })
    })

    describe('findById, finds user by primary key', () => {
        it ('add a user then find that user by id', async () => {
            await db('users').insert({ email: "me@me.com", password: "123" })
            const userObject = await Users.findById(1)
            expect(userObject.email).toBe("me@me.com")
        })
    })

    describe('findBy(email)', () => {
        it ('add user, then find by email', async () => {
            await db('users').insert({ email: "me@me.com", password: "123"})
            const userObject = await Users.findBy("me@me.com")
            expect(userObject[0]).toMatchObject({ id: 1, email: "me@me.com", password: "123"})
        })
    })

    describe('remove', () => {
        it ('add a user, then remove and check length of db is 0', async () => {
            await db('users').insert({ email: "me@me.com", password: "123"})
            await Users.remove(1)
            const usersDb = await db('users')
            expect(usersDb).toHaveLength(0)
        })
    })

    describe('update', () => {
        it ('add a user, change password, check if password is changed', async () => {
            await db('users').insert({ email: "me@me.com", password: "123"})
           await Users.update(1, { password: "321" })
           const userObject = await db('users').where({'id': 1}).first()
        //    console.log("userOBJ", userObject)
        expect(userObject).toMatchObject({ id: 1, email: "me@me.com", password: "321"})
        })
    })

})