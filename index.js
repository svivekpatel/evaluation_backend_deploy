const express = require("express")
require("dotenv").config()
const { connection } = require("./db")
const { auth } = require("./middleware/auth.middleware")
const { postRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/user.routes")
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("unable to connect to db")
        console.log({msg:error.message})
    }
    console.log(`server is running in port ${process.env.port}`)
})