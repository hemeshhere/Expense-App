const express=require('expres')
const authRoutes=require("./src/routes/authRoutes")

const app=express();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(5001, ()=>{
    console.log("Server started");
})