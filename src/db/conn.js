const mongoose = require("mongoose");
//creating database
mongoose.connect("mongodb://localhost:27017/Mongodbproject",{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family: 4,
}).then(() => {
    console.log("connection successful")
}).catch((error) => {
    console.log(error)
})