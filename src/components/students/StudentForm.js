import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:8080/students', { name, age });
      console.log(response.data);
      setName('');
      setAge('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className=' p-3 '>
      <h2>Add Student</h2>
      <div className='d-flex flex-column gap-2'>
        <input
          className='p-2 rounded  focus-ring  focus-ring-success'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='p-2 rounded  focus-ring focus-ring-success    '
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className='p-1 rounded-2 btn btn-dark ' onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
    
    </>
  );
};

export default StudentForm;
