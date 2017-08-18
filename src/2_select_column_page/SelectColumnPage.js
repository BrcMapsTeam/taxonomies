import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../index.css';

class SelectColumnPage extends Component {
    goBack(e) {
        e.preventDefault();
        this.props.previousStep();
    }

    render(){
        return <div><h1>Column</h1>
              <button onClick={         this.props.previousStep()}>Save and Continue</button>
              </div>;
    }
}


export default SelectColumnPage;