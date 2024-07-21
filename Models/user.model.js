const mongoose = require('mongoose')

const userSchemas = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minlenght:10,
        unique:true
    },
    userType:{
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("User",userSchemas)//create a collection





