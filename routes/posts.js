const express = require('express')
const router = express.Router() 
const mongodb = require('mongodb')

router.get('/' , async (req ,res)=> {
    const posts = await loadposts() ;
    res.send(await posts.find({}).toArray())

})

router.post('/' , async (req ,res)=> {
    const posts = await loadposts()
await posts.insertOne({
    text: req.body.text ,
    CreatedAt: new Date
})
res.send() 
})

router.delete('/:id' , async (req ,res)=>{
    const posts = await loadposts()
 await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id) })
 res.send()
})
 


async function loadposts() {
    const client = await mongodb.MongoClient.connect(
      'mongodb://localhost:27017/',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('vue_express').collection('posts');
  }


module.exports= router