Ext.define('Places.utils.Spreadsheet', {
    singleton: true,

    //1. Create a Google Spreadsheet, with table headers.
    //2. File > Publish to web, copy the url:
    //3. Include tabletop.js https://github.com/jsoma/tabletop in app.json, refresh app
    //4. Code

    URL: '://docs.google.com/spreadsheets/d/1SzGJe2OBwnmGT5iNaJs9q7gowswR9il1Ey7UkchGIVg/pubhtml',

    getData: function(callback){
		Tabletop.init({ 
			key: Places.utils.Spreadsheet.URL,
            callback: callback
            //simpleSheet: true
        });
    },
    setViewModel: function(data){
    	var vm = Ext.ComponentQuery.query('app-main')[0].getViewModel();

    	for(key in data){
    		var key, fields,
	    		Model, columns, results;

    		Model = data[key],
    		results = Model.elements;

    		/*
    		 * Creation of Fields
    		 */ 
    		createFields = function(columns){
    			//creation of fields
    			var i = 0;
                var fields = [];

	    		for(i;i<columns.length;i++){
	    			var obj = new Object();
	    			obj.name = columns[i];
					if(columns[i].indexOf('-') !== -1){
						obj.type = columns[i].split('-')[1];
                        if(obj.type == 'date'){
                            obj.dateFormat = 'm/d/Y';

                            //custom
                            //we will see if we can put it in a different store.
                            if(obj.name == "startdate-date"){
                                fields.push({
                                    name: 'year',
                                    depends: 'startdate-date',
                                    convert: function(value, rec) {
                                        var date = rec.get("startdate-date");
                                        return Ext.Date.format(new Date(date), 'Y');
                                    }
                                });
                            }
                        }
					} else {
						obj.type = 'auto';
					}
	    			fields.push(obj);
	    		}
                return fields;
    		};

			/*
			* Defining a Sencha Model dynamically
			*/ 
    		defineModel = function(){
    			var fields = createFields(Model.column_names);

    			var model = Ext.define("Places.model." + Model.name, {
                	extend: "Ext.data.Model",
                	fields: fields
              	});

                //console.log(fields);
                return model;
    		};

			/*
			* Programmatically setting the ViewModel store in the VM
			*/ 
    		createDataStore = function(results){
    			var model = defineModel();
 
                var storeName = Model.name+"s",
                    obj = {};

                storeName = storeName.toLowerCase();

                obj[storeName] = {
                    model: "Places.model."+ Model.name,
                    data: results
                }

                vm.setStores(obj);
                Ext.ComponentQuery.query('app-main')[0].fireEvent('storecreated', storeName);
      
    		};
    		createDataStore(results);
    	}
    }



});