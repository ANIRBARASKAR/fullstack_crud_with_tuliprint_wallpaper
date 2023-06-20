const mongoose = require('mongoose')

const db = () => {
    try {
        mongoose.set('strictQuery',true)
        mongoose.connect(process.env.MONGOURL)

        console.log("DB COnnected 🎉🎉");
    } catch (error) {
        console.log("error 🫣",error);
    }
}

module.exports = db