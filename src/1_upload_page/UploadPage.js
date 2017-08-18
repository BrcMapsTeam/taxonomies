import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class UploadPage extends Component {

    render(){
        return (<div>
                <h1>Upload Page</h1>
                <a className="NavButtonGreyed">Back</a>
                <a className="NavButton" onClick={ this.props.nextStep() }>Next</a>
              </div>);
    }
}


export default UploadPage;