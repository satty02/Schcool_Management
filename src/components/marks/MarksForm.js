import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarksForm = () => {
  const [studentID, setStudentID] = useState('');
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState('')

  const [teachers, setTeachers] = useState([])
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:8080/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudents();
  }, [students]);


  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await axios.get('http://localhost:8080/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTeachers();
  }, [teachers]);


  const handleAddMarks = async () => {
    try {
      const response = await axios.post('http://localhost:8080/marks', {
        studentID,
        studentName,
        teacherName,
        subject,
        marks,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSelect = (e)=>{
    const selectedId = e.target.value;
    setStudentID(selectedId);

    const selectedStudent = students.find((student)=>student._id===selectedId);
    if(selectedStudent){
      setStudentName(selectedStudent.name)
    }else{
      setStudentName('')
    }

  }

  const handleSelectTeacher = (e)=>{
    const selectedTeacher = e.target.value;
    setTeacherName(selectedTeacher);

    const selectedSubject = teachers.find((teacher)=>teacher.name===selectedTeacher);
    if(selectedSubject){
      setSubject(selectedSubject.subject)
    }else{
      setSubject('')
    }

  }

  return (
    <div className='p-3'>
      <h2>Add Marks</h2>

      <div className='d-flex flex-column gap-2'>
        <select onChange={handleSelect} className='p-1 rounded focus-ring focus-ring-primary ' required>
          <option>Select studentID</option>
          {students.map((student)=>(
            <option key={student._id} value={student._id}>{(student._id)}</option>
          ))}
        </select>
        <input
        className='p-2 focus-ring focus-focus-ring-danger rounded bg-light '
          type="text"
          placeholder="Student Name"
          value={studentName}
          readOnly
        />


        <select onChange={handleSelectTeacher} className='p-1 rounded  focus-ring focus-ring-primary '>
          <option>Select teacher</option>
          {teachers.map((teacher)=>(
            <option key={teacher._id} value={teacher.name}>{(teacher.name)}</option>
          ))}
        </select>
        <input
        className='p-2 focus-ring focus-focus-ring-danger rounded bg-light '
          type="text"
          placeholder="Student Name"
          value={subject}
          readOnly
        />


        <input
        className='p-2 focus-ring focus-ring-info rounded'
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
        <button className='p-1 rounded  btn btn-dark ' onClick={handleAddMarks}>Add Marks</button>
      </div>
      
    </div>
  );
};

export default MarksForm;
