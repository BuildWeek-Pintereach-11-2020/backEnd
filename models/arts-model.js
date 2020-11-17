const db = require('../data/dbConfig.js')

module.exports = {
    add,
    remove, 
    update,
    findUserBy,
    findById,
    findByCategory,
    findByArtId,
   
}

// add article, returns that article in array
async function add(newArt) {
    const [id] = await db('arts').insert(newArt, "id")
    return findByArtId(id) 
}

// find by id of article, returns array so I can validate length
function findByArtId(artId) {
    return db('arts').where({'id': artId})
}

// find by foriegn key users_id
function findById(id) {  
        return db('arts').select('id', 'art_name', 'art_url', 'rating', 'category')
        .where({'users_id': id}).orderBy('rating', 'desc')
}

function findByCategory(id, cat) {
    return db('arts').select('id', 'art_name', 'art_url', 'rating', 'category')
    .where({'users_id': id, 'category': cat}).orderBy('rating', 'desc')
}

//trying this out for Users
function findUserBy(id) {
    return Boolean(db('users').where({'id': id}))
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