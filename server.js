const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitwitgym', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// MongoDB Schema for SignUp and Feedback
const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Signup = mongoose.model('Signup', signupSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// API routes
app.post('/signup', async (req, res) => {
    const newSignup = new Signup(req.body);
    try {
        await newSignup.save();
        res.status(201).json(newSignup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/feedback', async (req, res) => {
    const newFeedback = new Feedback(req.body);
    try {
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
