const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
const { BIconReception1 } = require('bootstrap-vue');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pandemic', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  name: String,
  count: Number,
  color: String,
  tag: String,
  supplyCubes: Number,
  plagueCubes: Number,
  supplyCenter: Boolean,
  special: String,
  position: Array,
  population: Number,
  kind: String,
  path: String,
});

const charSchema = new mongoose.Schema({
  name: String,
  exposure: Number,
  color: String,
  abilities: Array,
  hand: Array,
  origin: String,
  image: String,
  player: String,
  location: String,
})

const cardSchema = new mongoose.Schema({
  type: String,
  name: String,
  count: Number,
  path: String,
  special: String,
  color: String,
})

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Character = mongoose.model('Character', charSchema);
const Card = mongoose.model('Card', cardSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    color: req.body.color,
    tag: req.body.tag,
    supplyCubes: req.body.supplyCubes,
    plagueCubes: req.body.plagueCubes,
    supplyCenter: req.body.supplyCenter,
    special: req.body.special,
    position: req.body.position,
    kind: req.body.kind,
    population: req.body.population,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/characters', async (req, res) => {
  const character = new Character({
    name: req.body.name,
    exposure: req.body.count,
    color: req.body.color,
    abilities: req.body.abilities,
    hand: req.body.hand,
    origin: req.body.origin,
    image: req.body.image,
    player: req.body.player,
    location: req.body.location
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/cards', async (req, res) => {
  const card = new Card({
    type: req.body.type,
    name: req.body.name,
    count: req.body.count,
    path: req.body.path,
    special: req.body.special,
    color: req.body.color,
  });
  try {
    await card.save();
    res.send(card);
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

app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/cards', async (req, res) => {
  try {
    let cards = await Card.find();
    res.send(cards);
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

app.delete('/api/characters/:id', async(req, res) => {
  try {
    await Character.deleteOne({_id: req.params.id});
    res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/cards/:id', async(req, res) => {
  try {
    await Card.deleteOne({_id: req.params.id});
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
    item.tag = req.body.tag;
    item.supplyCubes = req.body.supplyCubes;
    item.plagueCubes = req.body.plagueCubes;
    item.supplyCenter = req.body.supplyCenter;
    item.special = req.body.special;
    item.position = req.body.position;
    item.population = req.body.population;
    item.path = req.body.path;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/characters/:id', async(req, res) => {
  try {
    let character = await Character.findOne({_id: req.params.id});
    character.name = req.body.name;
    character.exposure = req.body.exposure;
    character.color = req.body.color;
    character.abilities = req.body.population;
    character.hand = req.body.hand;
    character.image = req.body.image,
    character.player = req.body.player,
    character.location = req.body.location,
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/cards/:id', async(req, res) => {
  try {
    let card = await Card.findOne({_id: req.params.id});
    card.type = req.body.type;
    card.name = req.body.name;
    card.count = req.body.count;
    card.path = req.body.path;
    card.special = req.body.special;
    card.color = req.body.color;
    await card.save();
    res.send(card);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
