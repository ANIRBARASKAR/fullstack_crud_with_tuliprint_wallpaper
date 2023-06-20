const monngoose = require('mongoose')

module.exports = monngoose.model("Setting" ,monngoose.Schema({

   
    measurementunit :{
        type :String,
    },
    enablepatterns :{
        type :Boolean,
    },
    resolutiondpi :{
        type :Number,
    },
    currency :{
        type :String,
    },
    allowuploadimage :{
        type :String,
    }
        
    // }
}))