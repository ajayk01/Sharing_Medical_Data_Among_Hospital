const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
   
    Pat_name: {
        type : String,
        required : true,
    },
    Pat_id: {
        type : Number,
        required : true,
    },
    Doc_name: {
        type : String,
        required : true,
    },
    Hos_name: {
        type : String,
        required : true,
    },
    sugar_level: {
        type : String,
        required : true,
    },
     blood_pressure :{
        type : String,
        required :true
    },
    vaccine_type :{
        type : String,
        
    },
    vaccine_doc :{
        type : String,
       
    },
    surgery_name :{
        type : String,
        
    },
   surgery_doc :{
        type : String,
        
    },
    report :{
        type : String,
        required :true
    },
    email :
    {
        type : String,
        required :true
    },
    date :
    {
        type : String,
        required :true
    }


    

});
const Data = mongoose.model("Data", DataSchema);
module.exports = Data;