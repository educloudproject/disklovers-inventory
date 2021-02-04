const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const movies = [];



app.get('/movies', function (req, res) {
  res.status(200).json(movies)
})

app.get('/movies/:id', function (req, res) {
  let movie;
  let status = 404;
  for (let index = 0; index < movies.length; index++) {
    if (movies[index].id === parseInt(req.params.id)) {
      movie = movies[index];
      status = 200;
      break;
    }
  }
  return res.status(status).json(movie);
})

app.post('/movies', function (req, res) {
  movies.push(req.body);
  res.status(201).send('Saved Movie\n')
})

app.delete('/movies/:id', function (req, res) {
  let movie;
  let status = 404;
  for (let index = 0; index < movies.length; index++) {
    if (movies[index].id === parseInt(req.params.id)) {
      movie = movies[index];
      movies.splice(index, 1);
      status = 200;
      break;
    }
  }
  return res.status(status).json(movie);
})


app.listen(port, () => {
  console.log(`DiskLovers Inventory app listening at http://localhost:${port}`)
})
