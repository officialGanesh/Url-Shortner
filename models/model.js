const mongoose = require('mongoose')
const shortid = require('shortid')

const urlShortnerSchema = new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortid.generate()
    },
    clicks:{
        type:Number,
        default:0
    }
})


module.exports = mongoose.model('UrlShortner',urlShortnerSchema)
