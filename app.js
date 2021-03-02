const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017';
const dbName = 'disk-lovers-inventory-service';
const client = new MongoClient(url, { useUnifiedTopology: true });
let db;
let collection;

const bodyParser = require('body-parser')
app.use(bodyParser.json())

client.connect(function() {
  console.log('Connected successfully to server');

  db = client.db(dbName);
  collection = db.collection('movies');
});

app.get('/movies', async (req, res) => {
  await collection.find({}).toArray()
    .then((result) => {
      //console.debug(result)
      res.status(200).json(result)
    })
    .catch((error) => {
      console.log('An error occurred while fetching the list of movies', error);
      res.status(500).send('Error Fetching Movies\n')
    });
});

app.get('/movies/:id', async (req, res) => {
  await collection.find({'_id': ObjectID(req.params.id)}).toArray()
      .then((result) => {
        //console.debug(result)
        let movie;
        let status;
        if (result[0]) {
          movie = result[0];
          status = 200;
        } else {
          status = 404;
        }
        return res.status(status).json(movie);
      })
      .catch((error) => {
        console.log('An error occurred while fetching the movie', error);
        res.status(500).send('Error Fetching Movie\n')
      });
})

app.post('/movies', async(req, res) => {
  await collection.insertOne(req.body)
      .then((result) => {
          console.log('Inserted movie into the collection');
          //console.debug(result)
          res.status(201).send('Saved Movie\n')
      })
      .catch((error) => {
        console.log('An error occurred while inserting movie into the collection', error);
        res.status(500).send('Error Saving Movie\n')
      });
})

app.delete('/movies/:id', async (req, res) => {
  await collection.deleteOne({'_id': ObjectID(req.params.id)})
      .then((result) => {
        //console.debug(result)
        console.log('Deleted movie from the collection');
        //console.debug(result)
        res.status(200).send('Deleted Movie\n')
      })
      .catch((error) => {
        console.log('An error occurred while deleting the movie', error);
        res.status(404).send('Error Deleting Movie\n')
      });
})

app.listen(port, () => {
  console.log(`DiskLovers Inventory app listening at http://localhost:${port}`)
})
