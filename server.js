const express = require('express')
const app = express()
const mongoose = require('mongoose')
const model = require('./models/model')
const port = 8000



app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
// Connect to the dataBase
mongoose.connect("mongodb://localhost/urlShortnerDB",{useNewUrlParser:true,useUnifiedTopology:true})

app.get('/',async (req,res)=>{
    
    const shortUrls = await model.find()
    
    res.render('index',{shortUrls:shortUrls})
})


app.post('/shortUrl',async (req,res)=>{
    await model.create({full:req.body.fullUrl})
    res.redirect('/')
    
})

app.get('/:shortUrl', async (req,res)=>{

    const shortUrl = await model.findOne({short: req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)
    shortUrl.save()
    shortUrl.click++ 
    res.redirect(shortUrl.full)

})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port} 🚀`)
})