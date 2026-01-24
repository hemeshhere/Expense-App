const express=require('expres')
const app=express();
app.use(express.json());
app.post('/register', (req, res)=>{
    const {name, email, password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            msg: 'Name, email and password required'
        });
    }
    const newUser={
        id: users.length+1,
        name: name,
        email: email,
        password: password,
    };
    users.push(newUser);
    return res.status(200).json({
        msg: 'user registered successfully',
        user: { id: newUser.id}
    });
});
app.listen(5001, ()=>{
    console.log("Server started");
})