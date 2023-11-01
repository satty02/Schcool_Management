const express = require('express');
const router = express.Router();
const Marks = require('../model/marksModel');

// adding marks

router.post('/marks', async(req,res)=>{
    try{
      console.log()
        const marks = new Marks(req.body);
        await marks.save()
        res.status(201).send(marks);
    }catch (err){
        res.status(500).json({error:err})
    }
})


router.get('/marks', async (req,res)=>{
    try {
        const marks = await Marks.find()
            .populate('studentID','name')
            .select('studentID studentName teacherName subject marks');
        
            res.json(marks)

    }catch (err){
        res.status(500).json({error:err.message})
    }
})


// Update marks entry by ID
router.put('/marks/:id', async (req, res) => {
    try {
      const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(marks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete marks entry by ID
  router.delete('/marks/:id', async (req, res) => {
    try {
      await Marks.findOneAndDelete({_id:req.params.id});
      res.json({ message: 'Marks entry deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
module.exports = router;