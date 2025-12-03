import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import taskroute from './routes/taskroute.js';
import errorhandles from "./middleware/errorhandles.js"; // no curly braces

const app = express();
dotenv.config();

// Connect to database
connectDB();

//middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/tasks', taskroute);

// Error handler middleware
app.use(errorhandles);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});