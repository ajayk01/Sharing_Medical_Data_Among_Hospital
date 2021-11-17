import React,{Component}  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import Axios from 'axios';
import './function';
import Viewpdf from './Viewpdf';
import ReactDOM from 'react-dom';
import Table from './Table';
let arrButtons=[];
var random=0;
var ress;
var length=0;
var e="";
class Fetch_pat extends Component
  {
    constructor(props) {
      super(props);
      this.state = {
           table:false
      }
      
    }
    update_e(email)
    {

      e=email;
      document.getElementById("patientid-1").value = email;
      console.log(document.getElementById("patientid-1").value);
    }
    sayHello()
    {
      new App().showelement_signup();
    }
    fetch_show()
    {
        new App().showelement_fetch();
    }
    upload_show()
    {
        new App().showelement_upload();
    }
    search()
     {
         var email =document.getElementById("patientid-1").value;
         
         Axios.post("http://localhost:3001/fetchdata", {
            email : email
    }).then((res)=>{
      
      console.log(res);
       if(res.status==200)
        {
           ress=res;
           length = Object.keys(ress.data.role).length
           if(!length==1)
           document.getElementById("tbody10").innerHTML+=' <tr> <th>1</th> <th>'+res.data.role.Pat_id+'</th>  <th>'+res.data.role.Pat_name+'</th> <th>'+res.data.role.sugar_level+'</th> <th>'+res.data.role.blood_pressure+'</th> <th>'+res.data.role.vaccine_type+'</th><th>'+res.data.role.surgery_name+'<th>'+res.data.role.Doc_name+'</th> <th>'+res.data.role.Hos_name+'</th> </tr>';
           else
           for(let i=0;i<length;i++)                                                                                                                                                                                                                                                                                        
               document.getElementById("tbody10").innerHTML+=' <tr> <th>'+res.data.role[i].date+'</th> <th>'+res.data.role[i].Pat_id+'</th>  <th>'+res.data.role[i].Pat_name+'</th> <th>'+res.data.role[i].sugar_level+'</th> <th>'+res.data.role[i].blood_pressure+'</th> <th>'+res.data.role[i].vaccine_type+'</th> <th>'+res.data.role[i].surgery_name+'</th> <th>'+res.data.role[i].Doc_name+'</th> <th>'+res.data.role[i].Hos_name+'</th> </tr>';
           console.log("finished");
          // console.log(this.pat_name);
           
        }
        else
         {
             alert("The entered email id is not registerd pls create profile for the  patient");
         }
    });
     }
    
     auth()
      {
        const min = 1;
        const max = 100000;
        random = (min + (Math.random() * (max - min))).toFixed();
        Axios.post("http://localhost:3001/auth",{
           otp : random,
           email :  document.getElementById("patientid-1").value,
        }).then((res) =>{
          console.log(res.status);
         
        });
      }

       hiii(i) {
        console.log("hi "+i);
        if(i==1)
         {
          
         new Viewpdf().filechange(ress.data.role.vaccine_doc,1);
         new App().showelement_pdf();
         }
         else if(i==2)
          {
            new Viewpdf().filechange(ress.data.role.surgery_doc,1);
            new App().showelement_pdf();
          }
          else if(i==3)
          {
            new Viewpdf().filechange(ress.data.role.report,1);
            new App().showelement_pdf();
          }
      }
      otp_auth()
       {
        // document.getElementById('tt').style.display="block";
         console.log(random);
         console.log(document.getElementById("otp-1").value);
         console.log(ress.data.role[0]);
        if(random==document.getElementById("otp-1").value)
          {
            
            document.getElementById("root2").style.display="block";
            //document.getElementById('tt-1').style.display="block";
            length = Object.keys(ress.data.role).length
         console.log(length);
         console.log(ress.data.role.length)
         new Table().load(ress,1);
         ReactDOM.render(<Table />, document.getElementById('root2'));
        
         let j=1;
      
         new App().rend_1();
          }
          else
          {
            alert("Try again");
          }
       }
       
    render(){
     
      
        return(
            <div class="container">
                  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" 
                       target="_blank" rel="noopener noreferrer">
                      {/* // <div class="btn btn-light" onClick={this.fetch_show}> Fetch </div> &nbsp; */}
                       {/* <div class="btn btn-light"  onClick={this.upload_show}> Upload </div> */}
                    </a>
                    
                    <span className="nav-item mx-auto">
                        <strong className="text-white">Medical Data Sharing using BlockChain</strong> 
                    </span> 
                </nav>
                 <br /> <br /> <br />
                 <div class ="shadow p-3 mb-5 bg-white rounded  mx-auto">
                    <div class="card">
                    <h5 class="card-header"><div class="mx-auto">Search Paitent Details</div></h5>
                    <div class="card-body">
                    <form >
                                             <div className="form-group row">
                                                <div class="col-sm-2">
                                                    <label htmlFor="patientName" className="col-form-label">Patient Email</label>
                                                </div>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="patientid-1"
                                                        placeholder="Enter Patient Email!" required disabled
                                                    
                                                      />
                                                </div>
                                                </div>
                    </form>
                    <button type="button"  className="btn btn-info d-flex justify-content-center mx-auto" onClick={this.search}>Submit  </button> <br />
                    </div>
                    </div>
                  </div>
                 <div class ="shadow p-3 mb-5 bg-white rounded  p-1 mx-auto">
                <div class="card">
                    <div class="card-header">Patient Details</div>
                 <table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Patient ID</th>
      <th scope="col">Patient Name</th>
      <th scope="col">Sugar Level</th>
      <th scope="col">Blood Pressure</th>
      <th scope="col">Covid Result</th>
      <th scope="col">Surgery Done</th>
      <th scope="col">Doctor Name</th>
      <th scope="col">Hospital Name</th>
    </tr>
  </thead>
  <tbody id="tbody10">
 
  </tbody>
</table>
            </div>
            </div>
            <div class="justify-content-end">
            <div className="form-group row">  <div class="col-sm-2"> <button type="button"  onClick={this.auth} className="btn btn-info">Authendicate</button> </div>
                                                <div class="col-sm-2">
                                                <input type="number" className="form-control" id="otp-1" placeholder="Enter OTP" required />
                                                </div>
                                                <div className="col-sm-8">
                                                <button type="button"  onClick={this.otp_auth} className="btn btn-info">Verify</button> </div>
                                                </div>
                                                
            </div> <br/>
            {/* <div class ="shadow p-3 mb-5 bg-white rounded  p-1 mx-auto" id="tt-1"  style={{ display: this.state.table ? "block" : "none" }}>
                <div class="card">
                    <div class="card-header">Additional Details</div>
                      <table class="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Document</th>
                            </tr>
                          </thead>
                          <tbody id="tbody-add1">
                             
                          </tbody>
                      </table>
            </div>
            </div> */}
            </div>
            
            
        )
    }
  }
  export default Fetch_pat;