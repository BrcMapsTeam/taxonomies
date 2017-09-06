import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';


class MapProcessPage extends Component {
    constructor(props){
        super(props);

    }


    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>

                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButtonGreyed" >Next</div>
                    </div>
                </div>);
    }
}



export default MapProcessPage;