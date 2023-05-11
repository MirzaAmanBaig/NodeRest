//mongodb username:admin ;password:admin1234


const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Product=require('./models/productModel')

//this is use to post json values
app.use(express.json())

const port=3000;
//routes

//Delete the data by using id using delete request

app.delete("/product/:id",async(req,res)=>{
    try {
            const {id}=req.params
            const product=await Product.findByIdAndDelete(id)
            if(!product){
                res.status(404).json({message:`not data with id ${id}`})
            }
            res.status(200).json(product)
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
})
//Delete the data by using id using delete request

//Updating the data using id by using get request

app.put('/product/:id',async(req,res)=>{
    try {

        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            res.status(404).json({message:`cannot find the product of id ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(500).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//Updating the data using id 

//fetching data from database using GET request

app.get('/product',async(req,res)=>{
    try {
        //find is a mongoose function
        const product=await Product.find({})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//fetching data from database using GET request


//saving data to the database using POST request
app.post('/product',async(req,res)=>{
    
    try {
        //create is a mongoose function
        const product=await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//saving data to the database



app.get('/',(req,res)=>{
    res.send("this is home route")
})

app.get('/blog',(req,res)=>{
    res.send("this is blog route")
})




//change the password field and the place before "? and after /"
//mongoose.set("strictQuery")
mongoose.connect('mongodb+srv://admin:admin1234@noderest.8llqimy.mongodb.net/Node-Rest?retryWrites=true&w=majority')
.then(()=>{
    console.log("Database is connected")
    app.listen(port,()=>{
        console.log(`connected to port ${port}`)
    });
}).catch((error)=>{
    console.log(error)
})