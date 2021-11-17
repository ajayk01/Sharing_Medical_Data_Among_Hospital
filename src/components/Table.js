import  React,{Component} from 'react';
import  Viewpdf from './Viewpdf';

import App from './App';
var ress;
var length = 1;
var s="";
var i=0;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login : true,
        
    }
   
}
load(res,j)
 {
     i=j;
    ress =res;
    length = Object.keys(ress.data.role).length;
    console.log(length);
 }

hiii(k)
 {
    new Viewpdf().filechange(k,i);
    new App().showelement_pdf();
 }
  render() {
    console.log("rendering")
    let arrButtons1=[];
    console.log(arrButtons1)
      if(!length==1)
       {
            s="Report_"+ress.data.role.date;
            console.log(s);
            arrButtons1.push(<tr><th>{ress.data.role.vaccine_type}</th><th><button  onClick={() => this.hiii(ress.data.role.vaccine_doc)}>view PDF-1</button></th></tr>)
            arrButtons1.push(<tr><th>{ress.data.role.surgery_name}</th><th><button  onClick={() => this.hiii(ress.data.role.surgery_doc)}>View PDF-2</button></th></tr>)
            arrButtons1.push(<tr><th>{s}</th><th><button onClick={() => this.hiii(ress.data.role.report)}>View PDF-3</button></th></tr>)
        }   
    else{
      for (let i = 0; i < length; i++) { //Moved your loop outside render()'s return
        s="Report_"+ress.data.role[i].date;
        console.log("---- "+s);
        arrButtons1.push(<tr><th>{ress.data.role[i].vaccine_type}</th><th><button  onClick={() => this.hiii(ress.data.role[i].vaccine_doc)}>view PDF-1</button></th></tr>)
        arrButtons1.push(<tr><th>{ress.data.role[i].surgery_name}</th><th><button  onClick={() => this.hiii(ress.data.role[i].surgery_doc)}>View PDF-2</button></th></tr>)
        arrButtons1.push(<tr><th>{s}</th><th><button onClick={() => this.hiii(ress.data.role[i].report)}>View PDF-3</button></th></tr>)
      }
    }
    return (
      <div>
          <div class ="shadow p-3 mb-5 bg-white rounded  p-1 mx-auto" id="tt-1"  style={{ display: this.state.login ? "block" : "none" }}>
                <div class="card">
                    <div class="card-header">Additional Details</div>
                      <table class="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Document</th>
                            </tr>
                          </thead>
                          <tbody id="tbody-add111">
                             {arrButtons1}
                          </tbody>
                      </table>
            </div>
            </div>
      </div>
    );
  }
}


export default Table;