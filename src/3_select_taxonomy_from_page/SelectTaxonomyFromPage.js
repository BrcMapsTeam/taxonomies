import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';
import config_json from '../taxonomy_maps/config.js';


export class TaxButtonElement extends Component {

    constructor(props){
        super(props);
        this.state = {selected: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({selected: !this.state.selected});
        this.props.onClick(this.props.text);
        //console.log("in handleClick ", this.props.text, this);
    }

    render() {
        //console.log("in TaxButtonElement: ", this);
        var onOff = this.state.selected ? 'on': 'off';
        return (
            <button className={'TaxButton' + ' ' + onOff} onClick={this.handleClick}>{this.props.text}</button>
        );
    }
};



class SelectTaxonomyFromPage extends Component {

    constructor(props){
        super(props);
        this.state = {tax: 'IFRC-default'};
        this.clickTax = this.clickTax.bind(this);
    }

    clickTax(newTax) {
        //console.log("in clickTax: ", newTax);
        this.setState({tax: newTax });
    }

    render(){

        const taxButtons = config_json.map((tax, i) => {
            //console.log("taxButtons: ", i, tax.name);
            return <TaxButtonElement key={i} text={tax.name} onClick={this.clickTax} />
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
                        <div>You have currently selected: <b>{this.state.tax}</b></div>
                    </div>
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButton" onClick={this.props.nextStep()}>Next</div>
                    </div>
                </div>
                );
    }
}


export default SelectTaxonomyFromPage;