import React, { Component }  from 'react';
import './App.css';
import UploadPage from './1_upload_page/UploadPage';
import SelectColumnPage from './2_select_column_page/SelectColumnPage';


//GLOBAL VARIABLES

class App extends Component {

    // Sets default page state as 1
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            value: "",
            data: ""
        };

        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.getUserLink = this.getUserLink.bind(this);
    }

    handleLinkChange(event) {
        this.setState({value: event.target.value});
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

        getJSON(userLink).then(function(data) {
            this.setState({data:data});
            console.log(this);
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

    nextAndSave(){
        this.nextStep();
        this.getUserLink();
    }
    // function to show content of page

    showStep() {
        switch (this.state.step){
            case 1: 
                return (<UploadPage nextAndSave={this.nextAndSave.bind(this)} 
                                    handleLinkChange={this.handleLinkChange.bind(this)} 
                                    link={this.state.value} 
                                    getUserLink = {this.getUserLink.bind(this)} />);

            case 2:
                return (<SelectColumnPage 
                            previousStep={() => this.previousStep.bind(this)} 
                            nextStep
                        />);
            default: 
                return (<h1>Error, please check your entries are correct.</h1>);
}
}

    // Rendering "App"
    render() {
        return(
        <div className="App">
            <div className="progress-step">Step {this.state.step}</div>
            {this.showStep()}
        </div>
        );
}
}



export default App;
