import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to check if a student with the same name already exists
  const isStudentNameExists = (name) => {
    return students.some((student) => student.name === name);
  };

  const handleAddStudent = async () => {
    if (isStudentNameExists(name)) {
      setErrorMessage('Student with the same name already exists.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/students', { name, age });
      console.log(response.data);

      setStudents([...students, response.data]);

      setName('');
      setAge('');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='p-3'>
        <div className='d-flex justify-content-between m-1 bg-gradient p-1 rounded'>
          <h3>Add Student</h3>
          <button onClick={() => setShow(!show)} className='p-2 w-25 btn btn-sm btn-outline-dark'>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        {show ? (
          <div className='d-flex flex-column gap-2'>
            <input
              className='p-2 rounded focus-ring focus-ring-success'
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='p-2 rounded focus-ring focus-ring-success'
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button className='p-1 rounded-2 btn btn-dark' onClick={handleAddStudent}>
              Add Student
            </button>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default StudentForm;
