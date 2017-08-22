import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class SelectColumnPage extends Component {
    goBack(e) {
        e.preventDefault();
        this.props.previousStep();
    }

    render(){
        return <div><h1>Column</h1>
            <div className="container">
              <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
              <div className="NavButtonGreyed">Next</div>
            </div>
            </div>;
    }
}


export default SelectColumnPage;