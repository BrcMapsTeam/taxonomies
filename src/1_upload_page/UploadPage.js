import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class UploadPage extends Component {

    render(){
        return (<div className="flex-page">
                    <h1 className="flex-row">Upload Page</h1>
                    <div className="flex-row">
                        <div>Link to dataset you wish to map:</div>
                    </div> 
                    <div className="flex-row">
                        <FormInput />
                    </div>
                    <div className="flex-row">
                        <div className="NavButtonGreyed">Back</div>
                        <div className="NavButton" onClick={ this.props.nextStep() }>Next</div>
                    </div>
              </div>);
    }
}

class FormInput extends Component {

    render(){
        return (<div>
                    <input type="text" name="link" id="data-link" /><br /> 
                    <div className="FormLine"></div>
                </div>);
    }
}



export default UploadPage;