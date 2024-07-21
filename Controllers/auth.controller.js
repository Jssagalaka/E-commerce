/**
 * I need to wirte the controller / logic the registration a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../Models/user.model")
const secret = require("../configus/auth.config")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {//Avalable all code

    //logic to create the user

    //1> Read the request body
    const request_body = req.body

    //2> Insert the data in the users collection in mongodb
    const userobj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

   try {
    const user_created = await user_model.create(userobj)

    //3>return this user

    const res_obj ={
        name : user_created.name,
        userId: user_created.userId,
        email : user_created.email,
        userType :user_created.userType,
        createdAt : user_created.createdAt,
        updatedAt : user_created.updatedAt
    }
     res.status(201).send(res_obj)

   } catch (error) {
    console.log("Error while registring the user",error);
    res.status(500).send({
        message : "some error happend while registring the user"
    })

   }

    //3> Return the responce back to the user
}

exports.signin = async (req, res)=>{

    //Check if the user id is present in the system
    const user = await user_model.findOne({userId : req.body.userId})
 
    if(user == null){
     return res.status(400).send({
         message : "User id passed is not a valid user id"
     })
    }
 
    //Password is correct 
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordValid){
     return res.status(401).send({
         message : 'Wrong password passed'
     })
    }
 
    // using jwt we will create the acces token with a given TTL and return
    const token = jwt.sign({id : user.userId}, secret.secret,{
     expiresIn : 120 
    })
 
    res.status(200).send({
     name : user.name,
     userId : user.userId,
     email : user.email,
     userType : user.userType,
     accessToken : token 
    })
 
 
 }
