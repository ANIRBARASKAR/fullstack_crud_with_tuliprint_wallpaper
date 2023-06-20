const monngoose = require('mongoose')

module.exports = monngoose.model("Mockup" ,monngoose.Schema({
    mockuptitle :{
        type :String,
    },
    avtar :{
        type : String, 
    },
    mockupstatus :{
        type :String,
    }
},{ timestamps: true }))   