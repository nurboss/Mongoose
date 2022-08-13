const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);


// get all the todos
router.get('/' , async(req, res) => {
    await Todo.find({ status: "active"}).select({
        // _id: 0,
        date: 0
    })
    // .limit(2)
    .exec((err, data) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                result: data,
                message: "Todo was send successfully"
            })
        }
    });
    

});
// get a todos
router.get('/:id' , async(req, res) => {
    await Todo.find({ _id: req.params.id}, (err, data) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                result: data,
                message: "Todo was send successfully"
            })
        }
    }).clone()

});
// post A todo
router.post('/' , async(req, res) => {
    const newTodo = new Todo(req.body)
    await newTodo.save((err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'todo was inserted successfully'
            })
        }
    });
});

// post multiple todos
router.post('/all' , async(req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'todo was inserted successfully'
            })
        }
    })
});


// put todo

router.put('/:id' , async (req, res) => {
    try {
      const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "active"}}, { new: true, useFindAndModify: false });
    
      res.status(200).json({message: "Todo Was Update successfully!"});
    } catch (error) {
      res.status(500).json({error:'There was a Server Side Error!'})
    }

  });



// delete one todo
router.delete('/:id' , async(req, res) => {
    await Todo.deleteOne({ _id: req.params.id}, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: "Todo is deleted successfully"
            })
        }
    }).clone()

});
// delete todo
// router.delete('/:id' , async(req, res) => {

// });

module.exports = router;