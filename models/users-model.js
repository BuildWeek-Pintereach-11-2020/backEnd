const db = require('../data/dbConfig.js')

module.exports = {
    add,
    del, 
    update,
    findBy,
    findById,
   
}

function add(changes) {
    return db('users').insert(changes)
}

function findById(id) {
    return db('users').where({id}).first()
}

function findBy(email) {
    return db('users').where({email}).orderBy('email')
}

async function del(id) {
    const deletedUser = await db('users').where({id}).first()
    return deletedUser
}