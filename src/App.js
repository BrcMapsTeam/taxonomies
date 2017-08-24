import React, { Component }  from 'react';
import './App.css';
import UploadPage from './1_upload_page/UploadPage';
import SelectColumnPage from './2_select_column_page/SelectColumnPage';


//GLOBAL VARIABLES

class App extends Component {

    // Sets default page state as 1
    constructor(){
        super();
        this.state = {
            step: 1,
            value: ""
        };

    this.handleLinkChange = this.handleLinkChange.bind(this);
    }

    handleLinkChange(event) {
        this.setState({value: event.target.value});
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

    // function to show content of page
    showStep() {
        switch (this.state.step){
            case 1: 
                return (<UploadPage nextStep={() => this.nextStep.bind(this)} handleLinkChange={this.handleLinkChange.bind(this)} link={this.state.value} />);
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
