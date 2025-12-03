import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
const taskroutes = require('./routes/taskroutes');
const errorhandles = require('./middleware/errorhandles');

const app = express();
dotenv.config();

// Connect to database
connectDB();

//middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/tasks', taskroutes);

// Error handler middleware
app.use(errorhandles);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});