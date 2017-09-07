import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import '../App.css';
import config_json from '../5_mapping_process_page/config.js';


class MapProcessPage extends Component {
    //constructor(props){
    //    super(props);

    //}

    render(){
        return (<div className="flex-page">
                    <h2 className="flex-row">Disaster Taxonomies</h2>

                    <div className="flex-row">
                         <div className="NavButton" onClick={this.props.previousStep()}>Back</div>
                         <div className="NavButtonGreyed" onClick={test()}>Next </div>
                    </div>
                </div>);
    }
}


let test = function(){

        tax.config(config_json);
        var newMap = new tax.createMap('Glide','IFRC level 1');
        newMap.ready(function(map){
            console.log(map);
        });

        var newMap2 = new tax.createMap('IFRC level 2','IFRC level 1');
        newMap2.ready(function(map){
            console.log(map);
        });

        var newMap3 = new tax.createMap('IFRC level 1','IFRC level 3');
        newMap3.ready(function(map){
            console.log(map);
        });
    };




let tax = {

    _config: {},

    config: function(config_json){
        this._config = config_json;
        //console.log(this);
        return this;
    },

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

            console.log("aaa=",this._tax1, this._tax2);
            let tax1Call = this._loadTaxonomy(this._tax1.url);
            let tax2Call = this._loadTaxonomy(this._tax2.url);
            console.log(tax2Call);

            let map = parent._createMap(tax1Call,tax2Call);
            console.log("map= ", map);
            parent._readyFunction(map);
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
            console.log(url);
            if (url !== null || url !== undefined) {
                var taxonomyMap = require("../" + url);
                console.log("taxonomyMap =", taxonomyMap);
                return taxonomyMap;
            } else {
                console.log("Error loading taxonomy map, please check url in config file!");
                return null;
            }
        };


        this.init();
    }

};




export default MapProcessPage;