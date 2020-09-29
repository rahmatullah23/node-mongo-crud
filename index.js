const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const password = 'tomal420';
const uri = "mongodb+srv://organicUser:tomal420@cluster0.tnjvj.mongodb.net/organicdb?retryWrites=true&w=majority";
                                                            
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("organicdb").collection("products");

  app.get('/products', (req, res) => {
    collection.find({})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

  app.get('/product/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents)=>{
      res.send(documents[0]);
    })
  })

  // const product = {name: 'modhu', price:23, quantity:12};
  // collection.insertOne(product)
  //   .then(result => {
  //    console.log('database connected')
  
  app.post("/addProduct", (req,res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result => {
    console.log('product add successfully')
    res.send('success')
  })
})
  app.delete('/delete/:id', (req,res) => {
    // console.log(req.params.id);
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then (( result) => {
      console.log(result);
    })
  })

});


app.listen(3005);