const express=require('expres')
const mongoose = require('mongoose');
const authRoutes=require("./src/routes/authRoutes")

mongoose.connect("")
.then(() => console.log('MongoDB Connected'))
.catch((error) => console.log('Error Connecting to Database: ', error));

const app=express();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(5001, ()=>{
    console.log("Server started");
})