import React, { Component,useState } from 'react';
import Web3 from 'web3';
import './App.css';
import File from '../abis/File.json';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import App from './App'
import Axios from 'axios';

let count = 0;

let encrypted;

class Upload extends Component {
    constructor(props) {
        // fileInput = React.createRef();
       
        super(props);
        this.state = {
            upload_div:false,
            pat_id:0,
            fileInput:'',
            account: '',
            authenticated: false,
            signup: false,
            contract: null,
            status: "Not Uploaded",
            patientName: '',
            patientStatus: '',
            patientID: '',
            blood_pressure: '',
            sugar_level: '',
            data: '',
            students: [],
            password: '',
            numberofsurgeries: '',
            hospitalname: '',
            doctorname: '',
            count: 0,
            selectedFile: ''
        }
    }
    sayHello() {
        new App().showelement_signup();
    }
    fetch_show() {
        new App().showelement_fetch();
    }
    upload_show() {
        new App().showelement_upload();
    }
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockChainData();
        await this.fetchData();
    }
    async loadBlockChainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const networkId = await web3.eth.net.getId();
        const networkData = File.networks[networkId];
        if (networkData) {
            const abi = File.abi;
            const address = networkData.address;
            // Fetch smart contract
            const contract = web3.eth.Contract(abi, address);
            this.setState({ contract });
        } else {
            window.alert('Smart contract not deployed to detected network');
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Please install MetaMask!')
        }
    }
    updatenumberofsurgeries = (e) => {
        e.preventDefault();
        this.setState({ numberofsurgeries: e.target.value });

    };

    updatedoctorname = (e) => {
        e.preventDefault();


        this.setState({ doctorname: e.target.value });

    };

    updatehospitalname = (e) => {
        e.preventDefault();


        this.setState({ hospitalname: e.target.value });

    };

    updateName = (e) => {
        e.preventDefault();


        this.setState({ patientName: e.target.value });

    };


    updateStatus = (e) => {
        e.preventDefault();
        this.setState({ patientStatus: e.target.value });
    };

    updateID = (e) => {
        e.preventDefault();
        this.setState({ patientID: e.target.value });
    };

    updateSugar = (e) => {
        e.preventDefault();
        this.setState({ sugar_level: e.target.value });
    };

    updateBlood = (e) => {
        e.preventDefault();
        this.setState({ blood_pressure: e.target.value });
    };

    updatePassword = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let name = this.state.patientName;
        let ID = this.state.patientID;
        let status = this.state.patientStatus;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state.data = this.state.data + name + "-" + ID + "-" + status + "-" + this.state.blood_pressure + "-" + this.state.sugar_level +
            "-" + this.state.numberofsurgeries + "-" + this.state.doctorname + "-" + this.state.hospitalname + "-" + date + ":";
        console.log(this.state.data);
        //encrypted =CryptoJS.AES.encrypt(this.state.data, '123wredfsdf').toString();
        //console.log(encrypted);
        ToastsStore.warning("Adding data to Blockchain...");

        count = count + 1;
        // Store data on Blockchain
        this.state.contract.methods.set(this.state.data).send({ from: this.state.account }).on("confirmation", (r) => {
            console.log("Data stored on Blockchain...");
            ToastsStore.success("Data stored successfully!");
        });
        Axios.post("http://localhost:3001/uploaddata", {
            pat_name: document.getElementById("Name").value,
           pat_id: document.getElementById("patientID").value,
           doc_name: document.getElementById("doc_name").value,
           hos_name: document.getElementById("hos_name").value,
           sugar_level: document.getElementById("sugarLevel").value,
           blood_pressure: document.getElementById("blood_pressure").value,
          vaccine_type: document.getElementById("covid_type").value,
          surgery_name: document.getElementById("surgery_name").value,
          pat_email : document.getElementById("pat_email").value
         
    }).then((res)=>{
        console.log(res.status);
    });
    };

    reset = () => {
        this.state.data = "";
        ToastsStore.warning("Resetting data...");

        // // Reset data on Blockchain
        // this.state.contract.methods.set(this.state.data).send({ from: this.state.account }).on("confirmation", (r) => {
        //     console.log("Data reset on Blockchain...");
        //     ToastsStore.success("Data reset successfull!");
       // });
    };

    fetchData = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.state.contract.methods.get().call().then((v) => {
            console.log("Data fetched from Blockchain...");
            this.setState({ data: v, status: "Data Loaded!" });
            console.log(this.state.data);
            ToastsStore.success("Data fetched successfully!");
        });
        this.updateData();
    };

    updateData = () => {
        //this.state.data= this.state.data+" ";
        let data;
        let i;
        let patientID_ = "Not Found";
        let patientCode_ = "Not Found";
        let patientStatus_ = "Not Found";
        let blood = "-";
        let sugar = "-";
        let doctorname = "-";
        let hospitalname = "-";
        let numberofsurgeries = "-";
        let date = "";
        //var bytes  = CryptoJS.AES.decrypt(encrypted, '123wredfsdf');
        //var originalText = bytes.toString(CryptoJS.enc.Utf8);

        try {
            data = this.state.data.split(":");

            this.state.students = this.state.data.split(":");

            let patientData = data[0].split("-");
            patientID_ = patientData[0];
            patientCode_ = patientData[1];
            patientStatus_ = patientData[2];
            blood = patientData[3];
            sugar = patientData[4];
            numberofsurgeries = patientData[5];
            doctorname = patientData[6];
            hospitalname = patientData[7];
            date = patientData[8];
            //originalText=data[0];
        }
        catch (err) {
            console.log(data);
        }
        this.setState({ patientID_, patientCode_, patientStatus_, blood, sugar, numberofsurgeries, doctorname, hospitalname, date });
    };

    openPage(pageName, elmnt, color) {
        console.log("funvctionnnn.....");
        pageName = "add";
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        if (pageName == null) {
            document.getElementById(pageName).style.display = "block";
            elmnt.style.backgroundColor = color;


            document.getElementById("defaultOpen").click();
        }
    }
    add_surgery = () => {
        document.getElementById("append").innerHTML += '<div class="form-group row"><div class="col-md-4"> <label htmlFor="testResult"  class="col-form-label">Surgery Name:</label></div> <div class="col-sm-8"> <input type="text" class="form-control" id="testResult"  placeholder="Enter Number of Surgeries!" required onChange={this.updatenumberofsurgeries}/></div></div><div class="form-group row"><div class="col-md-4"><label htmlFor="testResult" class="col-form-label">Surgery Report:</label></div><div class="col-sm-8"><input type = "file"  />  </div> </div>';
    }
    
    search()
     {
         var email = document.getElementById("patientemail").value;
         
         Axios.post("http://localhost:3001/readpat", {
            email : email
    }).then((res)=>{
       if(res.status==200)
        {
           console.log(res.data.role);
           console.log(res.data.role.id);
           console.log(res.data.role.name1);
           document.getElementById("Name").value =res.data.role.name1;
          
           document.getElementById("patientID").value =res.data.role.id;
           document.getElementById("pat_email").value=res.data.role.email;
          // console.log(this.pat_name);
           document.getElementById("upload_div").style.display="block";
           document.getElementById("search_div").style.display="none";
        }
        else
         {
             alert("The entered email id is not registerd pls create profile for the  patient");
         }
    });
     }
      FileUploadPage(event){
          
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          }).then((data)=>{ console.log(data) 
            Axios.post("http://localhost:3001/vaccine", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
                 data : data,
    });
        });
         
         
	};

    surgery(event){
        console.log(event.target.files[0]);
        console.log(event.target.files[0].name);
         new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        }).then((data)=>{ console.log(data) 
          Axios.post("http://localhost:3001/surgery", {
          data : data
  });
      }
        );
       
  };
  report(event){
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
     new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then((data)=>{ console.log(data) 
      Axios.post("http://localhost:3001/report", {
      data : data
});
  }
    );
   
};
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0"
                        target="_blank" rel="noopener noreferrer">
                        <div class="btn btn-light" onClick={this.fetch_show}> Fetch </div> &nbsp;
                        <div class="btn btn-light" onClick={this.upload_show}> Upload </div>
                    </a>

                    <span className="nav-item mx-auto">
                        <strong className="text-white">Medical Data Sharing using BlockChain</strong>
                    </span>
                </nav>
                <br /> <br />
                <div className="container">
                <div class ="shadow p-3 mb-5 bg-white rounded  mx-auto" id="search_div">
                    <div class="card">
                    <h5 class="card-header"><div class="mx-auto">Search Paitent</div></h5>
                    <div class="card-body">
                    <form >
                                             <div className="form-group row">
                                                <div class="col-sm-2">
                                                    <label htmlFor="patientEmail" className="col-form-label">Patient Email</label>
                                                </div>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="patientemail"
                                                        placeholder="Enter Patient Email!" required
                                                      
                                                      />
                                                </div>
                                                </div>
                    </form>
                    <button type="button"  className="btn btn-info d-flex justify-content-center mx-auto" onClick={this.search}>Submit  </button> <br />
                    </div>
                    </div>
                  </div>
                    <ToastsContainer store={ToastsStore} />
                    <div class="shadow p-3 mb-5 bg-white rounded  mx-auto" id="upload_div" style={{ display: this.state.upload_div ? "block" : "none" }}>
                        <div class="card ">
                            <h5 class="card-header"><div class="mx-auto">Upload the Medical Data</div></h5>
                            <div class="card-body">
                                <form id="form_id">
                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="patientName" className="col-form-label">Patient Name:</label>
                                        </div>
                                        <div className="col-sm-8">
                                        <input type="text" className="form-control" id="Name"
                                                 required
                                                 disabled />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="patientName" className="col-form-label">Patient Email:</label>
                                        </div>
                                        <div className="col-sm-8">
                                        <input type="text" className="form-control" id="pat_email"
                                                 required
                                                 disabled />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Doctor Name:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="doc_name"
                                                value={this.state.doctorname} placeholder="Enter Doctor Name!" required
                                                onChange={this.updatedoctorname} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Hospital Name:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="hos_name"
                                                value={this.state.hospitalname} placeholder="Enter Hospital Name!" required
                                                onChange={this.updatehospitalname} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="PatientID"
                                                className="col-form-label">Patient ID:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="patientID"
                                                placeholder="Enter Patient ID!" required
                                                onChange={this.updateID} disabled />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Sugarlevel:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="sugarLevel"
                                                value={this.state.sugar_level} placeholder="Enter Sugar Level" required
                                                onChange={this.updateSugar} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Blood Pressure:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="blood_pressure"
                                                value={this.state.blood_pressure} placeholder="Enter Blood pressure!" required
                                                onChange={this.updateBlood} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Covid Vaccination Type:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="covid_type"
                                                value={this.state.patientStatus} placeholder="Enter The Vaccine Type" required
                                                onChange={this.updateStatus} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Vaccination Report:</label></div>
                                        <div className="col-sm-8">
                                            <input type="file"  onChange={this.FileUploadPage}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Surgery Name:</label></div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="surgery_name"
                                                value={this.state.numberofsurgeries} placeholder="Enter the Surgery Name" required
                                                onChange={this.updatenumberofsurgeries} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Surgery Report:</label></div>
                                        <div className="col-sm-8">
                                            <input type="file" onChange={this.surgery} />
                                        </div>

                                    </div>

                                    <div id="append">

                                    </div>


                                    <div className="form-group row">
                                        <div class="col-md-4">
                                            <label htmlFor="testResult"
                                                className="col-form-label">Upload Report:</label> </div>
                                        <div className="col-sm-8">
                                            <input type="file" id="testResult"
                                                value={this.state.patientreport} placeholder="Upload Report!"
                                                onChange={this.report} />
                                        </div>
                                    </div>

                                    <div class="row">
                                        {/* <div class="col">
                                             <button type="button" onClick={this.add_surgery}
                                                className="premium-button">Add-Surgery
                                            </button> 
                                        </div> */}
                                        <div class="col">
                                            <button type="button" onClick={this.onSubmit}
                                                className="premium-button">Submit
                                            </button>
                                        </div>
                                        <div class="col">
                                            <button type="button" onClick={this.reset}
                                                className="premium-button">Reset Data
                                            </button>
                                        </div>
                                    </div>





                                </form>

                            </div>
                        </div>

                    </div>
                    <br />
                </div>
            </div>
        );
    }
}
export default Upload;
