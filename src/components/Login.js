import React,{Component}  from 'react';
import Axios from 'axios';
import './App.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import Fetch_pat from './Fetch_pat';
 
class Login extends Component
  {
    show()
    {
      new App().showelement_login();
    }
    submit() {
     
      var email =(document.getElementById("username").value);
      var password = (document.getElementById("pass").value);
      Axios.post("http://localhost:3001/readuser", {
            email : email,
            password:password,
    }).then((res)=>{
      console.log(res);
       
        
        if(res.status==200)
          {
            if(res.data.role.role=="Doctor")
            {
              
            new App().showelement_upload();
            }
            else
             {
              
               new Fetch_pat().update_e(res.data.role.email)
              new App().showelement_fetch_pat();
             }
          }
          else if(res.status==501)
          {
            alert("Profile not Created!! retry Later");
          }
        
      })
    }
      render() {
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
    <div class ="shadow p-3 mb-5 bg-white rounded w-25 p-3 mx-auto">
    <div class="card ">
      <h5 class="card-header "><div class="mx-auto">Login</div></h5>
        <div class="card-body"> 
        <form id="form_login">
            <div className="form-group row">
            <label htmlFor="username"
                       className="col-sm-12 col-form-label">Email ID:</label>
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="username"
                            placeholder="Enter Email ID"
                           />
                </div>
                <label htmlFor="password"
                       className="col-sm-12 col-form-label">Password:</label>
                <div className="col-sm-12">
                    <input type="password" className="form-control" id="pass"
                          placeholder="Enter Password"/>
                </div>
            </div>
           
        </form>
        <button class="btn premium-button" onClick={this.submit} >Submit</button>
            <button type="button" 
                    class="btn premium-button" onClick={this.show}>Sign up
            </button>
        </div>
        
    </div>
    </div>
    </div>
    )
  }
}
  export default Login;
