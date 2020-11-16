const db = require('../data/dbConfig.js')

module.exports = {
    add,
    remove, 
    update,
    findBy,
    findById,
   
}

async function add(newUser) {
    const [id] = await db('users').insert(newUser, "id")
    return findById(id)
}

function findById(id) {
    return db('users').where({id}).first()
}

function findBy(email) {
    return db('users').where({email}).orderBy('email')
}

async function remove(id) {
    const deletedUser = await db('users').where({id}).delete()
    return deletedUser
}

async function update(id, changes) {
    await db('users').where({id}).update(changes)
    return db('users').where({id}).first()
}