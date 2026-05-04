//start server
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/DB/db");

connectDB();

app.listen(5000, () => {
    console.log("Server is running on 5000");
});