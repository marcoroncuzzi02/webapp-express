import express from 'express'
const router = express.Router();
import { index, show, destroy } from '../controllers/movieController.js'

// index
//localhost300/movies
router.get('/', index);

// show
//localhost300/movies
router.get('/:id', show);

// store
// router.post('/', store);

// update
// router.put('/:id', update);

// modify
// router.patch('/:id', modify);

// destroy
//localhost300/movies
router.delete('/:id', destroy);

export default router