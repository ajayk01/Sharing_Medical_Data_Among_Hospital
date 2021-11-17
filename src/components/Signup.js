import React,{Component}  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from 'axios';
import App from './App'

class Signup extends Component
  {
     sayHello()
    {
      new App().showelement_signup();
    }
    submit()
     {
         var name1 = document.getElementById("name1").value;
         var name2 = document.getElementById("name2").value;
         var email = document.getElementById("email").value;
         var pass = document.getElementById("password").value;
         var role = document.getElementById('role').selectedOptions[0].value;
         Axios.post("http://localhost:3001/insert", {
            name1 : name1, 
            name2 : name2,
            email : email,
            pass:pass,
            role : role
    }).then((res)=>{
        console.log(res);
        if(res.status==200)
          {
            alert("Profile Created Successfully You can Login now");
          }
          else 
          {
            alert("Profile not Created!! retry Later");
          }
      })
     }

     render(){
         return( <div>
<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0  shadow">
                    <a className="text-white navbar-brand col-sm-3 col-md-2 mr-0 mx-auto" 
                       target="_blank" rel="noopener noreferrer">
                        Medical Data Sharing using BlockChain
                    </a>
{/*                     
                    <span className="nav-item text-nowrap">
                        <small className="text-white"><strong></strong></small>
                    </span> */}
                </nav>
            <br/>
    <div class ="shadow p-3 mb-5 bg-white rounded w-50 p-3 mx-auto">
    <div class="card ">
      <h5 class="card-header "><div class="mx-auto">Sign-Up</div></h5>
        <div class="card-body"> 
        <form>
                                            

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label">First name</label>
                                                <div className="col-sm-12">
                                                <input type="text" id ="name1" className="form-control" placeholder="First name" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label">Last name</label>
                                                <div className="col-sm-12">
                                                <input type="text" className="form-control" id="name2" placeholder="Last name" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label">Email address</label>
                                                <div className="col-sm-12">
                                                <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label">Password</label>
                                                <div className="col-sm-12">
                                                <input type="password" className="form-control" id="password" placeholder="Enter password" />
                                                </div>
                                            </div>  
                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label">Role</label>
                                                <div className="col-sm-12">
                                                <select class="form-control" id="role">
                                                    <option value="Doctor">Doctor</option>
                                                    <option value="Patient">Patient</option>
                                                </select>
                                                </div>
                                            </div>  
                                            <button class="btn premium-button" onClick={this.submit}>Register</button>
            <div type="button" class="btn premium-button" onClick={this.sayHello}>Login</div>
                                        </form>
        </div>
       
    </div>
    </div>
    </div>
    
    )
  }
}
  export default Signup;
 
  {/* <div id="check">
                                        <form>
                                        <div className="form-group row">
                                            <label htmlFor="unitMarks"
                                                   className="col-sm-12 col-form-label">Search by Test ID:</label>
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control" id="PID"
                                                        placeholder="Enter Test ID" required
                                                       />
                                            </div>
                                        </div>
                                        <button type="button" onClick={this.fetchData} className="premium-button">
                                                Display
                                        </button>
                                        <u1>
                                        {       
                                        
                                                this.state.students.map(function(item, i){
                                                    
                                                    if(item.length>1){
                                                        let patientData = item.split("-");
                                                        let patientName = patientData[0];
                                                        patientName =patientName.split("null")[1]
                                                        
                                                        
                                                        
                                                        let patientID = patientData[1];
                                                        let patientStatus = patientData[2];
                                                        let blood = patientData[3];
                                                        let sugar = patientData[4];
                                                        let Surgeries = patientData[5];
                                                        let doctorname = patientData[6];
                                                        let hospitalname = patientData[7];
                                                        let date = patientData[8];
                                                        let id = document.getElementById("PID").value
                                                        if(patientID === id)
                                                        {
                                                        return <li key={i}>
                                                            <h2>Date : {date}</h2>
                                                            <h2>Patient Name: {patientName}</h2>
                                                            <h2>Test ID: {patientID}</h2>
                                                            <h2>Covid Test Result: {patientStatus}</h2>
                                                            <h2>Sugar: {sugar}</h2>
                                                            <h2>Blood: {blood}</h2>
                                                            <h2>Number od surgiers: {Surgeries}</h2>
                                                            <h2>Doctor Name: {doctorname}</h2>
                                                            <h2>Hospita Name: {hospitalname}</h2>
                                                        </li>
                                                        }
                                                        else
                                                        {
                                                            
                                                            if((i+1)>=count)
                                                            {
                                                                
                                                                return <h2> Not Found</h2>
                                                                        
                                                            }
                                                        }
                                                       
                                                    }
                                                    
                                                })

                                                
                                            }
                                            </u1>

                                        </form>

                                    </div> */}
