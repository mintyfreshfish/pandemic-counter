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
  population: Number,
  supplyCenter: Boolean,
  path: String,
  xcor: Number,
  ycor: Number,
  special: String,
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

const objectiveSchema = new mongoose.Schema({
  objective: String,
  mandatory: Boolean,
})

const actionSchema = new mongoose.Schema({
  title: String,
  action: String,
})

const miscSchema = new mongoose.Schema({
  title: String,
  body: String,
})

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Character = mongoose.model('Character', charSchema);
const Card = mongoose.model('Card', cardSchema);
const Objective = mongoose.model('Objective', objectiveSchema);
const Action = mongoose.model('Action', actionSchema);
const Misc = mongoose.model('Misc', miscSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    color: req.body.color,
    tag: req.body.tag,
    population: req.body.population,
    supplyCenter: req.body.supplyCenter,
    path: req.body.path,
    xcor: req.body.xcor,
    ycor: req.body.ycor,
    special: req.body.special,
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

app.post('/api/objectives', async (req, res) => {
  const objective = new Objective({
    objective: req.body.objective,
    mandatory: req.body.mandatory,
  });
  try {
    await objective.save();
    res.send(objective);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/actions', async (req, res) => {
  const action = new Action({
    title: req.body.title,
    action: req.body.action,
  });
  try {
    await action.save();
    res.send(action);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/misc', async (req, res) => {
  const misc = new Misc({
    title: req.body.title,
    body: req.body.body,
  });
  try {
    await misc.save();
    res.send(misc);
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

app.get('/api/objectives', async (req, res) => {
  try {
    let objectives = await Objective.find();
    res.send(objectives);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/actions', async (req, res) => {
  try {
    let actions = await Action.find();
    res.send(actions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/misc', async (req, res) => {
  try {
    let miscs = await Misc.find();
    res.send(miscs);
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

app.delete('/api/objectives/:id', async(req, res) => {
  try {
    await Objective.deleteOne({_id: req.params.id});
    res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/actions/:id', async(req, res) => {
  try {
    await Action.deleteOne({_id: req.params.id});
    res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.delete('/api/misc/:id', async(req, res) => {
  try {
    await Misc.deleteOne({_id: req.params.id});
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
    item.supplyCenter = req.body.supplyCenter;
    item.special = req.body.special;
    item.population = req.body.population;
    item.path = req.body.path;
    item.xcor = req.body.xcor;
    item.ycor = req.body.ycor;
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
    character.abilities = req.body.abilities;
    character.hand = req.body.hand;
    character.image = req.body.image,
    character.player = req.body.player,
    character.origin = req.body.origin,
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

app.put('/api/objectives/:id', async(req, res) => {
  try {
    let objective = await Objective.findOne({_id: req.params.id});
    objective.objective = req.body.objective;
    objective.mandatory = req.body.mandatory;
    await objective.save();
    res.send(objective);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/actions/:id', async(req, res) => {
  try {
    let action = await Action.findOne({_id: req.params.id});
    action.title = req.body.title;
    action.action = req.body.action;
    await action.save();
    res.send(action);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/misc/:id', async(req, res) => {
  try {
    let misc = await Misc.findOne({_id: req.params.id});
    misc.title = req.body.title;
    misc.body = req.body.body;
    await misc.save();
    res.send(misc);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
