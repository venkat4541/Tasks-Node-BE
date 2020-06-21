
const mongoose = require('mongoose');
let Todo = require('./todo.model');

const dummyTodo = {
  title: 'Second Todo',
  user: 'Abhi',
  priority: 'Low',
  completed: false
}

export const connection = mongoose.connect('mongodb+srv://@cluster0-zzb4d.mongodb.net/spheretowndb?retryWrites=true&w=majority',{
    user: 'admin',
    pass: 'crazy4541',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((data) =>{
  console.log('connected to database');
  addToDo();
}).catch((err) =>{
  console.log('failed to connect to database', err);
});

addToDo = () => {
  var user = new Todo(dummyTodo);
    user.save()
    .then((data) => {
      console.log('Data saved!')
    })
    .catch((err) => {
      console.log('Error saving data: ', err);
    });
}