const express = require("express");
const cors = require("cors");
const app = express();
const api_routes = require("./api");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({"extended":true}))
app.use("/api", api_routes);

app.listen(3000,() => {
    console.log("Up and running on port 3000");
})