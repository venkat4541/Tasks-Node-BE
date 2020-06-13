const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const mongoose = require('mongoose');
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/node-react-starter', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

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
          res.status(404).send("data is not found");
      else
          todo.todo_description = req.body.todo_description;
          todo.todo_responsible = req.body.todo_responsible;
          todo.todo_priority = req.body.todo_priority;
          todo.todo_completed = req.body.todo_completed;

          todo.save().then(todo => {
              res.json('Todo updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

app.listen(PORT, () => {
  console.log('Server is running on: ', PORT);
})