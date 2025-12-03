import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {    
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
export default Task;