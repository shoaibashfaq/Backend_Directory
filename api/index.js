
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db')
// Route to get all employees
router.get("/all_employees", async (req, res) => {
    const { client,database, employees } = await connectToDatabase();
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

module.exports = router;