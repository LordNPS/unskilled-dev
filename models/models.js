var mongoose = require('mongoose')
var schema = mongoose.Schema
var userSchema = new schema({
    name: String,
    age: Number
})
module.exports=mongoose.model('user',userSchema)
