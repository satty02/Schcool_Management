const express = require('express');
const router = express.Router();
const Teacher = require('../model/teacherModel');

// adding teachers

router.post('/teachers', async(req,res)=>{
    try{
        const teacher = new Teacher(req.body);
        await teacher.save()
        res.status(201).send(teacher);
    }catch (err){
        res.status(500).json({error:err})
    }
});

// Get all teachers
router.get('/teachers', async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a teacher by ID
  router.put('/teachers/:id', async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(teacher)
      if(teacher){
        res.json('updated data successfully')
      }else{
        res.json('Some Error Occured')
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a teacher by ID
  router.delete('/teachers/:id', async (req, res) => {
    try {
      await Teacher.findOneAndDelete({_id:req.params.id});
      res.json({ message: 'Teacher deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;