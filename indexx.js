import express from "express";
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
const mongourl = process.env.url
const port = process.env.port
const createconnection = async () => {
  const client = new MongoClient(mongourl)
  await client.connect()
  console.log("mongo connected")
  return client

}

const client = await createconnection()
//////////////////////////////////////////////////////////////////////////////////////////////////////
//teacher
//add teacher
app.post('/teacher', async (req, res) => {
  try {
    const { teacherData } = req.body;
    const teacher = await client
      .db("school2")
      .collection("teacher")
      .insertOne(teacherData)
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mentor' });
  }
});
// get all teachers
app.get('/allteachers', async (req, res) => {
  try {
    const teachers = await client
      .db("school2")
      .collection("teacher")
      .find({}).toArray();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});
// get teacher by id
app.get('/teacher/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const teacher = await client
      .db("school2")
      .collection("teacher")
      .findOne({ _id: new ObjectId(_id) });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});
// edit teacher by id
app.put('/teacher/edit/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const {name,email,assignedClass,phoneNumber}=req.body.teacherData
    const teacher = await client
      .db("school2")
      .collection("teacher")
      .updateOne({ _id: new ObjectId(_id) },{$set:{name:name,email:email,assignedClass:assignedClass,phoneNumber:phoneNumber}});
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

// delete teacher by id
app.delete('/teacher/delete/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const teacher = await client
      .db("school2")
      .collection("teacher")
      .deleteOne({ _id: new ObjectId(_id) });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////students
// create student
app.post('/students', async (req, res) => {
  try {
    const { studentData } = req.body;
    const student = await client
      .db("school2")
      .collection("students")
      .insertOne(studentData)
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});
// get all students 
app.get('/allstudents', async (req, res) => {
  try {
    const students = await client
      .db("school2")
      .collection("students")
      .find({}).toArray();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});



// get student by id
app.get('/student/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await client
      .db("school2")
      .collection("students")
      .findOne({ _id: new ObjectId(_id) });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});
// edit student by id
app.put('/student/edit/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const {name,email,claass,phoneNumber}=req.body.studentData
    const student = await client
      .db("school2")
      .collection("students")
      .updateOne({ _id: new ObjectId(_id) },{$set:{name:name,email:email,claass:claass,phoneNumber:phoneNumber}});
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit teachers' });
  }
});

// delete student by id
app.delete('/student/delete/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await client
      .db("school2")
      .collection("students")
      .deleteOne({ _id: new ObjectId(_id) });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

app.listen(port, () => console.log("server started on ", port))
