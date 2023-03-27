const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { userModel } = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,ismarried} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            const newUser = new userModel({name,email,gender,password:hash,age,city,ismarried})
            await newUser.save()
            res.status(200).send({"msg":"user is registred!"})
        });
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        console.log(user)
        bcrypt.compare(password, user.password, (result) =>{
            if(result){
                res.status(200).send({"msg":"Login successful!","token":jwt.sign({ userId: user._id }, 'shhhhh')})
            }else{
                res.status(400).send({"msg":"enter correct details"})
            }
        });
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports = {
    userRouter
}