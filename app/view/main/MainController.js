/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Places.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

	init: function() {
         this.listen({
             component: {
                 'app-main': {
                    storecreated: this.logger
                 }
             }
         });
    },

    logger: function(store){
    	console.log("this store is added to the viewmodel",
    		this.getViewModel().getStore(store)
    	);
    },

    setGrouperYear: function(){
    	var store = this.getViewModel().getStore('places');
    	store.setGrouper('year');
    },
    setGrouperCategory: function(){
    	var store = this.getViewModel().getStore('places');
    	store.setGrouper('category');
    },
    removeGrouper: function(btn){
    	var store = this.getViewModel().getStore('places');
    	store.clearGrouping();
    }
});
