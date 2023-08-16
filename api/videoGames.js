const express = require('express');
const router = express.Router();



const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        // Call the function to get all video games from the database
        const videoGames = await getAllVideoGames();
        res.send(videoGames); // Respond with the array of video games
    } catch (error) {
        next(error); //Pass the error to the error handler middleware
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        // Call the function to get a single video game by its id
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame); // Respond with the retrieved video game
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        // Call the function to create a new video game using the request body
        const newVideoGame = await createVideoGame(req.body);
        res.status(200).json(newVideoGame); // Respond with the created video game
    } catch (error) {
        next(error);
    } 
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
     try {
        // Call the function to update a video game by its id using the request body
        const updatedVideoGame = await updateVideoGame(req.params.id, req.body);
        res.send(updatedVideoGame);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
   try {
    // Call the function to delete a video game by its id
        const deletedVideoGame = await deleteVideoGame(req.params.id);
        res.send(deletedVideoGame);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
