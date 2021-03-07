const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pandemic', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  name: String,
  count: Number,
  color: String,
  special: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    color: req.body.color,
    special: req.body.special
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async(req, res) => {
  try {
    await Item.deleteOne({_id: req.params.id});
    res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/items/:id', async(req, res) => {
  try {
    let item = await Item.findOne({_id: req.params.id});
    item.name = req.body.name;
    item.count = req.body.count;
    item.color = req.body.color;
    item.special = req.body.special;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


app.listen(3000, () => console.log('Server listening on port 3000!'));
