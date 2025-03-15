const express = require('express');
const mongoose = require('mongoose');
const { Customer } = require("../models/customer");
const { valiCustomer, valiGoldStatus } = require('../utilities/utility');

// router matters
const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    const customers = await Customer.find().sort("-name").skip((page - 1) * limit).limit(limit);
    res.status(200).send({
        message: "Success!",
        data: customers
    });
});

// Get a single customer
router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        // check if customer is available
        if(!customer){
            return res.status(404).send("Customer not found or does not exist");
        }
        res.status(200).send({
            message: "Success!",
            data: customer
        })
    } catch (error) {
        res.status(500).send({
            message: "An unexpected error occurred",
            details: error
        })
    }
});

// Create a customer
router.post("/", async (req, res)=>{
    // validate customer request body
    const { error } = valiCustomer(req.body);
    if(error){
       return  res.status(400).send({
            messaged: "Error creating customer",
            errorDetails: error.details[0].message
        })
    }

    try {
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
        })
        const result = await customer.save();
        res.status(200).send({
            message: "Success creating a customer",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            message: "An unexpected error occurred",
            details: error
        })
    }
});

// update customer data
router.put("/:id", async (req, res) => {
    // validate customer request body
    const { error } = valiCustomer(req.body);
    if(error){
       return  res.status(400).send({
            message: "Error creating customer",
            errorDetails: error.details[0].message
        })
    }

    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone
        }, { new: true});
    
        if(!customer){
            return res.status(404).send({
                message: "Customer not found or does not exist"
            })
        }
    
        res.status(200).send({
            message: "Customer updated successfully",
            data: customer
        })
    } catch (error) {
        res.status(500).send({message: "Unexpected error", details: error.message});
    }

    
});

// update customer gold status
router.put("/gold/:id", async (req, res) => {
     // validate customer request body
     const { error } = valiGoldStatus(req.body);
     if(error){
        return  res.status(400).send({
             message: "Error updating gold status",
             errorDetails: error.details[0].message
         })
     }

     try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            isGold: req.body.isGold
        }, { new: true});
    
        if(!customer){
            return res.status(404).send({
                message: "Customer not found or does not exist"
            })
        }
    
        res.status(200).send({
            message: "Customer gold status updated successfully",
            data: customer
        })
    } catch (error) {
        res.status(500).send({message: "Unexpected error", details: error.message});
    }

});

// delete customer
router.delete("/:id", async (req, res) => {

    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if(!customer){
            return res.status(404).send({
                message: "Customer not found or does not exist"
            })
        }

        res.status(200).send({
            message: "Customer deleted successfully",
            data: customer
        })
    } catch (error) {
        res.status(500).send({message: "Unexpected error", details: error.message});
    }
    
});



module.exports = router;