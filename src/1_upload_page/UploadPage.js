import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

class UploadPage extends Component {

    //Makes text field come into focus on page load
    componentDidMount(){
        var input = document.getElementById("data_link");
        if (input !== undefined && input !== null) {
            input.focus();
            input.select();
        }

    }

    render(){

        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Link to JSON dataset you wish to map (example: <a href="http://goo.gl/VvNwF9">Link</a>):</div>
                    </div>
                    <div className="flex-row">
                       <div className="small">If you have a googleSheet please use the HXL Proxy 
                            (<a href="https://proxy.hxlstandard.org/data/source">Link</a>) to generate an online JSON version of the file.
                       </div>
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


export default UploadPage;