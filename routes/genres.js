const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const debug = require('debug')("dbConnection");
// helper utilities
const { Genre } = require("../models/genre");
const { valiGenre } = require("../utilities/utility");




// Get all genres
router.get('/', (req, res)=>{
    const page = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit)  || 3;
    
    Genre.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then((genres)=>{
            res.send({
                message: "Success!",
                data: genres
            });
        })
        .catch((err)=>debug(err));
})
// Get a single genre
router.get('/:id', (req,res)=>{
    // Check if genre already exists
    Genre.findById(req.params.id)
        .then((genre)=>{
            res.send({
                message: "Success!",
                data: genre
            });
        })
        .catch((err)=>{
            debug(err);
            res.status(404).send({
                message: "Genre not found or does not exist!"
            })
        });
})
// Create new genre
router.post('/', (req,res)=>{
   // validate incoming body
   const {err} = valiGenre(req.body);
   if(err){
        return res.status(400).send(err.details[0].message);
   }

    //create new document
    const newGenre = new Genre({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        category: req.body.category
    });
    // save document
    newGenre.save()
        .then((result)=>{
            res.send({
                message: "Successfully created new genre!",
                data: result
            })
        })
        .catch((ex)=>{
            res.status(400);
            
            // Check if ex.errors exists and is an object
            if (ex.errors && typeof ex.errors === 'object') {
                const errors = [];
            
                // Iterate over the errors
                Object.entries(ex.errors).forEach(([field, error]) => {
                debug("Error details: ", error.message); // Log the error
                errors.push({ field, message: error.message }); // Collect errors
                });
            
                // Send a structured JSON response
                res.send({ errors });
            } else {
                // Handle cases where ex.errors is not available
                debug("Unexpected error: ", ex.message);
                res.send({ error: ex.message || 'An unexpected error occurred' });
            }
        })
})

// Update existing genre
router.put("/:id", (req, res) => {
    // Check if genre already exists
    Genre.findById(req.params.id)
        .then((genre)=>{
            // validate incoming body
            const { error } = valiGenre(req.body);
            if(error){
                return res.status(400).send(error.details[0].message);
            }

            // update genre
            genre.set({
                name: req.body.name,
                description: req.body.description,
                tags: req.body.tags,
                category: req.body.category
            });

            // save document with updated values
            genre.save()
                .then(()=>{
                    res.send({
                        message: "Success!",
                        data: genre
                    })
                })
                .catch(error => {
                    debug(error);
                    res.status(500).send({
                        message: error.message || "An unexpected error occurred while deleting the document.",
                    });
                });
        })
        .catch((err)=>{
            debug(err);
            res.status(404).send({
                message: "Genre not found or does not exist!"
            })
        });
});

// delete existing genre
router.delete("/:id", (req, res)=>{
   // Check if genre already exists
   Genre.findById(req.params.id)
   .then((genre)=>{
       Genre.deleteOne({_id: genre.id})
        .then(()=>{
            res.status(201).send({
                message: "Genre deleted successfully"
            })
        })
        .catch(err => {
            debug(err);
            res.status(500).send({
                message: err.message || "An unexpected error occurred while deleting the document."
            })
        })
   })
   .catch((err)=>{
       debug(err);
       res.status(404).send({
           message: "Genre not found or does not exist!"
       })
   });
   
})



module.exports = router;