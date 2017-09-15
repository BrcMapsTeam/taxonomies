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


    render(){

        let userData = this.state.data;
        let userData2 = "";
        let userData3 = "";

        //Checks that this.state.data is not "<tr>Loading</tr>"
        if (userData.type !== "tr" && Object.keys(userData).length !== 0) {
            console.log(userData);
            const headerParameters = {
                'data': userData,
                'rowStart': 0,
                'rowEnd': 1,
                'className': ""
            };
            const tagParameters = {
                'data': userData,
                'rowStart': 1,
                'rowEnd': 2,
                'className': "clickable-cell"
            };
            const dataParameters = {
                'data': userData,
                'rowStart': 2,
                'rowEnd': 6,
                'className': ""
            };

            userData = <TableRows parameters={headerParameters} handleTagChange={function(){return;}} />
            userData2 = <TableRows parameters={tagParameters} handleTagChange={this.props.handleTagChange} />;
            userData3 = <TableRows parameters={dataParameters} handleTagChange={function(){return;}} />
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



/*--------------------------------------------------------------------------------*/

/*                           TABLE ROWS                                            */

/*--------------------------------------------------------------------------------*/


// Parameter Object should contain: data, start and end of rows, and className to be processed
// e.g.: parseData({data:data, rowStart:0, rowEnd:10, className: "clickable-button"})

export class TableRows extends Component {
       
    render(){
        let obj = this.props.parameters;
        obj.data = obj.data.slice(obj.rowStart, obj.rowEnd); //selecting data from lines

        let finalTable =
        obj.data.map( function(row, i){

            const temp = row.map(function(item, j){ 
                return (<td key={j} id={item} className={obj.className} onClick={this.props.handleTagChange} >{item}</td>);
                }, this);
                return (<tr key={i}>{temp}</tr>);

            }, this)[0];  //Need the 0....

            return (finalTable);
        }
    }


export default SelectColumnPage;