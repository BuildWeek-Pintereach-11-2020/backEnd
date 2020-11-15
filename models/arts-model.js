const db = require('../data/dbConfig.js')

module.exports = {
    add,
    remove, 
    update,
    findBy,
    findById,
   
}

async function add(newUser) {
    const [id] = await db('news').insert(newUser, "id")
    return findById(id)
}

function findById(id) {
    return db('news').where({id}).first()
}

function findBy(email) {
    return db('news').where({email}).orderBy('email')
}

async function remove(id) {
    const deletedUser = await db('news').where({id}).delete()
    return deletedUser
}

async function update(id, changes) {
    await db('news').where({id}).update(changes)
    return db('news').where({id}).first()
}