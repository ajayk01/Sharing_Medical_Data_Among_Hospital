

import  React,{Component} from 'react';
import  Fetch from './Fetch';
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  Inject,
} from '@syncfusion/ej2-react-pdfviewer';
import App from './App';
let i=0;
let filen ="";
class Viewpdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login : false,
        
    }
    this.filechange = this.filechange.bind(this)
}


filechange(filename,j)
{
  document.getElementById("root1").style.display="block";
  filen = filename;
  i=j;
  console.log("i is :"+i);
  console.log(filen);
 
 this.state.login=filen;
  console.log("Updated");
}
back()
 {
  document.getElementById("root2").style.display="block";
  console.log("i is :"+i);
   if(i==0)
   new App().back();
   else
   new App().back_pat();
  
 }
  render() {
    console.log("rendering")
    document.getElementById("root2").style.display="none";
    return (
      <div>
         <button onClick={this.back}> Back </button> 
        <div className="control-section">
          <PdfViewerComponent
            id="container"
            documentPath={filen}
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer"
            
          >
            <Inject
              services={[
                Toolbar,
                Magnification,
                Navigation,
                LinkAnnotation,
                BookmarkView,
                ThumbnailView,
                Print,
                TextSelection,
                TextSearch,
                Annotation,
                FormFields,
              ]}
            />
          </PdfViewerComponent>
         
        </div>
       
      </div>
    );
  }
}


export default Viewpdf;