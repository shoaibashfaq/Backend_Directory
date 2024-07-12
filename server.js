const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hits Enterprise Directory Backend');
});


app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
    });

//mounting on routes
app.use("/api", require("./api"));
    
module.exports = app