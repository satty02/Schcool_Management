import React, { useState } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const handleAddTeacher = async () => {
    try {
      const response = await axios.post('http://localhost:8080/teachers', { name, subject });
      console.log(response.data);
      setName('');
      setSubject('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-3 '>
      <h2>Add Teacher</h2>
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
        <button className='p-1 rounded btn btn-dark ' onClick={handleAddTeacher}>Add Teacher</button>
      </div>
    </div>
  );
};

export default TeacherForm;
