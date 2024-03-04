const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/shekhardb"

const connectToMongo =  () => {
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')

}
module.exports = connectToMongo;