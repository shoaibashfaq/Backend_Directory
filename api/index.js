
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const { ObjectId } = require('mongodb');
// Route to get all employees
router.get("/all_employees", async (req, res) => {
    const { client,database, employees,job } = await connectToDatabase();
    try {
        
        // Query all employees
        const allEmployees = await employees.find({}).toArray();
        
        res.status(200).send(allEmployees);
        console.log("Fetched all employees:", allEmployees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send({ message: "An error occurred while fetching employees" });
    } finally {
       
        await client.close(); // Close the client connection
        
    }
});

router.get("/employee/:id", async (req, res) => {
    const { client,database, employees } = await connectToDatabase();
    try {
        const id = req.params.id
        // Query all employees
        const employee = await employees.find({_id: new ObjectId(id)}).toArray();
        
        res.status(200).send(employee);
        console.log("Fetched single employees:");
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send({ message: "An error occurred while fetching :id employee" });
    } finally {
       
        await client.close(); // Close the client connection
        
    }
});
router.get("/jobs", async (req, res) => {
    const { client, jobs_collection } = await connectToDatabase();
    try {
        // Query all employees
        const jobs = await jobs_collection.find({}).toArray();
        
        res.status(200).send(jobs);
        console.log("Fetched all jobs:");
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send({ message: "An error occurred while fetching jobs" });
    } finally {
       
        await client.close(); // Close the client connection
        
    }
});

router.get("/locations", async (req, res) => {
    const { client, location_coll } = await connectToDatabase();
    try {
        // Query all employees
        const locations = await location_coll.find({}).toArray();
        
        res.status(200).send(locations);
        console.log("Fetched all locations:");
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).send({ message: "An error occurred while fetching locations" });
    } finally {
       
        await client.close(); // Close the client connection
        
    }
});



module.exports = router;