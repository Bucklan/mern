const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/task');
const app = express();
const PORT =  4000;
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


