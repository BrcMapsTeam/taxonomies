import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class UploadPage extends Component {

    render(){
        return (<div>
                    <h1>Upload Page</h1>
                    <FormInput />
                    <div className="container">
                        <div className="NavButtonGreyed">Back</div>
                        <div className="NavButton" onClick={ this.props.nextStep() }>Next</div>
                    </div>
              </div>);
    }
}

class FormInput extends Component {

    render(){
        return (<div>
                    <input type="text" name="link" /><br /> 
                    <div className="FormLine"></div>
                </div>);

    }
}



export default UploadPage;