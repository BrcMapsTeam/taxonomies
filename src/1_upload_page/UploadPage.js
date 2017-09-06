import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

//test link: https://proxy.hxlstandard.org/data.json?url=https%3A//docs.google.com/spreadsheets/d/1x30JatnFHEqEQx2Nm9NQhlHlYL2Kml-84v9plgO1RcY/edit%23gid%3D1339100966
//goo.gl/VvNwF9

//componentDidMount(){
//    let nextButton = document.getElementById("loadFile");     
//    AttachEvent(nextButton, "click", getUserLink);
//}


class UploadPage extends Component {

    render(){
        console.log(this);
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Link to dataset you wish to map (example: <a href="http://goo.gl/VvNwF9">Link</a>):</div>
                    </div> 
                    <div className="flex-row">
                        <FormInput handleLinkChange={this.props.handleLinkChange} link={this.props.link}/>
                    </div>
                    <div className="flex-row">
                        <div className="NavButtonGreyed">Back</div>
                        <div id="loadFile" className="NavButton" onClick={this.props.nextAndSave} >Next</div>
                    </div>
              </div>);
    }
}

class FormInput extends Component {
    render(){
        return (<div>
                    <input type="text" name="link" id="data_link" value={this.props.link} onChange={this.props.handleLinkChange}/><br /> 
                    <div className="FormLine"></div>
                </div>);
    }
}


export default UploadPage;