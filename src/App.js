import React, { Component }  from 'react';
import './App.css';
import UploadPage from './1_upload_page/UploadPage';
import SelectColumnPage from './2_select_column_page/SelectColumnPage';
import SelectTaxonomyFromPage from './3_select_taxonomy_from_page/SelectTaxonomyFromPage';
import SelectTaxonomyToPage from './4_select_taxonomy_to_page/SelectTaxonomyToPage';
import MapProcessPage from './5_mapping_process_page/MappingProcessPage';


//GLOBAL VARIABLES

class App extends Component {

    // ------------------ CONSTRUCTOR ---------------------------

    constructor(props){
        super(props);
        this.state = {
            step: 1,
            value: "https://docs.google.com/spreadsheets/d/1JpnKSjzqXKcCLOuLigSzzlwc22x3cXlczpbS5evdbOQ/edit#gid=1339100966",
            data: <tr><td className="waiting">Loading<span className="loading-animation">...</span></td></tr>,
            crisisTag: "#crisis+type",
            crisisColumnJson: "",
            mapFrom: "disaster_GLIDE1",
            mapTo: "disaster_IFRC4"
        };

        //List of all functions in the App Class using "this"
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleMapFromChange = this.handleMapFromChange.bind(this);
        this.handleMapToChange = this.handleMapToChange.bind(this);
        this.getUserLink = this.getUserLink.bind(this);
        this.getColumnData = this.getColumnData.bind(this);
        this.nextAndSave = this.nextAndSave.bind(this);
        this.nextAndGetColumn = this.nextAndGetColumn.bind(this);
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

    handleMapFromChange(event) {
        this.setState({mapFrom: event.target.id}, function() {
            console.log(this.state.mapFrom);
        });
    }

    handleMapToChange(event) {
        this.setState({mapTo: event.target.id}, function() {
            console.log(this.state.mapTo);
        });
    }

	createHXLLink(url){
		return "https://proxy.hxlstandard.org/data.json?&url=" + encodeURIComponent(url) + "&force=on";
	}

    //ajax request to get json data
    getUserLink(event) {

        var userLink = this.createHXLLink(this.state.value);

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
            this.setState({data:userData});
        }.bind(this), function(status) { //error detection....
            alert('Something went wrong. Please make sure your spreadsheet is public to everyone on the internet.');
            this.setState({data:null});
        }.bind(this)
    );
    }


    // gets column that user wants to convert from dataset 
    getColumnData(event) {
        let data = this.state.data;
        let crisisTag = this.state.crisisTag;
        let column = [];
        let index = data[1].indexOf(crisisTag);

        data.forEach(function(c, i){
			if(i===1){
			//do nothing
			column.push(c[index]);
			} else {
            //to capital case
            column.push(c[index].replace(/\b\w/g, function(l){ return l.toUpperCase() }));
			}
        });

        this.setState({crisisColumnJson: column});
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

    // Same as nextStep but also gets data for column to be processed
    nextAndGetColumn(){
        this.nextStep();
        this.getColumnData();
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
                            nextStep={() => this.nextAndGetColumn}
                        />);

    /*---------------------- PAGE 3 ---------------------------*/ 
            case 3:
                return (<SelectTaxonomyFromPage 
                            previousStep={() => this.previousStep}
                            handleMapFromChange = {this.handleMapFromChange}
                            mapFrom = {this.state.mapFrom}
                            nextStep={() => this.nextStep}
                        />);

    /*---------------------- PAGE 4 ---------------------------*/ 
            case 4:
                return (<SelectTaxonomyToPage 
                            previousStep={() => this.previousStep}
                            handleMapToChange = {this.handleMapToChange}
                            mapTo = {this.state.mapTo}
                            nextStep={() => this.nextStep}
                        />);

    /*---------------------- PAGE 5 ---------------------------*/ 
            case 5:
                return (<MapProcessPage 
                            previousStep={() => this.previousStep}
                            mapTo = {this.state.mapTo}
                            mapFrom = {this.state.mapFrom}
                            data = {this.state.data}
                            crisisColumnJson = {this.state.crisisColumnJson}
                            nextStep={() => this.nextStep}
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
        </div>
        );
}
} //END CLASS APP



export default App;
