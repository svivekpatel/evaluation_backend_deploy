const express = require("express")
const { postModel } = require("../models/post.model")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    try {
        const posts = await postModel.find()
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


postRouter.post("/add",async(req,res)=>{
    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post has been added!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const {id} = req.params
    try {
        await postModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"post has been updated!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await postModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"post has been deleted!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports = {
    postRouter
}