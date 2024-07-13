const express = require("express");
const router = express.Router();
const connectToDatabase = require("../db");
const { ObjectId } = require("mongodb");
// Route to get all employees
router.get("/all_employees", async (req, res) => {
  const { client, employees } = await connectToDatabase();
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // Query employees with pagination
    const allEmployees = await employees
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of employees
    const totalEmployees = await employees.countDocuments();

    res.status(200).send({
      employees: allEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
    console.log("Fetched paginated employees");
  } catch (error) {
    console.error("Error fetching employees", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching employees" });
  } finally {
    await client.close(); // Close the client connection
  }
});

router.get("/employee/:id", async (req, res) => {
  const { client, database, employees } = await connectToDatabase();
  try {
    const id = req.params.id;
    // Query all employees
    const employee = await employees.find({ _id: new ObjectId(id) }).toArray();

    res.status(200).send(employee);
    console.log("Fetched single employees:");
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching :id employee" });
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
    console.log("Fetched all jobs");
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
    res
      .status(500)
      .send({ message: "An error occurred while fetching locations" });
  } finally {
    await client.close(); // Close the client connection
  }
});

router.get("/search", async (req, res) => {
  const { client, employees } = await connectToDatabase();
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.q || "";

    // Create a search filter
    const searchFilter = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { jobRole: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    // Query employees with pagination and search
    const searchResults = await employees
      .find(searchFilter)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of employees matching the search
    const totalResults = await employees.countDocuments(searchFilter);

    if (totalResults === 0) {
      return res.status(200).json({
        employees: [],
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        message: "No results found",
      });
    }

    res.status(200).json({
      employees: searchResults,
      currentPage: page,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
      message:
        searchResults.length > 0 ? "Results found" : "No results on this page",
    });
    console.log("Fetched search results:", searchResults);
  } catch (error) {
    console.error("Error searching employees:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching employees" });
  } finally {
    await client.close(); // Close the client connection
  }
});

module.exports = router;
