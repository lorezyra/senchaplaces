Ext.define('Places.view.grid.Excel', {
    extend: 'Ext.grid.Panel',
    xtype: 'excel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.feature.Grouping',
        'Ext.toolbar.Toolbar',
        'Ext.button.Segmented'
    ],

    dockedItems:[{
        xtype: 'toolbar',
        title: 'Grid',
        dock: 'top',
        items:[
        'Group: ',
        {
            xtype: 'segmentedbutton',
            items: [{
                handler: 'removeGrouper',
                pressed: true,
                text: 'None'
            },{
                handler: 'setGrouperYear',
                text: 'Year'
            }, {
                handler: 'setGrouperCategory',
                text: 'Category'
            }]
        }]
    }],

    plugins: [{
        ptype: 'clipboard'
    }],
    features: [{
        ftype:'groupingsummary'
    }],
    columns: [{
        text: 'Country',
        flex: 1,
        dataIndex: 'country',
        summaryType : 'count',
        summaryRenderer : function(value, records){
            return ( value + ' trips' );
        }
    },{
        text: 'City',
        flex: 1,
        dataIndex: 'city'           
    },{
        text: 'Category',
        flex: 1,
        dataIndex: 'category'
    },{
        text: 'Start Date',
        dataIndex: 'startdate-date',
        xtype : 'datecolumn', 
        format : 'd/m/Y'           
    },{
        text: 'End Date',
        dataIndex: 'enddate-date',
        xtype : 'datecolumn', 
        format : 'd/m/Y'            
    }]
});