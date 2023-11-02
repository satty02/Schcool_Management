import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarksForm = () => {
  const [studentID, setStudentID] = useState('');
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  
    const existingMark = students.filter(
      (student) => student._id === studentID && student.subject === subject);
  
    if (existingMark) {
      setErrorMessage('A mark for this student and subject already exists.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/marks', {
        studentID,
        studentName,
        teacherName,
        subject,
        marks,
      });
      console.log(response.data);
      setStudentID('');
      setStudentName('');
      setTeacherName('');
      setSubject('');
      setMarks('');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    setStudentID(selectedId);

    const selectedStudent = students.find((student) => student._id === selectedId);
    if (selectedStudent) {
      setStudentName(selectedStudent.name);
      setSubject(selectedStudent.subject);
    } else {
      setStudentName('');
      setSubject('');
    }
  };

  const handleSelectTeacher = (e) => {
    const selectedTeacher = e.target.value;
    setTeacherName(selectedTeacher);

    const selectedSubject = teachers.find((teacher) => teacher.name === selectedTeacher);
    if (selectedSubject) {
      setSubject(selectedSubject.subject);
    } else {
      setSubject('');
    }
  };

  return (
    <div className='p-3'>
      <div className='d-flex  justify-content-between m-1 bg-gradient p-1 rounded'>
        <h3 className=''>Add Marks</h3>
        <button onClick={() => setShow(!show)} className='p-2 w-25 btn btn-sm btn-outline-dark'>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>

      {show ? (
        <div className='d-flex flex-column gap-2'>
          <select
            onChange={handleSelect}
            className='p-1 rounded focus-ring focus-ring-primary'
            required
          >
            <option>Select studentID</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student._id}
              </option>
            ))}
          </select>
          <input
            className='p-2 focus-ring focus-focus-ring-danger rounded bg-light'
            type="text"
            placeholder="Student Name"
            value={studentName}
            readOnly
          />

          <select
            onChange={handleSelectTeacher}
            className='p-1 rounded focus-ring focus-ring-primary'
          >
            <option>Select teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
          <input
            className='p-2 focus-ring focus-focus-ring-danger rounded bg-light'
            type="text"
            placeholder="Subject"
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
          <button className='p-1 rounded btn btn-dark' onClick={handleAddMarks}>
            Add Marks
          </button>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      ) : null}
    </div>
  );
};

export default MarksForm;
