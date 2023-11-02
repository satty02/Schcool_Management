import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarksList = () => {

  
  const [marks, setMarks] = useState([]);
  const [mark, setMark] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedId,setSelectedId] = useState('')


  useEffect(() => {
    async function fetchMarks() {
      try {
        const response = await axios.get('http://localhost:8080/marks');
        setMarks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMarks();
  }, [marks]);

  async function handleDelete(e) {
    try {
      const id = e.target.value
      const response = await axios.delete(`http://localhost:8080/marks/${id}`);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

// handling the changes in the edit fields

  async function handleEditSubmit(e) {
    try {
      const selectedId = e.target.value;
      const editData = marks.find((mark)=>(mark._id===selectedId))
      editData["marks"] = mark

       console.log(editData)
      const response = await axios.put(`http://localhost:8080/marks/${selectedId}`,editData);
      setMark('')
      setEnableEdit(false);
      // setMessage(response.data);
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

  return (
    <div className='p-2 shadow-lg 'style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <h2 className='text-light '>Marks List</h2>
      <ul className='list-unstyled'>
        {marks.map((mark) => (
          <li className=' bg-success-subtle m-1 p-3 rounded gap-3' key={mark._id}>
            <p>Student ID: {mark.studentID} <br/> studentName: {mark.studentName} <br/> Teacher: {mark.teacherName} <br/> Subject: {mark.subject}</p>
            <p>{isEditing(mark._id) && enableEdit ? <input onChange={(e)=>setMark(e.target.value)} className='p-1' placeholder='marks'/>:`Marks: ${mark.marks}`}</p>
            
            {isEditing(mark._id) && enableEdit ? <button onClick={handleEditSubmit} value={mark._id} className='btn btn-outline-dark my-1'>submit</button>:null}
            
            <label className='text-success '>{message? message:null}</label>
            <div className='d-flex flex-row gap-1 mt-2 '>
              <button onClick={handleEdit} value={mark._id} className='btn btn-primary'>{isEditing(mark._id) && enableEdit?`cancel`:`Edit`}</button>
              <button onClick={handleDelete} value={mark._id} className='btn btn-danger'>Delete</button>  
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarksList;
