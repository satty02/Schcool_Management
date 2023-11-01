import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const [message, setMessage] = useState('');
  const [deletedMessage, setDeletedMessage] = useState('')

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


    async function handleDelete(e) {
      try {
        const id = e.target.value
        const response = await axios.delete(`http://localhost:8080/teachers/${id}`);
        console.log(response.data.message)
        setDeletedMessage(response.data.message)
      } catch (error) {
        console.error(error);
      }
    }

// handling the changes in the edit fields
    async function handleEditSubmit(e) {
      try {
        const editData = {
          name:name,
          subject:subject
        }

        const response = await axios.put(`http://localhost:8080/teachers/${selectedId}`,editData);
        setName('');
        setSubject('');
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
      setMessage('');
    }, 5000);
    setTimeout(() => {
      setDeletedMessage('');
    }, 5000);

  return (
    <div className='p-2 shadow-lg '>
      <h2 className='text-light '>Teachers List</h2>
      <p className='text-bg-danger text-center ' >{deletedMessage?deletedMessage:null}</p>
      <ul className='list-unstyled '>
        {teachers.map((teacher,index) => (
          <li className='  bg-success-subtle m-1 p-3 rounded gap-3' key={teacher._id}>
            <div className='d-flex flex-column gap-1 '>
              <div className=''>{isEditing(teacher._id) && enableEdit ? <input onChange={(e)=>setName(e.target.value)} value={name} className='rounded  p-1' placeholder='Name'/> :`Name :  ${teacher.name}`}</div> 
              <div>{isEditing(teacher._id) && enableEdit ? <input onChange={(e)=>setSubject(e.target.value)} value={subject} className='p-1 rounded' placeholder='Subject'/> : `subject :  ${teacher.subject}`}</div>
            </div>
            {isEditing(teacher._id) && enableEdit ? <button onClick={handleEditSubmit} value={teacher.id} className='btn btn-outline-dark my-1'>submit</button>:null}
            {message? <label className='text-success '>{message}</label>:null}
            <div className='d-flex flex-row gap-1 mt-2 '>
              <button onClick={handleEdit} value={teacher._id} className='btn btn-primary'>{!enableEdit?`Edit`:`cancel`}</button>
              <button onClick={handleDelete} value={teacher._id} className='btn btn-danger'>Delete</button>  
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
