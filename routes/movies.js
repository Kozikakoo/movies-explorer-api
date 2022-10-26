const router = require('express').Router();
const {
  createMovie, getMovies, deleteMovie
} = require('../controllers/movies');
const {movieDeleteValidation, movieCreateValidation} = require("../validations/movie");

router.get('/movies', getMovies);
router.delete('/movies/:movieId', movieDeleteValidation , deleteMovie);
router.post('/movies', movieCreateValidation, createMovie);

module.exports = router;