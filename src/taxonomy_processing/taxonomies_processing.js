var tax = {

	_config: {},

	config: function(config_json){
		this._config = config_json;
		return this;
	},

	createMap: function(tax1,tax2){

		this._tax1 = {};
		this._tax2 = {};
		parent = this;
		this_dataLoaded =0;

		this.init = function(){
			if(tax._config == {}){
				console.log('Error! Load valid config file first!');
				return;
			}

			tax._config.forEach(function(taxonomy){
				if(taxonomy.name == tax1){
					parent._tax1 = taxonomy;
				}
				if(taxonomy.name == tax2){
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

			$.when(tax1Call,tax2Call).then(function(tax1Args,tax2Args){
				let map = parent._createMap(tax1Args[0],tax2Args[0]);
				parent._readyFunction(map);
			});
		}

		this._createMap = function(map1,map2){
			let map = {};
			for(subTerm in map1){
				let baseTerms = map1[subTerm];
				subTerms2 = parent._getSubTermsFromBaseTerms(baseTerms,map2);
				map[subTerm] = subTerms2;
			}
			return map;
		}

		this._getSubTermsFromBaseTerms = function(baseTerms,map){
			let subTerms = [];
			for(subTerm2 in map){
				let baseTerms2 = map[subTerm2];
				if(this._compareArrays(baseTerms,baseTerms2) == true){
					subTerms.push(subTerm2);
				}
			}
			return subTerms;
		}

		this._compareArrays = function (arr1, arr2) {
		    return arr2.some(function (v) {
		        return arr1.indexOf(v) >= 0;
		    });
		};


		this._loadTaxonomy = function(url){
			return $.ajax({url: url,
				success: function(result){
					return result;
			    }
			});
		}

		this.ready = function(f){
			this._readyFunction = f;
		}

		this._readyFunction = function(map){
			return map;
		}

		this.init();
	}

}