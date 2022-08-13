const express = require("express");
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://nurdbuser1:zkbpEPiL8LDaIT6k@cluster0.mgtwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log('Mongoose Connection successful'))
    .catch((err) => console.log(err))

// mongoose
// .connect('mongodb+srv://nurdbuser2:zkbpEPiL8LDaIT6k@cluster0.mgtwv.mongodb.net/EasyRent?retryWrites=true&w=majority')
// .then(() => console.log("DBConnction Successfull!"))
// .catch((err) => console.log(err));

app.use('/todo', todoHandler)


app.get('/', (req, res) => {
    res.send('hellow mongoose.')
})

function errorHandler(err, req, res, next) {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error: err})
}


app.listen(5000, () => {
    console.log('app listening at post 5000')
})