import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';


/*--------------------------------------------------------------------------------*/

/*                           SELECT COLUMN PAGE                               */

/*--------------------------------------------------------------------------------*/



class SelectColumnPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            buttonReady: 'no'
        };
    }

    //When new data is loaded un-grey the button
    componentWillReceiveProps(nextProps){

        if (nextProps.data !== this.props.data) {
            this.setState({buttonReady: 'yes'});
        }
    }

    //If user goes from next page back to this page and data is already loaded, un-grey the button
    componentDidMount(){
        const data = this.props.data;
        if (data.type !== "tr" && Object.keys(data).length !== 0) {
            this.setState({buttonReady: 'yes'});
        }
    }

    //Function checks whether the data is loaded and if not the button stays greyed out
    nextButton(){
        if (this.state.buttonReady !== 'yes') {
            return (<div className="NavButtonGreyed">Next</div>);
        } else {
            return (<div className="NavButton" onClick={this.props.nextStep()}>Next</div>);
        }
    }

    tableLoading(){
        if (this.state.buttonReady !== 'yes') {
            return(this.props.data);
        } else {
            return (<div className="flex-row">
                    <DataTable data={this.props.data} handleTagChange={this.props.handleTagChange}/>
                    </div>);
        }
    }

    render(){

        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                    <div className="flex-row">
                        <div>Please select the <b>#crisis</b> column you wish to map:</div>
                    </div> 
                        {this.tableLoading()}
                    <div className="flex-row">
                       <span>You have selected &nbsp;</span><b>{this.props.crisisTag}</b>.
                    </div>
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         {this.nextButton()}
                    </div>
                </div>);
    }
}


/*--------------------------------------------------------------------------------*/

/*                           DATA-TABLE                                            */

/*--------------------------------------------------------------------------------*/


class DataTable extends Component {

    constructor(props){
        super(props);
        this.state =  {data: this.props.data};
    }

    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.data});
    }


    // Object should contain: data, start and end of rows to be processed, th/td/other tags
    // e.g.: parseData({data:data, rowStart:0, rowEnd:10})

    parseData(obj){
        obj.data = obj.data.slice(obj.rowStart, obj.rowEnd); //Taking top 7 lines

        let finalTable =
        obj.data.map( function(row, i){
            const temp = row.map(function(item, i){ 
                return <td key={i}>{item}</td>
            });
            return <tr key={i}>{temp}</tr>;
        }
        );
        return finalTable;
    }


    // ---- Parsing the clickable cells containing #HXL tags

    parseTag(obj){

        obj.data = obj.data.slice(obj.rowStart, obj.rowEnd); //Taking top 7 lines
        let finalTable =
        obj.data.map( function(row, i){
            const temp = row.map(function(item, i){ 
                return <td key={i} id={item} className="clickable-cell" onClick={this.props.handleTagChange} >{item}</td>
            }, this //binds this inside of anonymous function
            );
            return <tr key={i}>{temp}</tr>;
        }, this //binds this inside of anonymous function
        );
        return finalTable;
    }


    render(){

        let userData = this.state.data;
        let userData2 = "";
        let userData3 = "";

        //Checks that this.state.data is not "<tr>Loading</tr>"
        if (userData.type !== "tr" && Object.keys(userData).length !== 0) {

            const headerParameters = {
                'data': userData,
                'rowStart': 0,
                'rowEnd': 1
            };
            const tagParameters = {
                'data': userData,
                'rowStart': 1,
                'rowEnd': 2
            };
            const dataParameters = {
                'data': userData,
                'rowStart': 2,
                'rowEnd': 6
            };

            userData = this.parseData(headerParameters);
            userData2 = this.parseTag(tagParameters);
            userData3 = this.parseData(dataParameters);
        } //end if

        return(
            <table className="scrollable-table">
                <tbody>
                    {userData}
                    {userData2}
                    {userData3}
                </tbody>
            </table>
            );
    }
}


export default SelectColumnPage;