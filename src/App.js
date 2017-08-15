import React, { Component } from 'react';
import './App.css';

let content = ["Please enter the link to your data:", 
    "Please select the #crisis column you wish to map:",
    "Which Taxonomy are you mapping FROM?",
    "Which Taxonomy are you mapping TO?",
    "The following term was not mappable.",
    "We have mapped the following terms, here is the HXL replacement map for it:",
    "Success your dataset has been converted, select the format you wish to download it in:"
]


class App extends Component {
    renderPage(i){
        return (
            <Page value={i} />
        );
            }

    render() {
            return (
              <div className="App">
                {this.renderPage(0)}
                {this.renderPage(1)}
                {this.renderPage(2)}
                {this.renderPage(3)}
                {this.renderPage(4)}
                {this.renderPage(5)}
                {this.renderPage(6)}
              </div>
            );
    }
}

class Page extends Component {
    render() {
        const previousPage = this.props.value-1;
        const nextPage = this.props.value + 1;

        return(
            <div id={"Page"+this.props.value} className = "Page">
                <div className="PageContent">
                {content[this.props.value]}
                </div>
                <NavButton value="Back" url={'#Page'+ previousPage}/>
                <NavButton value="Next" url={'#Page'+ nextPage}/>
            </div>
            );
            }
}

class NavButton extends Component {
    render() {
        return(
            <a className = "NavButton" href={this.props.url}>
            {this.props.value}
            </a>
            );
    }
}

//class entryBox extends Component {
//    render() {
//        return(
//            <>
//            );
//    }
//}

export default App;
