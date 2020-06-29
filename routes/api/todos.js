const express = require('express');
const router = express.Router();
let Todo = require('../../models/Todo');

// Get All tasks
router.get("/", (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Get task by ID
router.get("/:id", (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// Add new task
router.post("/add", (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

// Update an existing Task
router.post("/update/:id", (req, res) => {
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

// Delete a task
router.post("/delete/:id", (req, res) => {
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

module.exports = router;