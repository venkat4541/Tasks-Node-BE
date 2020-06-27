const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');
app.use(cors());

const users = require('./routes/api/users');
let Todo = require('./models/Todo');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

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

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('api/users', users);

const router = express.Router();
app.use('/todos', router);
router.route('/').get((req, res) => {
  Todo.find((err, todos) => {
      if (err) {
          console.log(err);
      } else {
          res.json(todos);
      }
  });
});

router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
      res.json(todo);
  });
});

router.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save()
      .then(todo => {
          res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new todo failed');
      });
});


router.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
      if (!todo)
          res.status(404).send("Data not found");
      else
          todo.title = req.body.title;
          todo.user = req.body.user;
          todo.priority = req.body.priority;
          todo.completed = req.body.completed;

          todo.save().then(todo => {
              res.json('Todo updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

router.route('/delete/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("Data not found");
        else
            Todo.deleteOne({"_id":req.params.id}).then(todo => {
                res.json('Todo deleted!');
            })
            .catch(err => {
                res.status(400).send("Data deletion failed");
            });
    });
});