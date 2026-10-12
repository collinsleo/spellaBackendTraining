const express = require("express");
const app = express()
const cors = require("cors");
const env =  require("dotenv"); env.config();

const authRoutes = require("./routes/auth.router")
const userRoutes = require("./routes/user.route")
const connectDb = require("./config/database.config");

app.use(cors())
app.use(express.json())


connectDb();

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT} click http://localhost:${PORT}`);  
})
