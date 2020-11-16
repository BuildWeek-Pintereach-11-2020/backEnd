const db = require('../data/dbConfig.js')

module.exports = {
    add,
    remove, 
    update,
    findBy,
    findById,
    findByCategory,
   
}

async function add(newUser) {
    const [id] = await db('arts').insert(newUser, "id")
    return findById(id)
}

function findById(id) {
    return db('arts').select('id', 'art_name', 'art_url', 'rating', 'category')
    .where({'users_id': id}).orderBy('rating', 'desc')
}

function findByCategory(id, cat) {
    return db('arts').select('id', 'art_name', 'art_url', 'rating', 'category')
    .where({'users_id': id, 'category': cat}).orderBy('rating', 'desc')
}

//not using this one right now
function findBy(email) {
    return db('arts').where({email}).orderBy('email')
}

async function remove(id) {
    const deletedArt = await db('arts').select('id', 'art_name', 'art_url', 'rating', 'category').where({id})
    await db('arts').where({id}).delete() 
    return deletedArt
}

async function update(id, changes) {
    await db('arts').where({id}).update(changes)
    return db('arts').select('id', 'art_name', 'art_url', 'rating', 'category')
    .where({id}).first()
}