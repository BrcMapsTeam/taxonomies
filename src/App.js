import React, { Component }  from 'react';
import './App.css';
import UploadPage from './1_upload_page/UploadPage';
import SelectColumnPage from './2_select_column_page/SelectColumnPage';


//GLOBAL VARIABLES

class App extends Component {

    // ------------------ CONSTRUCTOR ---------------------------

    constructor(props){
        super(props);
        this.state = {
            step: 1,
            value: "https://proxy.hxlstandard.org/data.json?url=https%3A//docs.google.com/spreadsheets/d/1x30JatnFHEqEQx2Nm9NQhlHlYL2Kml-84v9plgO1RcY/edit%23gid%3D1339100966",
            data: "Loading...",
            crisisTag: "nothing",
            mapFrom: "IFRC",
            mapTo: "GLIDE"
        };

        //List of all functions in the App Class using "this"
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.getUserLink = this.getUserLink.bind(this);
        this.nextAndSave = this.nextAndSave.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }


    // ------------------ FUNCTIONS ---------------------------

    handleLinkChange(event) {
        this.setState({value: event.target.value});
    }

    handleTagChange(event) {
        this.setState({crisisTag: event.target.id});
    }

    //ajax request to get json data
    getUserLink(event) {

        var userLink = this.state.value;

        let getJSON = function(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.responseType = 'json';
                xhr.onload = function() {
                    var status = xhr.status;
                    if (status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(status);
                    }
                };
                xhr.send();
            });
        };

        getJSON(userLink).then(function(userData) {
            console.log("e=",this);
            this.setState({data:userData});
        }.bind(this), function(status) { //error detection....
            alert('Something went wrong.');
        });
    }


    // function to set how to get to next page (or next state)
    nextStep() {
        this.setState({
            step : this.state.step + 1
        })
    }

    // Same as nextStep, but decrementing
    previousStep() {
        this.setState({
            step : this.state.step - 1
        })
    }

    // Same as nextStep but also saves the user data as state
    nextAndSave(){
        this.nextStep();
        this.getUserLink();
    }

    getCrisisTag(){

    }


    //----------------- function to show content of page -----------------

    showStep() {
        switch (this.state.step){

            /*---------------------- PAGE 1 --------------------------*/
            case 1: 
                return (
                    <UploadPage 
                        nextAndSave={this.nextAndSave} 
        handleLinkChange={this.handleLinkChange} 
        link={this.state.value} 
        getUserLink = {this.getUserLink} 
     />);

        /*---------------------- PAGE 2 ---------------------------*/
            case 2:
                return (<SelectColumnPage 
                            previousStep={() => this.previousStep}
                            handleTagChange = {this.handleTagChange}
                            data = {this.state.data}
                            crisisTag = {this.state.crisisTag}
                        />);

    /*---------------------- ERROR PAGE -----------------------*/
            default: 
                return (<h1>Error, please check your entries are correct.</h1>);
}
}

    // ------------------ Rendering "App" ------------------------------

    render() {
        return(
        <div className="App">
{this.showStep()}
            <div className="progress-step">Step {this.state.step}</div>
        </div>
        );
}
} //END CLASS APP



export default App;
