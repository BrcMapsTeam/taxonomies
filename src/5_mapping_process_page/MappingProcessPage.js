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
			taxonomyLevelOfTerm: [],
            dataInNeedOfProcessing: [],
            step: 0
        };

        this.nextWordHandler = this.nextWordHandler.bind(this);
    }


    componentWillMount(){

		//Changing the array into a key:value pair list
		const data = this.props.crisisColumnJson;
		let dataObject = {};

		data.forEach(function(c,i){
			dataObject[i] = c;
		});

		//Processing all data
        this.processData(dataObject);
    }

    //-----------------------------------------------------------------------
    //--------------------- PROCESSING USER CHOICES ------------------------
    //-----------------------------------------------------------------------

	//Decides what happens once a user selects one of the choices of words

    nextWordHandler(event){
        const index = event.target.id.match(/\d+/g);
        let wordArray = event.target.id.match(/[a-zA-Z]+/g);
		let word;
		let taxonomyLevelOfTerm = this.state.taxonomyLevelOfTerm.slice();
		let tempArray = this.state.newColumn.slice();
		const taxonomyLevelTo = "Level " + this.props.mapTo.substr(this.props.mapTo.length-1);

		wordArray.forEach(function(item,i){
			if (i===0){
				word = item;
			} else {
				word = word.concat(" "+item);
			}
		})

        tempArray[index] = word;
		taxonomyLevelOfTerm[index] = taxonomyLevelTo;

        this.setState({newColumn: tempArray});
		this.setState({ taxonomyLevelOfTerm: taxonomyLevelOfTerm });

        if(this.state.step === this.state.dataInNeedOfProcessing.length-1){
            this.setState({finishedProcessing: 'yes'});
        } else {
            this.setState({step: this.state.step + 1});
				console.log(this.state.step);
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
						<AskUserInput dataInNeedOfProcessing={this.state.dataInNeedOfProcessing} 
									  data={this.props.data} 
									  step={this.state.step} 
									  nextWordHandler={this.nextWordHandler} 
						/>
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
                                    {this.createTable(this.combineArrays(
										this.props.data, this.state.newColumn, this.state.taxonomyLevelOfTerm)
									)}
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


	
    processData(data){
        const column = data;
        let dataInNeedOfProcessing = [];
		let taxonomyLevelTo = this.props.mapTo.substr(this.props.mapTo.length-1);
		let taxonomyLevelFrom = 1;
		let dataToCheckInHigherTaxonomy = [];
				console.log(taxonomyLevelTo);
		let results = this.searchTermInTaxonomy(taxonomyLevelFrom, 
												taxonomyLevelTo, 
												column, 
												dataInNeedOfProcessing);
		dataInNeedOfProcessing = results[0];
		dataToCheckInHigherTaxonomy = results[1];
	//	taxonomyLevelTo--;

		while(taxonomyLevelTo > 0){
			if(dataToCheckInHigherTaxonomy.length!==0){
				results = this.searchTermInTaxonomy(taxonomyLevelFrom,
													taxonomyLevelTo,
													dataToCheckInHigherTaxonomy, 
													dataInNeedOfProcessing);
				dataInNeedOfProcessing = results[0];
				dataToCheckInHigherTaxonomy = results[1];
			}

				taxonomyLevelTo--;
		}

		//While the dataInNeedOfProcessing is not empty, keep processing
		if (dataInNeedOfProcessing.length === 0){
            this.setState({ finishedProcessing: 'yes'});
        } else {
			this.setState({dataInNeedOfProcessing: dataInNeedOfProcessing});
		};
		
    }//End Process data


	searchTermInTaxonomy(taxonomyLevelFrom, taxonomyLevelTo, data, dataInNeedOfProcessing){
		let taxonomyLevelOfTerm = this.state.taxonomyLevelOfTerm;
		let newColumn = this.state.newColumn;
		let dataToCheckInHigherTaxonomy = {};
		let mapTo = this.props.mapTo.slice(0, -1) + taxonomyLevelTo;
		
		//Creating taxonomy map
		tax.config(config_json);
		let taxonomyMap = new tax.createMap(this.props.mapFrom, mapTo);

		//For each item to be translated
		Object.keys(data).forEach(function(i){
			if (i>1) {
				let c = data[i];
				if (taxonomyMap[c] !== undefined && taxonomyMap[c].length !==0){
					if (taxonomyMap[c].length > 1){
						dataInNeedOfProcessing.push([c, taxonomyMap[c], i]);
					} else { //if length not > 1 add to array of translated taxonomies
						newColumn[i] = taxonomyMap[c][0] || " ";
						taxonomyLevelOfTerm[i] = "Level " + taxonomyLevelTo;
					}
				} else { //if it's undefined add empty cell
					dataToCheckInHigherTaxonomy[i] = c;
				}
			}
		}); // end for Each

		this.setState({ taxonomyLevelOfTerm: taxonomyLevelOfTerm });
		this.setState({ newColumn: newColumn });

		let remainingData = [dataInNeedOfProcessing, dataToCheckInHigherTaxonomy];
		return remainingData;
	}


    //---------------- FUNCTIONS USED TO CREATE FINAL TABLE ------------------------

	// Merges the arrays for the data-to-be-converted, new converted data, 
	// and the level-of-taxonomy-the-converted-data-is-from into one array
	// to be used to create the final Table using the function createTable below

	combineArrays(data, array2, array3){

		let combinedArray = [];	
		data.forEach(function(c, i){
			if(i===0){
				array2[i] = "Converted Term";
				array3[i] = "From Taxonomy";
			}
			if(i===1){
				array2[i] = "#crisis+type";
				array3[i] = "#level";
			}
			combinedArray.push(c.concat(array2[i], array3[i])); 
		});
		return combinedArray;
	}


	// Creates a table from the combined array produced above, 
	// Function works with any number of columns and will put each row into a <tr>
	// And each element of the array in the row into a <td>

    createTable(array){
        let finalTable = 
			array.map( function(item, j){
				return (
					<tr key={j}>
						{item.map(function(cell, i){ 
								return <td key={i}>{cell}</td>
						})}
					</tr>
				);
			});
        return finalTable;
     }



    //----------------------------- RENDER ------------------------------

    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>
                        {this.showProcessingState()}
                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButtonGreyed">End</div>
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
			console.log(this._tax1.group);

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




class AskUserInput extends Component {

   constructor(props){
        super(props); //defines this.props
        this.state = {
			allDOMElements: []
        };
    }

	componentWillMount(){
		this.createList(this.props.dataInNeedOfProcessing, this.props.data); 
    }

	componentWillReceiveProps(nextProps) {
		this.createList(this.props.dataInNeedOfProcessing, this.props.data); 
	}

	createList(dataInNeedOfProcessing, data) {
		let wordList = [];
        let allDOMElements = dataInNeedOfProcessing.map(function(item, i){
            wordList[i] = {};
			wordList[i].listOfChoices = item[1].map(function(word, j){ 
                const id = word + item[2];
                return(
					<div className="button-small" onClick={this.props.nextWordHandler} key={j} id={id}>{word}</div>
					);
            }, this);

            //Defining How the table will look like
            wordList[i].dataHeaders = {"data": data, "rowStart": 0, "rowEnd": 1 };
            wordList[i].currentRow = {"data": data, "rowStart": item[2], "rowEnd": item[2]+1 };
			return(
				<div className="flex-row" key={i} style={{display: this.props.step === i ? 'inline' : 'none', transition: 'all 400ms'}}>
					<DisplayWordThatNeedsInput word = {item[0]} />
					<div className="flex-row">{wordList[i].listOfChoices}</div>
					<div className="flex-row">
						This is a snapshot of the corresponding row:
					</div>
					<div className="flex-row">
						<table className="scrollable-table" >
						<tbody>
							< TableRows parameters={wordList[i].dataHeaders} />
							< TableRows parameters={wordList[i].currentRow} />
						</tbody>
					</table>
				</div>
			</div>
			)
        }, this);
		this.setState({allDOMElements: allDOMElements});

	}

    render (){
		return(
		<div>
			{this.state.allDOMElements}
		</div>
		);
	}
}


class DisplayWordThatNeedsInput extends Component {

	render(){
		return(
			<div className="flex-row">
				<span>How would you map the following item:&nbsp;</span>
				<b>{this.props.word}</b>
			</div>
		);
	}
}



export default MapProcessPage;