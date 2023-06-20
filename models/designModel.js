const monngoose = require('mongoose')

module.exports = monngoose.model("Design" ,monngoose.Schema({

   
    designsize :{
        type :Number,
    }
}))