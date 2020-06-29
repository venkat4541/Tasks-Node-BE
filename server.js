const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');
app.use(cors());

const users = require('./routes/api/users');
const todos = require('./routes/api/todos');
let Todo = require('./models/Todo');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => { console.log('MongoDB connected successfully'); })
.catch((err) => { console.log('Error connecting to DB:', err); });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

// API routes
app.use('/api/users', users);
app.use('/api/todos', todos);