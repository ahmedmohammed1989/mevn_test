const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add posts

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text:req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
  res.status(200).send();
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://initial_user1:password@notes-mevn-pdaav.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('notes-mevn').collection('posts');
}


module.exports = router;
