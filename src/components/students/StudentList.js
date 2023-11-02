import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [message, setMessage] = useState('')

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


    async function handleDelete(e) {
      try {
        const id = e.target.value
        const response = await axios.delete(`http://localhost:8080/students/${id}`);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }

// handling the changes in the edit fields

    async function handleEditSubmit(e) {
      try {
        const editData = {
          name:name,
          age:age
        }

        console.log(selectedId)
        const response = await axios.put(`http://localhost:8080/students/${selectedId}`,editData);
        setName('');
        setAge('');
        setEnableEdit(false);
        setMessage(response.data);
      } catch (error) {
        console.error(error);

      }
    }

    const handleEdit = (e)=>{
      setEnableEdit(!enableEdit)
      setSelectedId(e.target.value);
    }

    const isEditing = (id) =>{
      return  selectedId===id
    }

    setTimeout(() => {
      setMessage('')
    }, 5000);

  return (
    <div className='p-2 shadow-lg  studentList' style={{ maxHeight: '500px', overflowY: 'auto' }}>
      
      <h2 className='text-light '>Student List </h2>
      <ul className='list-unstyled'>
        {students.map((student,index) => (
          <li className=' bg-success-subtle m-1 p-3 rounded gap-3' key={student._id}>
            <div className='d-flex flex-column gap-1 '>
              <div>{isEditing(student._id) && enableEdit ? <input onChange={(e)=>setName(e.target.value)} value={name} className='rounded  p-1' placeholder='Name' required/> :`Name :  ${student.name}`}</div> 
              <div>{isEditing(student._id) && enableEdit ? <input onChange={(e)=>setAge(e.target.value)} value={age}s className='p-1 rounded ' type='number' placeholder='age' required/> : `age :  ${student.age}`}</div>
            </div>
            {isEditing(student._id) && enableEdit ? <button onClick={handleEditSubmit} value={student.id} className='btn btn-outline-dark my-1'>submit</button>:null}
            <label className='text-success '>{message? message:null}</label>
            <div className='d-flex flex-row gap-1 mt-2 '>
              <button onClick={handleEdit} value={student._id} className='btn btn-primary'>{!enableEdit?`Edit`:`cancel`}</button>
              <button onClick={handleDelete} value={student._id} className='btn btn-danger'>Delete</button>  
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
