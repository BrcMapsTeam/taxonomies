import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';
import config_json from '../taxonomy_maps/config.js';
import { TableRows } from '../2_select_column_page/SelectColumnPage';


//---------------------------------------------------------------------------------------

//---                           MAIN CLASS: DEFINES PAGE                       ---------

//--------------------------------------------------------------------------------------




class MapProcessPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            finishedProcessing: 'no',
            currentWordFrom: '',
            currentArrayTo: [],
            newColumn: [],
            dataInNeedOfProcessing: [],
            step: 0
        };

        this.nextWordHandler = this.nextWordHandler.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.data});
    }

    componentWillMount(){
        this.processData();
    }

    //-----------------------------------------------------------------------
    //--------------------- PROCESSING USER CHOICES ------------------------
    //-----------------------------------------------------------------------


    nextWordHandler(event){
        const index = event.target.id.match(/\d+/g);
        const word = event.target.id.match(/[a-zA-Z]+/g);

        let tempArray = this.state.newColumn.slice();
        tempArray[index] = word;

        this.setState({newColumn: tempArray});

        if(this.state.step === this.state.dataInNeedOfProcessing.length-1){
            this.setState({finishedProcessing: 'yes'});
        } else {
            this.setState({step: this.state.step + 1});
        }

    }

    //-----------------------------------------------------------------------
    //---------------- DECIDE WHAT TO RENDER ON PAGE ------------------------
    //-----------------------------------------------------------------------

    showProcessingState() {

        switch (this.state.finishedProcessing){

            // ---------- CASE: not finished processing ------------------
            case 'no':
                return (
                    <div className="flex-row">
                    Step &nbsp;<b>{this.state.step}</b>
                    {this.state.dataInNeedOfProcessing[this.state.step]}
                    </div>
                    );

           // ---------- CASE: done processing ------------------

            case 'yes':
                return (
                    <div className="flex-row">
                        <div className="flex-row">
                            Success, we have converted all of your data!
                        </div>
                        <div className="flex-row">
                            <table className="scrollable-table">
                                <tbody>
                                    {this.createTable(this.props.crisisColumnJson, this.state.newColumn)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            // ---------- DEFAULT ------------------

            default: return (
                    <div className="flex-row">
                        {this.state.finishedProcessing}
                    </div>
                );
        }
    }

    //----------------------------------------------------------------------------------
    //---------------- GENERATING NEW DATA AND QUESTIONS TO USER ------------------------
    //----------------------------------------------------------------------------------


    processData(){
        const column = this.props.crisisColumnJson;
        let newColumn = [];
        let dataInNeedOfProcessing = [];
        let wordFrom;

        //Creating taxonomy map
        tax.config(config_json);
        let taxonomyMap = new tax.createMap(this.props.mapFrom, this.props.mapTo);

        column.forEach(function(c, i){
            if (i>1) {
                if (taxonomyMap[c] !== undefined){
                    if (taxonomyMap[c].length > 1){
                        dataInNeedOfProcessing.push([c, taxonomyMap[c], i]);
                    } else { //if length not > 1 add to array of translated taxonomies
                        newColumn[i] = taxonomyMap[c][0] || " ";
                    }
                } else { //if it's undefined add empty cell
                    newColumn[i] = " ";
                }
            }
        }); // end for Each

        if (dataInNeedOfProcessing.length === 0){
            this.setState({ finishedProcessing: 'yes'});
        } else {

        wordFrom = dataInNeedOfProcessing.map(function(item, i){
            const listOfChoices = item[1].map(function(word, j){ 
                const id = word + item[2];
                return <div className="button-small" onClick={this.nextWordHandler} key={j} id={id}>{word}</div>
            }, this);

            //Defining How the table will look like
            const dataHeaders = {"data": this.props.data, "rowStart": 0, "rowEnd": 1 };
            const currentRow = {"data": this.props.data, "rowStart": item[2], "rowEnd": item[2]+1 };

            return (
                <div className="flex-row">
                        <div className="flex-row" key={i}><span>How would you map the following item:&nbsp;</span><b>{item[0]}</b></div>
                        <div className="flex-row">{listOfChoices}</div>
                        <div className="flex-row">
                            This is a snapshot of the corresponding row:
                        </div>
                        <div className="flex-row">
                            <table className="scrollable-table" >
                                <tbody>
                                    {this.parseData(dataHeaders)}
                                    {this.parseData(currentRow)}
                                </tbody>
                            </table>
                        </div>
                </div>);
        }, this);
        };
        this.setState({ newColumn: newColumn });
        this.setState({ dataInNeedOfProcessing: wordFrom });
    }


    //---------------- FUNCTIONS USED TO CREATE FINAL TABLE ------------------------


    createTable(array1,array2){
        let combinedArray = [];
        array1.forEach(function(c, i){
            combinedArray.push([c,array2[i]]);
        });
        console.log(combinedArray);

        let finalTable =
        combinedArray.map( function(item, i){
            return (<tr key={i}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            </tr>);
        }
        );

        return finalTable;
        }


       parseData(obj){
            obj.data = obj.data.slice(obj.rowStart, obj.rowEnd); 

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


    //----------------------------- RENDER ------------------------------

    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                        {this.showProcessingState()}
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButtonGreyed">Next</div>
                    </div>
                </div>);
    }
}

//---------------------------------------------------------------------------------------

//---                           TAXONOMY MAPPING FUNCTION                       ---------

//---------------------------------------------------------------------------------------


let tax = {

    _config: {},

    config: function(config_json){
        this._config = config_json;
        return this;
    },

    //----------------------------- CREATEMAP ------------------------------

    createMap: function(tax1,tax2){

        this._tax1 = {};
        this._tax2 = {};
        let parent = this;
        this._dataLoaded = 0;

        //----------------------------- this.init ------------------------------

        this.init = function(){
            if(tax._config === null || tax._config === undefined){
                console.log('Error! Load valid config file first!');
                return;
            }

            tax._config.forEach(function(taxonomy){
                if(taxonomy.name === tax1){
                    parent._tax1 = taxonomy;
                }
                if(taxonomy.name === tax2){
                    parent._tax2 = taxonomy;
                }
            });

            if(!('name' in this._tax1)){
                console.log('Taxonomy 1 not found');
                return;
            }

            if(!('name' in this._tax2)){
                console.log('Taxonomy 2 not found');
                return;
            }

            let tax1Call = this._loadTaxonomy(this._tax1.url);
            let tax2Call = this._loadTaxonomy(this._tax2.url);

            let map = parent._createMap(tax1Call,tax2Call);
            return map;


        }; //end this.init

        //----------------------------- this.createMap ------------------------------

        this._createMap = function(map1,map2){
            let map = {};
            for(let subTerm in map1){
                let baseTerms = map1[subTerm];
                let subTerms2 = parent._getSubTermsFromBaseTerms(baseTerms,map2);
                map[subTerm] = subTerms2;
            }
            return map;
        };

        //----------------------------- this.getSubTermsFromBaseTerms -----------------

        this._getSubTermsFromBaseTerms = function(baseTerms,map){
            let subTerms = [];
            for(let subTerm2 in map){
                let baseTerms2 = map[subTerm2];
                if(this._compareArrays(baseTerms,baseTerms2) === true){
                    subTerms.push(subTerm2);
                }
            }
            return subTerms;
        };

        //----------------------------- this.compareArrays ------------------------------

        this._compareArrays = function (arr1, arr2) {
            return arr2.some(function (v) {
                return arr1.indexOf(v) >= 0;
            });
        };

        //----------------------------- this.loadTaxonomy ------------------------------

        this._loadTaxonomy = function(url){
            if (url !== null || url !== undefined) {
                var taxonomyMap = require("../" + url);
                return taxonomyMap;
            } else {
                console.log("Error loading taxonomy map, please check url in config file!");
                return null;
            }
        };


        let map = this.init();
        return map;

    } // END THIS.CREATEMAP

};





export default MapProcessPage;