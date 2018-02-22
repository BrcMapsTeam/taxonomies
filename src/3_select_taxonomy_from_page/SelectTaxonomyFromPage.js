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
                    <h2 className="flex-row title">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Which taxonomy are you mapping <b>FROM</b>?</div>
                    </div>
                    <div className="flex-row">
                            {taxButtons}

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

        let bgColor = (this.props.selectedBtn === this.props.text) ? 'colorOn': 'colorOff';
        let classNames = 'TaxButton ' + bgColor;
        return (
            <div className={classNames} id={this.props.text} onClick={this.props.handleMapChange}>{this.props.text}</div>
        );
    }
};

export default SelectTaxonomyFromPage;