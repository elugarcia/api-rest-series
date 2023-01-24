//File: controllers/tvshows.js
var mongoose = require('mongoose');
var TVShow = mongoose.model('TVShow');

//GET - Return all tvshows in the DB
exports.findAllTVShows = function (req, res) {
  TVShow.find(req.params.id)
    .sort({ title: -1 })
    .then((tvshow) => {
      if (tvshow) {
        res.json(tvshow);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
};

//GET - Return a TVShow with specified ID
exports.findById = function (req, res) {
  console.log('GET /tvshow/' + req.params.id);
  TVShow.findById(req.params.id)
    .then((tvshow) => {
      if (tvshow) {
        res.json(tvshow);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
};

//GET - Search TVShows with specified ID
exports.searchByText = function (req, res) {
  console.log('GET /tvshow/' + req.params.text);
  TVShow.find({ genre: 'Comedy' })
    .then((tvshows) => {
      if (tvshows) {
        res.status(200).jsonp(tvshows);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

//GET - Search TVShows with specified Genre
exports.searchByGenre = function (req, res) {
  console.log('GET /tvshow/genre/' + req.params.genre);
  const genre =
    req.params.genre.charAt(0).toUpperCase() + req.params.genre.slice(1);
  TVShow.find({ genre: genre })

    .then((tvshows) => {
      if (tvshows) {
        res.status(200).jsonp(tvshows);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

//GET - Search TVShows with specified ID
exports.searchByText = function (req, res) {
  console.log('GET /tvshow/' + req.params.text);
  TVShow.find({ genre: 'Comedy' })
    .then((tvshows) => {
      if (tvshows) {
        res.status(200).jsonp(tvshows);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

//GET - Search TVShows with specified country
exports.searchByCountry = function (req, res) {
  console.log('GET /tvshow/country/' + req.params.country);
  TVShow.find({ country: req.params.country })
    .then((tvshows) => {
      if (tvshows) {
        res.status(200).jsonp(tvshows);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function (req, res) {
  console.log('POST');
  console.log(req.body);

  var tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function (err, tvshow) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(tvshow);
  });
};

//PUT - Update a register already exists
exports.updateTVShow = function (req, res) {
  TVShow.findById(req.params.id, function (err, tvshow) {
    tvshow.title = req.body.petId;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function (err) {
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
    });
  });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function (req, res) {
  TVShow.findById(req.params.id, function (err, tvshow) {
    tvshow.remove(function (err) {
      if (err) return res.send(500, err.message);
      res.status(200).end();
    });
  });
};
