var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');

mongoose.set('strictQuery', false);

// Connection to DB
mongoose.connect('mongodb://localhost/tvshows', function (err, res) {
  if (err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/tvshow')(app, mongoose);

var TVShowCtrl = require('./controllers/tvshows');

var router = express.Router();

app.use(router);
// Main Route
router.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(express.static(path.join(__dirname, 'public')));

// API routes
var tvshows = express.Router();

tvshows
  .route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows
  .route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

tvshows.route('/tvshows/genre/:genre').get(TVShowCtrl.searchByGenre);
tvshows.route('/tvshows/country/:country').get(TVShowCtrl.searchByCountry);

app.use('/api', tvshows);

const PORT = 8000;

// Start PORT
app.listen(8000, function () {
  console.log(`Node server running on http://localhost:${PORT}`);
});
