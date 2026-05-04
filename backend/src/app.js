//create server
const express = require("express");
const cookierParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require("cors");

const app = express();
app.set("trust proxy", 1);
app.use(cookierParser());

const allowedOrigins = [
    "https://food-reels-two.vercel.app", //Live Frontend
    "http://localhost:5173",             //Frontend (Vite default)
    "http://localhost:3000"              //Frontend (CRA default)
];

app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to FoodReels API");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;