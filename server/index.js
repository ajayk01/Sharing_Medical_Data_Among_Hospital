const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');

const UserModel = require("./models/User");
const DataModel = require("./models/Data");
let count = 0;
let vaccinedata='';
let surgery='';
let report='';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ajaykathir1101@gmail.com',
      pass: 'Ajay@2001'
    }
  });

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mainProject", {
    useNewUrlParser: true,
});
function h()
 {
     console.log("k");
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw console.log(err);
        var dbo = db.db("mainProject");
       // var myobj = { name: "Company Inc", address: "Highway 37" };
       dbo.collection("users").find({}).toArray(function(err, result) {
        //    console.log(result);
        if (err) throw err;
        if(result.length!=0){
        if(result[result.length-1].id == undefined)
          {
            //   console.log("inside if of h setting 0");
               count=0;
               
          }
          else
           {
            // console.log("inside if else of h setting greater than 0");
               count = result[result.length-1].id
             console.log("count is "+count);
           }
        }
        else
        {
            console.log("inside else");
            count=0;
        }
        db.close();
      });
      
  
 });
 
}

app.post("/insert", async(req, res)=>{
    console.log("called insert");
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const email = req.body.email;
    const password = req.body.pass;
    const role = req.body.role
    console.log(count);
    const id = count+1;
    count = count+1;
    const user = new UserModel({name1:name1,name2:name2,email:email, password:password,role:role,id:id});

    try {
        await user.save();
        
        res.sendStatus(200);
        res.send("Inserted successfully");
        return;
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

app.post("/readuser", async(req, res)=>{
    console.log("inside read called");
    email  = req.body.email;
    password = req.body.password;
    console.log(email);
    console.log(password);
    UserModel.findOne({email:email}, (err, result) => {
        if(err){
            res.send(err);
        }
        console.log(result);
        try{
        if(result==null)
         {
             res.sendStatus(501);
         }
         else {
        console.log("inside else");
        if(result.password==password)
        {
        res.setHeader("role",result.role);
        res.send({'role':result});
        res.send(result);
        res.sendStatus(200);
         }
         else
          {
              res.sendStatus(500);
          }
         }
        }
        catch (error) {
            console.log(error);
        }
    })
  

});

app.post("/readpat", async(req, res)=>{
    console.log("inside readpat called");
    email  = req.body.email;
   
    console.log(email);
    
    UserModel.findOne({email:email}, (err, result) => {
        if(err){
            res.send(err);
        }
        console.log(result);
        try{
        if(result==null)
         {
             res.sendStatus(501);
             return;
         }
         else {
        console.log("inside else");
        
        res.setHeader("role",result.role);
        res.send({'role':result});
        res.send(result);
        res.sendStatus(200);
         }
        
         
        }
        catch (error) {
            console.log(error);
        }
    })
  

});

app.post("/vaccine", async(req, res)=>{
    console.log("inside vaccine");
    vaccinedata = req.body.data;
   
});

app.post("/surgery", async(req, res)=>{
    console.log("inside surgery");
    surgery = req.body.data;
   
});

app.post("/report", async(req, res)=>{
    console.log("inside report");
    report = req.body.data;
    
});
app.post("/uploaddata",async(req, res)=>{
 console.log("inside upload data"+req.body.pat_name);
 let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
cp = date+"-"+month+"-"+year;
console.log(cp);
//  date = new Date();
//  cd = date.getDate()+"-"+
 //console.log(Pat_name+" "+Pat_id+" "+Doc_name+" "+Hos_name+" "+sugar_level+" "+blood_pressure+" "+vaccine_type+" "+surgery_name);
 const user = new DataModel({Pat_name:req.body.pat_name,
    Pat_id: req.body.pat_id,
    Doc_name:req.body.doc_name,
    Hos_name:req.body.hos_name,
    sugar_level:req.body.sugar_level,
    blood_pressure:req.body.blood_pressure,
    vaccine_type: req.body.vaccine_type,
    vaccine_doc:vaccinedata,
    surgery_name:req.body.surgery_name,
    surgery_doc:surgery,
    report:report,
     email:req.body.pat_email,
     date:cp});

    try {
        await user.save();
        
        res.sendStatus(200);
        res.send("Inserted successfully");
        return;
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }


});

app.post("/fetchdata", async(req, res)=>{
    console.log("inside fetchdata called");
    console.log(req.body.pat_id);
    
    DataModel.find({email:req.body.email}, (err, result) => {
        if(err){
            res.send(err);
        }
        //console.log(result);
        try{
       
        console.log("inside else"+result.id);
        res.send({'role':result});
        res.send(result);
        res.sendStatus(200);
         }
        
         
        catch (error) {
            console.log(error);
        }
    })

});
app.post("/auth", async(req, res)=>{
    console.log("inside auth");
    otp = req.body.otp,
    email = req.body.email
    console.log(email);
    var mailOptions = {
        from: 'ajaykathir1101@gmail.com',
        to: email,
        subject: 'Medical Data Sharing OTP',
        text: 'To Give more medicals details enter the otp '+otp+' in the given Box'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.sendStatus(200);
      });
    
});
app.put("/update", async(req, res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    

    try {
        await  FoodeModel.findById(id, (err, updatedFood) =>
        {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        }); 
    } catch (err) {
        console.log(err);
    }
});

app.get("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    res.send(id);
})

app.listen(3001 , () =>{
    console.log("Server running successfully in  3001");
     h();
     console.log(this.count); 
});