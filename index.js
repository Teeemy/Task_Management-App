const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route");

require("dotenv").config();
const app = express();

//  MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error(" Database connection error:", err));

// Port
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/tasks", require("./routes/task.route"));


    
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}); 
