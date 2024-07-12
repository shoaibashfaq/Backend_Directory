const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
// app.use(
//   cors({
//     //production front end url
//     origin:"localhost:3001" , // allow to server to accept request from different origin
//     methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
//     credentials: true,
//     // allowedHeaders:
//     //   "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//     preflightContinue: true,
//   })
// );

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hits Enterprise Directory Backend');
});


app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
    });

//mounting on routes
app.use("/api", require("./api"));
    
module.exports = app