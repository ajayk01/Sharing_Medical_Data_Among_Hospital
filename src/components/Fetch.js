import React,{Component}  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import Axios from 'axios';
import './function';
import Viewpdf from './Viewpdf';
import ReactDOM from 'react-dom';
import Table from './Table'
var random=0;
var ress;
var length=0;
let arrButtons=[];
class Fetch extends Component
  {
    constructor(props) {
      super(props);
      this.state = {
           table:false
      }
      
    }
    sayHello()
    {
      new App().showelement_signup();
    }
    fetch_show()
    {
        new App().showelement_fetch();
        document.getElementById("root2").style.display="none";
    }
    upload_show()
    {
        new App().showelement_upload();
        document.getElementById("root2").style.display="none";
    }
    search()
     {
         var email = document.getElementById("patientid").value;
         
         Axios.post("http://localhost:3001/fetchdata", {
            email : email
    }).then((res)=>{
      
      console.log(res);
       if(res.status==200)
        {
           ress=res;
           length = Object.keys(ress.data.role).length
           console.log(length);
           if(!length==1){
             console.log("inside");
             console.log(res.data.role);
            document.getElementById("tbody").innerHTML+=' <tr> <th>'+res.data.role.date+'</th> <th>'+ress.data.role.Pat_id+'</th>  <th>'+res.data.role.Pat_name+'</th> <th>'+res.data.role.sugar_level+'</th> <th>'+res.data.role.blood_pressure+'</th> <th>'+res.data.role.vaccine_type+'</th><th>'+res.data.role.surgery_name+'<th>'+res.data.role.Doc_name+'</th> <th>'+res.data.role.Hos_name+'</th> </tr>';
           }
           else
           for(let i=0;i<length;i++)                                                                                                                                                                                                                                                                                        
               document.getElementById("tbody").innerHTML+=' <tr> <th>'+res.data.role[i].date+'</th> <th>'+res.data.role[i].Pat_id+'</th>  <th>'+res.data.role[i].Pat_name+'</th> <th>'+res.data.role[i].sugar_level+'</th> <th>'+res.data.role[i].blood_pressure+'</th> <th>'+res.data.role[i].vaccine_type+'</th> <th>'+res.data.role[i].surgery_name+'</th> <th>'+res.data.role[i].Doc_name+'</th> <th>'+res.data.role[i].Hos_name+'</th> </tr>';
           
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
           email :  document.getElementById("patientid").value,
        }).then((res) =>{
          console.log(res.status);
         
        });
      }

       hiii(i) {
        console.log("hi "+i);
        if(i==1)
         {
          
         new Viewpdf().filechange(ress.data.role.vaccine_doc,0);
         new App(). showelement_pdf();
         }
         else if(i==2)
          {
            new Viewpdf().filechange(ress.data.role.surgery_doc,0);
            new App(). showelement_pdf();
          }
          else if(i==3)
          {
            new Viewpdf().filechange(ress.data.role.report,0);
            new App().showelement_pdf();
          }
      }
      otp_auth()
       {
        // document.getElementById('tt').style.display="block";
         console.log(random);
         console.log(document.getElementById("otp").value);
         console.log(ress.data.role);

         //document.getElementById('tt').style.display="block";
         
         //new App().rend();
         if(random==document.getElementById("otp").value)
          {
            length = Object.keys(ress.data.role).length
            console.log(length);
            console.log(ress.data.role.length)
            document.getElementById("root2").style.display="block";
            new Table().load(ress,0);
            ReactDOM.render(<Table />, document.getElementById('root2'));
            console.log(length);
            new App().rend();
          }
          else
          {
            alert("Try again");
          }
       }
       
    render(){
      let j=1;
      for (let i = 0; i <= length; i++) { //Moved your loop outside render()'s return
        arrButtons.push(<tr><th> Vaccine Doc</th><th><button  onClick={() => this.hiii(1)}>view PDF-1</button></th></tr>)
        j++;
        arrButtons.push(<tr><th> Surgery Doc</th><th><button  onClick={() => this.hiii(2)}>View PDF-2</button></th></tr>)
        j++;
        arrButtons.push(<tr><th>Report</th><th><button onClick={() => this.hiii(3)}>View PDF-3</button></th></tr>)
      }
        return(
            <div class="container">
                  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" 
                       target="_blank" rel="noopener noreferrer">
                       <div class="btn btn-light" onClick={this.fetch_show}> Fetch </div> &nbsp;
                       <div class="btn btn-light"  onClick={this.upload_show}> Upload </div>
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
                                                    <input type="text" className="form-control" id="patientid"
                                                        placeholder="Enter Patient Email!" required
                                                      onChange={this.updateName}
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
  <tbody id="tbody">
  
  </tbody>
</table>
            </div>
            </div>
            <div class="justify-content-end">
            <div className="form-group row">  <div class="col-sm-2"> <button type="button"  onClick={this.auth} className="btn btn-info">Authendicate</button> </div>
                                                <div class="col-sm-2">
                                                <input type="number" className="form-control" id="otp" placeholder="Enter OTP" required />
                                                </div>
                                                <div className="col-sm-8">
                                                <button type="button"  onClick={this.otp_auth} className="btn btn-info">Verify</button> </div>
                                                </div>
                                                
            </div> <br/>
            {/* <div class ="shadow p-3 mb-5 bg-white rounded  p-1 mx-auto" id="tt"  style={{ display: this.state.table ? "block" : "none" }}>
                <div class="card">
                    <div class="card-header">Additional Details</div>
                      <table class="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Document</th>
                            </tr>
                          </thead>
                          <tbody id="tbody-add">
                              {arrButtons}
                          </tbody>
                      </table>
            </div>
            </div> */}
            </div>
            
            
        )
    }
  }
  export default Fetch;