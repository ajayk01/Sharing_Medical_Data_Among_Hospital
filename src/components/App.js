// import logo from './logo.svg';
import React,{Component}  from 'react';
import './App.css';
import  Signup  from './Signup'
import Login from './Login'
import Upload from './Upload'
import Fetch from './Fetch'
import Fetch_pat from './Fetch_pat'
import Viewpdf from './Viewpdf'
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom';

 class App extends Component
 {
  constructor(props) {
    super(props);
    this.state = {
        login : true,
        signup :false,
        fetch:false,
        upload:false,
        fetch_pat:false,
        view:false
    }
}
showelement_fetch_pat()
{
  document.getElementById("signup").style.display="none";
  document.getElementById("login").style.display="none";
  document.getElementById("upload").style.display="none";
  document.getElementById("fetch_pat").style.display="block";
  document.getElementById("fetch").style.display="none";
  document.getElementById("view").style.display="none";
}
  showelement_signup()
  {
    
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="none";
    document.getElementById("view").style.display="none";

    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("fetch_pat").style.display="none";
  }
  showelement_fetch()
  {
    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="block";
    document.getElementById("fetch_pat").style.display="none";
    document.getElementById("view").style.display="none";
  }
  showelement_upload()
  {
    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("upload").style.display="block";
    document.getElementById("fetch").style.display="none";
    document.getElementById("fetch_pat").style.display="none";
    document.getElementById("view").style.display="none";
  }
  showelement_login()
  {
    
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="none";
    document.getElementById("view").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="block";
    document.getElementById("fetch_pat").style.display="none";
  }
  showelement_pdf()
  {
    
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="none";
    document.getElementById("view").style.display="block";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="none";
    document.getElementById("fetch_pat").style.display="none";
    ReactDOM.render(<Viewpdf />, document.getElementById('root1'));
  }
  back()
  {
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="block";
    document.getElementById("view").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="none";
    document.getElementById("fetch_pat").style.display="none";
    document.getElementById("root1").style.display="none";
  }
  back_pat()
  {
     
    document.getElementById("upload").style.display="none";
    document.getElementById("fetch").style.display="none";
    document.getElementById("view").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="none";
    document.getElementById("fetch_pat").style.display="block";
    document.getElementById("root1").style.display="none";
  }
  rend()
   {
     //ReactDOM.render(<Fetch />, document.getElementById('root1'));
   }
   rend_1()
   {
    // ReactDOM.render(<Fetch_pat />, document.getElementById('root'));
   }
   render(){
     if(!this.state.view) {
       console.log("iff");
     return(<> <br></br>
      <div id="signup" style={{ display: this.state.signup ? "block" : "none" }}>
      <Signup />
      </div> 
      <div id="login"  style={{ display: this.state.login ? "block" : "none" }}>
      <Login />
      </div> 
      <div id="fetch"  style={{ display: this.state.fetch ? "block" : "none" }}>
      <Fetch />
      </div>
      <div id="fetch_pat"  style={{ display: this.state.fetch_pat ? "block" : "none" }}>
      <Fetch_pat />
      </div>
      <div id="upload"  style={{ display: this.state.upload ? "block" : "none" }}>
      <Upload />
      </div>
      <div id="view"  style={{ display: this.state.view ? "block" : "none" }}>
      
      </div></>   
  )
     }
     else{
       console.log("inside ele")
      return(
    <> <br></br>
    <div id="signup" style={{ display: this.state.signup ? "block" : "none" }}>
    <Signup />
    </div> 
    <div id="login"  style={{ display: this.state.login ? "block" : "none" }}>
    <Login />
    </div> 
    <div id="fetch"  style={{ display: this.state.fetch ? "block" : "none" }}>
    <Fetch />
    </div>
    <div id="fetch_pat"  style={{ display: this.state.fetch_pat ? "block" : "none" }}>
    <Fetch_pat />
    </div>
    <div id="upload"  style={{ display: this.state.upload ? "block" : "none" }}>
    <Upload />
    </div>
    <div id="view"  style={{ display: this.state.view ? "block" : "none" }}>
    
    </div></>   
  );
      }
    }
}

export default App;

