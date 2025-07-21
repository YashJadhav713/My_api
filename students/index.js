const express = require('express');
const app = express();

app.use(express.json());

// Sample student data (in-memory)
let students = [
    { id: 1, name: "Yash", english: 85, math: 90, science: 78 },
    { id: 2, name: "Kartik", english: 70, math: 65, science: 80 }
];

// Home route
app.get('/', (req, res) => {
    res.json({ message: "Student API is live!" });
});

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Add a new student
app.post('/students', (req, res) => {
    const { name, english, math, science } = req.body;
    if (!name || english == null || math == null || science == null) {
        return res.status(400).json({ error: "Please provide name and all marks." });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        english,
        math,
        science
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Get a specific student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
