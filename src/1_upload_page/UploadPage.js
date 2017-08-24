import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';

//test link: https://proxy.hxlstandard.org/data.json?url=https%3A//docs.google.com/spreadsheets/d/1x30JatnFHEqEQx2Nm9NQhlHlYL2Kml-84v9plgO1RcY/edit%23gid%3D1339100966
//constructor(){
//    super();
//    this.state = {
//        userLink: ""
//    }
//}
//componentDidMount(){
//    let nextButton = document.getElementById("loadFile");     
//    AttachEvent(nextButton, "click", getUserLink);
//}


class UploadPage extends Component {


    render(){
        return (<div className="flex-page">
                    <h1 className="flex-row">Upload Page</h1>
                    <div className="flex-row">
                        <div>Link to dataset you wish to map:</div>
                    </div> 
                    <div className="flex-row">
                        <FormInput handleLinkChange={this.props.handleLinkChange} link={this.props.link}/>
                    </div>
                    <div className="flex-row">
                        <div className="NavButtonGreyed">Back</div>
                        <div id="loadFile" className="NavButton" onClick={ this.props.nextStep()} >Next</div>
                    </div>
              </div>);
    }
}

class FormInput extends Component {
    render(){
        return (<div>
                    <input type="text" name="link" id="data_link" value={this.props.link} onChange={this.props.handleLinkChange}/><br /> 
                    <div className="FormLine"></div>
                </div>);
    }
}


function AttachEvent(DOMposition, eventType, eventHandler){
    if (DOMposition.addEventListener){ // if the addEventListener method exists on that browser
        DOMposition.addEventListener(eventType, eventHandler, false);
    } else { //IE 8?
        DOMposition.attachEvent("on"+eventType, eventHandler);
    }
}


function getUserLink() {

    //variable userLink is global and declared in App.js
    var userLink = document.getElementById("data_link").value;

    //var sheetCall = $.ajax({
    //    type: 'GET',
    //    url: userLink,
    //    dataType: 'json',
    //    timeout: 3000 // sets timeout to 3 seconds
    //});

    //$.when(sheetCall).then(function(){
    //    console.log("do something with states");
    //}
    //    )

    //let getJSON = function(url) {
    //    return new Promise(function(resolve, reject) {
    //        var xhr = new XMLHttpRequest();
    //        xhr.open('get', url, true);
    //        xhr.responseType = 'json';
    //        xhr.onload = function() {
    //            var status = xhr.status;
    //            if (status === 200) {
    //                resolve(xhr.response);
    //            } else {
    //                reject(status);
    //            }
    //        };
    //        xhr.send();
    //    });
    //};

    //getJSON(userLink).then(function(data) {
    //    console.log('Your Json result is:  ' + data.result); //you can comment this, i used it to debug
    //}, function(status) { //error detection....
    //    alert('Something went wrong.');
    //});
}


export default UploadPage;