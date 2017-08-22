import React, { Component }  from 'react';
import './App.css';
import UploadPage from './1_upload_page/UploadPage';
import SelectColumnPage from './2_select_column_page/SelectColumnPage';


//let content = ["Please enter the link to your data:", 
//    "Please select the #crisis column you wish to map:",
//    "Which Taxonomy are you mapping FROM?",
//    "Which Taxonomy are you mapping TO?",
//    "The following term was not mappable.",
//    "We have mapped the following terms, here is the HXL replacement map for it:",
//    "Success your dataset has been converted, select the format you wish to download it in:"
//]


class App extends Component {

    // Sets default page state as 1
    constructor(){
        super();
        this.state ={
            step: 1
        };
    }

    // function to set how to get to next page (or next state)
    nextStep() {
        console.log();
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
                return (<UploadPage nextStep={() => this.nextStep.bind(this)} />);
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
