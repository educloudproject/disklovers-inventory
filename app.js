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
  try {
      db = client.db(dbName);
      collection = db.collection('movies');
      console.log('Connected successfully to database server');
  } catch (error) {
      console.log('Error: Could not connect to database server');
  }
});

app.get('/movies', async (req, res) => {
    let result;
    let statusCode = 200;
    try {
        result = await collection.find({}).toArray();
        //console.debug(result)
    } catch (error) {
        result = getErrorObject('Error fetching Movie List');
        statusCode = 500;
        console.log('An error occurred while fetching the list of movies', error);
    }
    return res.status(statusCode).json(result)
});

app.get('/movies/:id', async (req, res) => {
    let result;
    let statusCode = 200;
    try {
        result = await collection.findOne({'_id': ObjectID(req.params.id)});
        //console.debug(result)
        if (!result) {
            result = {};
            statusCode = 404;
        }
      } catch (error) {
        result = getErrorObject('Error fetching Movie');
        statusCode = 500;
        console.log('An error occurred while fetching the movie', error);
      };
    return res.status(statusCode).json(result);
});

app.post('/movies', async(req, res) => {
    let resultMessage = 'Saved Movie';
    let statusCode = 201;
    try {
        await collection.insertOne(req.body);
    } catch (error) {
        resultMessage = 'Error saving Movie';
        statusCode = 500;
        console.log('An error occurred while saving the movie', error);
    }
  return res.status(statusCode).send(resultMessage);
});

app.delete('/movies/:id', async (req, res) => {
    let resultMessage = 'Deleted Movie';
    let statusCode = 200;
    try {
        let result = await collection.deleteOne({'_id': ObjectID(req.params.id)})
        //console.debug(result);
        if (result.deletedCount === 0) {
            resultMessage = 'Movie Not Found';
            statusCode = 404;
        }
    } catch (error) {
        resultMessage = 'Error deleting Movie';
        statusCode = 500;
        console.log('An error occurred while deleting the movie', error);
    }
    return res.status(statusCode).send(resultMessage);
});

app.listen(port, () => {
  console.log(`DiskLovers Inventory app listening at http://localhost:${port}`)
});

function getErrorObject(message) {
    return {error: message};
}
