const mongoose = require('mongoose');
require('dotenv').config()
const mongooseUrl = process.env.MONGODB_URI

const ConnectToMongo = async()=>{

   await mongoose.connect (mongooseUrl)
        console.log("Connected to Mongo Successfully");
}


module.exports = ConnectToMongo