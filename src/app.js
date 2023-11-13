const express = require("express")
const path = require("path")
require("./db/conn")
const User=require("./models/usermessage")
const hbs = require("hbs")
const { registerPartials } = require("hbs")

const register = require("./models/registers")


const app =express()
const port = process.env.PORT || 3000;

//for static website public ===start
//setting the path
const staticpath = path.join(__dirname,"../public")
const templatepath = path.join(__dirname,"../templates/views")
const partialpath = path.join(__dirname,"../templates/partials")


//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")))

app.use(express.json());

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);
hbs.registerPartials(path.join(__dirname,"../templates/partials/about"));
hbs.registerPartials(path.join(__dirname,"../templates/partials/service"));
hbs.registerPartials(path.join(__dirname,"../templates/partials/maps"));
hbs.registerPartials(path.join(__dirname,"../templates/partials/contact"));
hbs.registerPartials(path.join(__dirname,"../templates/partials/index"));
//static ==end





//routing
//app.get(path,callback)
app.get("/login",(req,res) =>  {
    res.render("login");
})

app.get("/",(req,res) =>  {
    res.render("index");
})

app.post("/contact",async(req,res) => {
    try{
        //res.send(req.body);
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error)

    }
})

//create a new user in database
app.post("/signup",async(req,res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        
if(password === cpassword){
  const registerPerson = new register({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    gender : req.body.gender,
    phone : req.body.phone,
    age : req.body.age,
    password : req.body.password,
    confirmpassword : req.body.confirmpassword
  })  

const registered = await registerPerson.save();
res.status(201).render("login");

} else{
    res.send("Passwords Doesnt Match")
}

    }catch(error){
        res.status(500).send(error)
    }
})

app.get("/signup",(req,res) => {
    res.render("signup")
})


//login check
app.post("/login",async(req,res) =>{
    try{
     const email = req.body.email
     const password = req.body.password

     const useremail = await register.findOne({email:email});

     if(useremail.password === password)
     {
        res.status(201).render("index");
     }else{
        res.status(201).render("login");
     }
    //  res.send(useremail);
    //  console.log(useremail)

    }catch(error){

        res.status(201).render("login")
    }
})

//server create
app.listen(port,()=>{
    console.log('server is running')
})
