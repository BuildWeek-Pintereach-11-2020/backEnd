const db = require('../data/dbConfig.js')

module.exports = {
    add,
    remove, 
    update,
    findBy,
    findById,
   
}

async function add(newUser) {
    const [id] = await db('arts').insert(newUser, "id")
    return findById(id)
}

function findById(id) {
    return db('arts').where({'users_id': id})
}

function findBy(email) {
    return db('arts').where({email}).orderBy('email')
}

async function remove(id) {
    const deletedUser = await db('arts').where({id}).delete()
    return deletedUser
}

async function update(id, changes) {
    await db('arts').where({id}).update(changes)
    return db('arts').where({id}).first()
}