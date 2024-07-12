const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('directory');
        const employees = database.collection('employee_info')
        
        return { client, database, employees };
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Propagate the error back to the caller if needed
    }
}

module.exports = connectToDatabase;
