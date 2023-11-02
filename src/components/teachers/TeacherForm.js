import React, { useState } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [show, setShow] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to check if a teacher with the same name already exists
  const isTeacherNameExists = (name) => {
    return teachers.some((teacher) => teacher.name === name);
  };

  const handleAddTeacher = async () => {
    if (isTeacherNameExists(name)) {
      setErrorMessage('Teacher with the same name already exists.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/teachers', { name, subject });
      console.log(response.data);

      setTeachers([...teachers, response.data]);

      // Clearing form and error message
      setName('');
      setSubject('');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-3 '>
      <div className='d-flex  justify-content-between m-1 bg-gradient p-1 rounded'>
        <h3 className=''>Add Teacher</h3>
        <button onClick={() => setShow(!show)} className='p-2 w-25 btn btn-sm btn-outline-dark'>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>

      {show ? (
        <div className='d-flex flex-column gap-2 '>
          <input
            className='p-2  rounded focus-ring focus-ring-success '
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='p-2  rounded focus-ring focus-ring-success '
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button className='p-1 rounded btn btn-dark' onClick={handleAddTeacher}>
            Add Teacher
          </button>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      ) : null}
    </div>
  );
};

export default TeacherForm;
