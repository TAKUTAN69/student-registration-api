const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


let students = [];

app.use(bodyParser.json());

app.get('/students', (req, res) => {
  res.json(students);
});


app.post('/students', (req, res) => {
  const student = req.body;
  students.push(student);
  res.status(201).json(student);
});


app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      students[i] = updatedStudent;
      return res.json(updatedStudent);
    }
  }

  res.status(404).send('Student not found');
});


app.delete('/students/:id', (req, res) => {
  const id = req.params.id;

  students = students.filter(student => student.id !== id);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
