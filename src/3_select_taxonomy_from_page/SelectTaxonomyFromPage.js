import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';
import config_json from '../taxonomy_maps/config.js';


/*--------------------------------------------------------------------------------*/

/*                         SELECT TAXONOMY FROM PAGE                              */

/*--------------------------------------------------------------------------------*/

class SelectTaxonomyFromPage extends Component {

    render(){

        const taxButtons = config_json.map((tax, i) => {
            //console.log("taxButtons: ", i, tax.name, this.props);
            return <TaxButtonElement key={i} selectedBtn={this.props.mapFrom} text={tax.name} handleMapChange={this.props.handleMapFromChange} />
        });

        return (
                <div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Which taxonomy are you mapping <b>FROM</b>?</div>
                    </div>
                    <div className="flex-row">
                        <ul className={"TaxButtons"}>
                            {taxButtons}
                        </ul>
                    </div> 
                    <div className="flex-row">
                        <div>You have currently selected: <b>{this.props.mapFrom}</b></div>
                    </div>
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButton" onClick={this.props.nextStep()}>Next</div>
                    </div>
                </div>
                );
    }
}


/*--------------------------------------------------------------------------------*/

/*                         TAXONOMY BUTTON ELEMENT                                */

/*--------------------------------------------------------------------------------*/

export class TaxButtonElement extends Component {

    render() {
        var colorOn = '#2997db';
        var colorOff = '#bdb6b0';
        var bgColor = (this.props.selectedBtn === this.props.text) ? colorOn: colorOff;
        //console.log("in TaxButtonElement: ", this.props.selectedBtn, this.props.text, this);
        return (
            <button className={'TaxButton'} id={this.props.text} style={{backgroundColor: bgColor}} onClick={this.props.handleMapChange}>{this.props.text}</button>
        );
    }
};

export default SelectTaxonomyFromPage;