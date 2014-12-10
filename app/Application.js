/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Places.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Places',

    requires: ['Places.utils.Spreadsheet', 'Places.view.main.Main'],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function (data, tabletop) {
        Places.utils.Spreadsheet.getData(function(data, tabletop){
            Ext.create('Places.view.main.Main');

        	Places.utils.Spreadsheet.setViewModel(data);
        });
    }
});
