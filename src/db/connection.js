const mongoose = require('mongoose');
const url=`mongodb+srv://power:Rudra007@cluster0.0rgsp.mongodb.net/vishwaas?retryWrites=true&w=majority`
try {
    mongoose.connect(url)
    console.log('database is connected');
} catch (error) {
    console.log('connection failed');    
}