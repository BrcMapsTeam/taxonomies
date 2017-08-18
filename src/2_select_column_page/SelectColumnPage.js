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
            <div className="NavigationContainer">
              <a className="NavButton" onClick={this.props.previousStep()}>Back</a>
              <a className="NavButtonGreyed">Next</a>
            </div>
            </div>;
    }
}


export default SelectColumnPage;