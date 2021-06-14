
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myDetailSchema = new Schema({
    name: String,
    country: String ,
    age: String ,
   
});

module.exports = mongoose.model('MyDetail', myDetailSchema);