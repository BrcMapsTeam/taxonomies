import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../index.css';

class UploadPage extends Component {

    render(){
        return (<div>
                <h1>Upload Page</h1>
                <button onClick={ this.props.nextStep() }>Save and Continue</button>
              </div>);
    }
}


export default UploadPage;