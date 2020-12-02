const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://RifaKMalik:' 
    + process.env.MONGO_ATLAS_PW + 
    '@cluster0.acndi.mongodb.net/test?retryWrites=true&w=majority' ,
    {
    useUnifiedTopology:true,
    useNewUrlParser : true,
    useCreateIndex: true
    }
).then(res=>{console.log('connected')}).catch(err=>{console.log(err)});

mongoose.Promise = global.Promise;




app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app;