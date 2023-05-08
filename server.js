const express=require('express')
const app=express()
const port=3000

//routes

app.get('/',(req,res)=>{
    res.send("This is my get route")
})

app.listen(port,()=>{
    console.log(`aman ${port}`)
})
