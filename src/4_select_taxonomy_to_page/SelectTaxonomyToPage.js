import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';
import { TaxButtonElement } from '../3_select_taxonomy_from_page/SelectTaxonomyFromPage';
import config_json from '../taxonomy_maps/config.js';


/*--------------------------------------------------------------------------------*/

/*                         SELECT TAXONOMY TO PAGE                                */

/*--------------------------------------------------------------------------------*/

class SelectTaxonomyToPage extends Component {

    render(){

        const taxButtons = config_json.map((tax, i) => {
            //console.log("taxButtons: ", i, tax.name, this.props);
            return <TaxButtonElement key={i} selectedBtn={this.props.mapTo} text={tax.name} handleMapChange={this.props.handleMapToChange} />
        });

        return (
                <div className="flex-page">
                    <h2 className="flex-row title">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Which taxonomy are you mapping <b>TO</b>?</div>
                    </div>
                    <div className="flex-row">
                            {taxButtons}
                    </div> 
                    <div className="flex-row">
                        <div>You have currently selected: <b>{this.props.mapTo}</b></div>
                    </div>
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButton" onClick={this.props.nextStep()}>Next</div>
                    </div>
                </div>
                );
    }
}

export default SelectTaxonomyToPage;