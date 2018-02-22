import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class UploadPage extends Component {
	    constructor(props){
        super(props);
		this.state = {
			active: false
		}
		this.showText = this.showText.bind(this);
	}

    //Makes text field come into focus on page load
    componentDidMount(){
        var input = document.getElementById("data_link");
        if (input !== undefined && input !== null) {
            input.focus();
            input.select();
        }

    }


	showText(){
		this.setState((prevState) => {
			let newState = !prevState.active;
			return {active: newState};
		});
	}

    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
					<div className="flex-row">
                        <div>This page will help you convert the disaster terms in your dataset from one taxonomy to another:</div>
                    </div>
					<Instructions active = {this.state.active} handleClick={this.showText} />
					<div className="flex-row">
                        <div>Link to googleSheet you wish to map:</div>
                    </div>
                    <div className="flex-row">
                        <FormInput handleLinkChange={this.props.handleLinkChange} link={this.props.link}/>
                    </div>
                    <div className="flex-row">
                        <div className="NavButtonGreyed">Back</div>
                        <div id="loadFile" className="NavButton" onClick={this.props.nextAndSave} >Next</div>
                    </div>
              </div>);
    }
}

class FormInput extends Component {
    render(){
        return (<div className="flex-row">
                    <div className="flex-row">
                        <input type="text" name="link" id="data_link" value={this.props.link} onChange={this.props.handleLinkChange}/>
                    </div>
                </div>);
    }
}

class Instructions extends Component {
	constructor(props){
		super(props);
		this.state ={
			active: false
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({active: nextProps.active});
	}
	
	render(){
		return (
		<div className="flex-row" onClick={this.props.handleClick}>
			<a href="#Instructions" className="flex-row">Show instructions</a>
                <div id="instructions" className={this.state.active ? "show" : "hidden" }>
					- Paste your data into a googleSheet,
					<br />
					- <a href="http://hxlstandard.org/">HXL tags</a> in the second row (app won't work otherwise),
					<br />
					- make your disaster column terms is labelled with the HXL tag "#crisis+type",
					<br />
					- and make sure your googleSheet is public (top right "share" button: "anyone with link can edit").
                </div>
        </div>
			);
	}

}
export default UploadPage;