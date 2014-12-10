/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Places.view.main.Main', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Places.view.main.MainController',
        'Places.view.main.MainModel',
        'Places.view.grid.Excel',
        'Ext.window.Window',
        'Ext.ux.GMapPanel',
        'D3.Base'
    ],
    plugins: 'viewport',
    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'fit'
    },

    ui: 'navigation',
    tabPosition: 'left',
    tabRotation: 0,

    defaults: {
        textAlign: 'left'
    },
    // dockedItems: [{
    //   xtype: 'component',
    //   padding: 10,
    //   dock: 'top',
    //   html: '<h1>Where\'s Lee?</h1>'
    // }],

    //the view should also be created dynamic
    items: [{
        xtype: 'excel',
        title: 'Sheet',
        bind: {
            title: '{name}',
            store: '{places}'
        }
    }, 
    {
        title: 'Visualization',
        xtype: 'd3visualization',
        bind: {
            store: '{places}'
        }
    }, 
    {
        title: 'Google Map',
        xtype: 'gmappanel',
        gmapType: 'map',
        center: {
            geoCodeAddr: "Overtoom 310 Amsterdam",
            marker: {
                title: 'Lee'
            }
        },
        mapOptions : {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 4
        }

        // listeners: {
        //   afterrender: function(comp){

        // Ext.create('Ext.window.Window', {
        //     title: 'Sheet',
        //     height: 500,
        //     width: 500,
        //     x: 80,
        //     y: 65,
        //     closable: false,
        //     collapsible: true,
        //     draggable: true,
        //     layout: 'fit',
        //     constrain: true,
        //     //constrainTo: comp.getEl().dom,
        //     items: [{
        // xtype: 'excel',
        // bind: {
        //     //title: '{name}',
        //     store: '{places}'
        // }
        //     }]
        // }).show();

        //   }
        // }
    }]
});
