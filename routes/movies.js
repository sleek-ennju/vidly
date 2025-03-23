const express = require('express'); //express
const router = express.Router(); //express router
const mongoose = require('mongoose'); //mongoose

// movie model
const Movie = require("../models/movie");
const { Genre } = require("../models/genre");
// helper utility
const { valiMovie, valiMovieGenre } = require('../utilities/utility');

// get all movies
router.get("/", async (req,res)=>{
    const page = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit)  || 3;

    try {
        const movies = await Movie.find().populate("genre", "name -_id").sort("name").skip((page - 1) * limit).limit(limit);
        res.send({
            message: "Success",
            data: movies
        })
    } catch (error) {
        res.status(500).send({
            message: "Unexpected error",
            details: error.message
        })
    }
});

// get a single movie
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).send({
                message: 'Movie not found or does not exist in our database',
            })
        }
    
        res.status(200).send({
            message: "Success",
            data: movie
        })
    } catch (error) {
        res.status(500).send({
            message: "Unexpected error",
            details: error
        })
    }
   
});

// create movie
router.post("/", async (req, res) => {
    // validate incoming body
   const {err} = valiMovie(req.body);
   if(err){
        return res.status(400).send(err.details[0].message);
   }

    // check if genre exists in our database
   const genre = await Genre.find({name: req.body.genre});
   if(!genre.length > 0){
    return res.status(404).send("Genre not found. Please select a Genre title in our database");
   }

   try {
       const newMovie = new Movie({
            title: req.body.title,
            genre: genre[0]._id,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
       });
    
       const result = await newMovie.save();
       res.status(200).send({
        message: "Successful",
        data: result
       });
   } catch (ex) {
    res.status(400);
            
    // Check if ex.errors exists and is an object
    if (ex.errors && typeof ex.errors === 'object') {
        const errors = [];
    
        // Iterate over the errors
        Object.entries(ex.errors).forEach(([field, error]) => {
        console.log("Error details: ", error.message); // Log the error
        errors.push({ field, message: error.message }); // Collect errors
        });
    
        // Send a structured JSON response
        res.send({ errors });
    } else {
        // Handle cases where ex.errors is not available
        console.log("Unexpected error: ", ex.message);
        res.send({ error: ex.message || 'An unexpected error occurred' });
    }
   }

});
// update movie properties excluding genre
router.put("/:id", async (req, res) => {
    // validate incoming body
   const {err} = valiMovie(req.body);
   if(err){
        return res.status(400).send(err.details[0].message);
   }
   
   try {
        const result = await Movie.findByIdAndUpdate(request.params.id, {
            $set: {
                title: req.body.title,
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }
        }, { new: true});
         
        if(!result){
            return res.status(404).send({message: "Movie not found or does not exist in our database"});
        }
        // send response
        res.status(200).send({
            message: "Success",
            data: result
        })
   } catch (ex) {
        res.status(400);
                
        // Check if ex.errors exists and is an object
        if (ex.errors && typeof ex.errors === 'object') {
            const errors = [];
        
            // Iterate over the errors
            Object.entries(ex.errors).forEach(([field, error]) => {
            console.log("Error details: ", error.message); // Log the error
            errors.push({ field, message: error.message }); // Collect errors
            });
        
            // Send a structured JSON response
            res.send({ errors });
        } else {
            // Handle cases where ex.errors is not available
            console.log("Unexpected error: ", ex.message);
            res.send({ error: ex.message || 'An unexpected error occurred' });
        }
   }

});

// update genre of a particular movie
router.put("/category/:id", async (req, res) => {
     // validate incoming body
   const {err} = valiMovieGenre(req.body);
   if(err){
        return res.status(400).send(err.details[0].message);
   }

    // query database to find movie
   const movie = await Movie.findById(req.params.id);
   if(!movie){
        return res.status(404).send("Movie not found or does not exist in our database");
   }

    // check if genre exists in our database
    const genre = await Genre.find({name: req.body.title});
    if(!genre.length > 0){
     return res.status(404).send("Genre not found. Please select a Genre title in our database");
    }

    try {
        // update genre in our database
        movie.set({
            genre: genre[0]._id
        })
        // save the movie document
        const result = await movie.save();
        res.status(201).send({
            message: "Movie genre updated successfully",
            data: result
        })
    } catch(ex) {
        res.status(400);
            
        // Check if ex.errors exists and is an object
        if (ex.errors && typeof ex.errors === 'object') {
            const errors = [];
        
            // Iterate over the errors
            Object.entries(ex.errors).forEach(([field, error]) => {
            console.log("Error details: ", error.message); // Log the error
            errors.push({ field, message: error.message }); // Collect errors
            });
        
            // Send a structured JSON response
            res.send({ errors });
        } else {
            // Handle cases where ex.errors is not available
            console.log("Unexpected error: ", ex.message);
            res.send({ error: ex.message || 'An unexpected error occurred' });
        }
    }
});

router.delete("/:id", async (req, res )=>{
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);
        res.status(201).send({
            message: "Movie deleted successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An unexpected error occurred while deleting",
            details: error
        });
    }
});


module.exports = router;