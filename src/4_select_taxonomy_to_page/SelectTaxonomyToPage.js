import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class SelectTaxonomyToPage extends Component {


    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Which taxonomy are you mapping <b>TO</b>?</div>
                    </div> 
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButton" onClick={this.props.nextStep()}>Next</div>
                    </div>
                </div>);
    }
}

export default SelectTaxonomyToPage;