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
    .catch(error => console.error(" Database connection error:", error));

// Port
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/auth",authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);


    
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}); 
