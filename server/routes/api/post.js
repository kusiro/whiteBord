const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Post
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})


// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://test1:j1998s1008@ds147354.mlab.com:47354/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;