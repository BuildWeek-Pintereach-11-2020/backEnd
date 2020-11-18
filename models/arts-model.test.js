const db = require('../data/dbConfig.js')
const Arts = require('./arts-model.js')


describe('arts model', () => {
    beforeEach(async () => {
        await db('arts').truncate()
    })

    describe('add art', () => {
        it ('arts db starts empty', async () => {
            let artNum
            artNum = await db('arts')
            expect(artNum).toHaveLength(0)
        })
        it ('inserts an art, should have length 1', async () => {
            const artNew = await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            expect(artNew).toHaveLength(1)
        })
        it ('inserts an art, now test the model', async () => {
            const artNew = await Arts.add({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            expect(artNew).toHaveLength(1)
        })
    })

    describe('remove art', () => {
        it ('adds an art then removes art, should have length 0', async () => {
            const [id] = await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            // console.log('this is id', id)
            await db('arts').where({id: 1}).delete()
            artNum = await db('arts')
            expect(artNum).toHaveLength(0)
        })
        it ('adds an art then removes art, now test the model', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            await Arts.remove(1)
            artNum = await db('arts')
            expect(artNum).toHaveLength(0)
        })
    })

    //this test destructures the array then tests the object
    describe('findeByArtId', () => {
        it('add an art and should return that art', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            const returnedArt = await Arts.findByArtId(1)
            console.log(returnedArt)
            expect(returnedArt[0]).toMatchObject({ id: 1, art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            
        })
    })

    //this test leaves array as is, then compares that array to the object inside [ ]
    describe('findeByArtId', () => {
        it('add an art and should return that art', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            const returnedArt = await Arts.findByArtId(1)
            console.log(returnedArt)
            expect(returnedArt).toEqual(expect.arrayContaining([{ id: 1, art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 }]))
            
        })
    })


    describe('findById, pass in a user id that matches users_id in arts table', () => {
        it('add 2 arts and should return length 2', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            await db('arts').insert({ art_name: "more", art_url: "more", rating: 5, category: "music", users_id: 1 })
            const returnedArts = await Arts.findById(1)
            expect(returnedArts).toHaveLength(2)
        })
    })

    describe('findByCategory, return the arts that match users_id in that category', () => {
        it('add 2 arts in music and 1 art in news, expect to return length 2', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            await db('arts').insert({ art_name: "more", art_url: "more", rating: 4, category: "music", users_id: 1 })
            await db('arts').insert({ art_name: "again", art_url: "again", rating: 3, category: "music", users_id: 1 })
            const returnedArts = await Arts.findByCategory(1, "music")
            expect(returnedArts).toHaveLength(2)
        })
    })

    describe('findByCategory, return the arts ordered by rating', () => {
        it('add 2 arts in music and 1 art in news, expect to return highest rating in cat first (4)', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            await db('arts').insert({ art_name: "more", art_url: "more", rating: 4, category: "music", users_id: 1 })
            await db('arts').insert({ art_name: "again", art_url: "again", rating: 3, category: "music", users_id: 1 })
            const returnedArts = await Arts.findByCategory(1, "music")
            expect(returnedArts[0].rating).toBe(4)
        })
    })

    describe('update, add an art then update the art_name', () => {
        it('add an art, find it, update the name, then test the art_name has changed', async () => {
            await db('arts').insert({ art_name: "test", art_url: "test", rating: 5, category: "news", users_id: 1 })
            const updatedArt = await Arts.update(1, {art_name: "yes"})
            expect(updatedArt.art_name).toBe("yes")
        })
    })
})