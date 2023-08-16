const client = require('./client');
const util = require('util');

const REPLACE_ME = 'SELECT * FROM videoGames';

// Function to get all video games
// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
                // Execute the query to retrieve all video games from the database
        const { rows: videoGames } = await client.query('SELECT * FROM videoGames');
        return videoGames;
    } catch (error) {
                // If an error occurs, throw an error with a helpful message
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
                // Execute the query to retrieve a video game by its id
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);// Replace with your actual query
        return videoGame;// Return the first (and only) video game
    } catch (error) {
        throw error;// If an error occurs, propagate the error
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
try {
        
        // Extract fields from the request body
        const { name, description, price, inStock, isPopular, imgUrl } = body;
         // Construct the SQL query to insert a new video game into the database
        const query = `
            INSERT INTO videoGames (name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

         // Specify the values to be inserted into the query
        const values = [name, description, price, inStock, isPopular, imgUrl];
        // Execute the query and retrieve the newly inserted video game
        const { rows: [newVideoGame] } = await client.query(query, values);
        return newVideoGame;
    } catch (error) {
        throw error;
    }
    
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
   try {
        // Extract individual fields from the 'fields' object
        const { name, description, price, inStock, isPopular, imgUrl } = fields;
        // Construct the SQL query to update a video game by id
        const query = `
            UPDATE videoGames
            SET name = $1, description = $2, price = $3, "inStock" = $4, "isPopular" = $5, "imgUrl" = $6
            WHERE id = $7
            RETURNING *;
        `;
        // Specify the values to be updated in the query
        const values = [name, description, price, inStock, isPopular, imgUrl, id];
        // Execute the query and retrieve the updated video game
        const { rows: [updatedVideoGame] } = await client.query(query, values);
        return updatedVideoGame;
    } catch (error) {
        throw error;
    }
}


// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        // Construct the SQL query to delete a video game by id
        const query = `
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `;
        // Specify the value of the id to be deleted
        const values = [id];
        // Execute the query and retrieve the deleted video game
        const { rows: [deletedVideoGame] } = await client.query(query, values);
        return deletedVideoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}