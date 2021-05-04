const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connection to MongoDB
const db = config.get('mongoURI');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/uploadVideo', require('./routes/api/uploadVideo'));
app.use('/api/records', require('./routes/api/records'));
const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));