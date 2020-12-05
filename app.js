const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const mongoConnect = "mongodb+srv://RifaKMalik:RifaKMalik@cluster0.acndi.mongodb.net/test?authSource=admin&replicaSet=atlas-ucjvht-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
mongoose.connect(mongoConnect ,
    {
    useUnifiedTopology:true,
    useNewUrlParser : true,
    useCreateIndex: true
    }
).then(res=>{console.log('connected')}).catch(err=>{console.log(err)});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// });


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

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