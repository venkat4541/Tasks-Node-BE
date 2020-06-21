const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const mongoose = require('mongoose');
let Todo = require('./db/todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://@cluster0-zzb4d.mongodb.net/spheretowndb?retryWrites=true&w=majority',{
    user: 'admin',
    pass: 'crazy4541',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
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

// router.route('/delete/:id').post(function(req, res) {
//   Todo.findById(req.params.id, function(err, todo) {
//       if (!todo)
//           res.status(404).send("data is not found");
//       else
//           todo.deleteOne().then(todo => {
//               res.json('Todo updated!');
//           })
//           .catch(err => {
//               res.status(400).send("Update not possible");
//           });
//   });
// });

app.listen(PORT, () => {
  console.log('Server is running on: ', PORT);
})