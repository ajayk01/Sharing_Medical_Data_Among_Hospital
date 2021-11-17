const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
   
    name1: {
        type : String,
        required : true,
    },
    name2: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true,
    },
    role: {
        type : String,
        required : true,
    },
    id :{
        type : Number,
        required :true
    },
    

});
const User = mongoose.model("User", UserSchema);
module.exports = User;