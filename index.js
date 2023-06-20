const express = require('express')
const cors = require('cors')
const db = require('./config/db')    
const app = express()
  
require("dotenv").config({path : "./.env"})
  
  
db()        
app.use(cors())  
app.use(express.json())   
app.use(express.static("public"))

  
app.use("/api",require("./routes/settingRoute"))


const PORT = process.env.PORT || 5002

app.listen(PORT , () => console.log("Server running on 5002"))  