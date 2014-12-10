Ext.define('D3.Base', {
	extend: 'Ext.Component',
	xtype: 'd3visualization',

	config: {
		store: ''
	},

	scrollable: true,

	listeners: {
		afterrender: {
			fn: 'drawBubbles',
			scope: 'this'
		}
	},

    //the applyStore, bindStore and unBindStore,
    //where just copied from a Sencha component
    //I just looked into one of the Sencha chart classes.
    //http://dev.sencha.com/ext/5.0.1/examples/kitchensink/?charts=true#all

	applyStore: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },

	bindStore: function(store, initial) {
        var me = this,
            view = me.getView(),
            bufferedRenderer = me.bufferedRenderer;

        // Normally, this method will always be called with a valid store (because there is a symmetric
        // .unbindStore method), but there are cases where this method will be called and passed a null
        // value, i.e., a panel is used as a pickerfield. See EXTJS-13089.
        if (store) {
            // Bind to store immediately because subsequent processing looks for grid's store property
            me.store = store;

            // If we're in a reconfigure (we already have a BufferedRenderer which is bound to our old store),
            // rebind the BufferedRenderer
            if (bufferedRenderer && bufferedRenderer.isBufferedRenderer && bufferedRenderer.store) {
                bufferedRenderer.bindStore(store);
            }

            if (view.store !== store) {
                // If coming from a reconfigure, we need to set the actual store property on the view. Setting the
                // store will then also set the dataSource.
                //
                // Note that if it's a grid feature then this is sorted out in view.bindStore(), and it's own
                // implementation of .bindStore() will be called.
                view.bindStore(store, false);
            }

            me.mon(store, {
                load: me.onStoreLoad,
                scope: me
            });
            me.storeRelayers = me.relayEvents(store, [
                /**
                 * @event filterchange
                 * @inheritdoc Ext.data.Store#filterchange
                 */
                'filterchange',
                /**
                 * @event groupchange
                 * @inheritdoc Ext.data.Store#groupchange
                 */
                'groupchange'
            ]);
        } else {
            me.unbindStore();
        }
    },

    unbindStore: function() {
        var me = this,
            store = me.store,
            view;

        if (store) {
            me.store = null;

            me.mun(store, {
                load: me.onStoreLoad,
                scope: me
            });

            Ext.destroy(me.storeRelayers);

            view = me.view;
            if (view.store) {
                view.bindStore(null);
            }
        }
    },

    drawBubbles: function(){
        /* This will be the most difficult part,
        writing D3 code :) - I just used a tutorial */

    	var me = this,
        dom = this.getEl().dom, //the generated sencha DOM
        data = me.getStore(); //the store which was bound

    	var bubble = d3.layout.pack().sort(null).size([960,560]).padding(1.5),
    		data = this.getData(data);

    	var a = bubble.nodes(data);

    	//draw the component
		var svg = d3.select(dom)
            .append("svg")
            .attr("width",960)
            .attr("height", 560)
            .attr("class","bubble");

         	//For each “leaf” we then need to create a graphical element. 
         	//D3.js uses a very clever approach for this.
         	//The key thing here is the data() method. We pass this the bubble layout we created earlier, and ask it to create the nodes based on our root object. (We also filter out the root node itself as we’re not interested in drawing that, just the individual leaf nodes.) The enter() method is then called for each leaf node in the tree, which appends a <g> element to the <svg> element in our HTML document, and applies the transform property to it to place it at the correct x and y coordinates within the chart.
         	var node = svg.selectAll(".node")
              .data(bubble.nodes(data)
              .filter(function(d){ return !d.children;}))
              .enter()
              .append("g")
              .attr("class","node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            var colour = d3.scale.category10();
			node.append("circle")
			    .attr("r", function(d) { return d.r; })
			    .style("fill", function(d) { return colour(d.name); });
			node.append("text")
			    .attr("dy", ".3em")
			    .style("text-anchor", "middle")
			    .text(function(d) { return d.name; });


    },
    getData: function(root){
        /* This method is required for D3.
        D3 requires hierarchical data.
        If I would have used a TreeStore
        this was probably not required,
        but I used a normal store for my Excel data */

		var data = [],
	  	i = 0,
	  	result = {},
	  	myarr = [];
	 
	    //create a flat array of all countries
		root.each(function(rec){
			data.push(rec.getData().country);
		});

		//count all countries
		for(i = 0; i < data.length; i++) {
	    	if(!result[data[i]]) result[data[i]] = 0;
	    	++result[data[i]];
		}

		//make the object
		for(key in result){
			var obj = {};
			obj.name = key,
			obj.value = Number(result[key])
			myarr.push(obj);
		}

		console.log(myarr);
	  	return {children: myarr};
    }
});