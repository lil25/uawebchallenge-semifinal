import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'section',
    classNames: ['left-sidebar__block'],
    routeStatusColor: Ember.computed(function() {
        var colorName;
        
        switch(this.get('routeData.status')) {
            case 'danger':
                colorName = 'red';
            break;
            
            case 'medium':
                colorName = 'yellow';
            break;
            
            case 'safe':
                colorName = 'green';
            break;
        }
        
        return colorName;
    }),
    isRouteVisible: true,
    isMarkersVisible: true,
    totalWounded: Ember.computed(function() {
        var num = 0;
        
        this.get('routeData.accidents').forEach(function(accident) {
            num += accident.wounded;
        });
        
        return num;
    }),
    totalDeceased: Ember.computed(function() {
        var num = 0;
        
        this.get('routeData.accidents').forEach(function(accident) {
            num += accident.deceased;
        });
        
        return num;
    }),
    
    actions: {
        toggleRoute: function() {
            this.toggleProperty('isRouteVisible');
            this.sendAction('toggleRoute', this.get('index'));
        },
        
        toggleMarkers: function() {
            this.toggleProperty('isMarkersVisible');
            this.sendAction('toggleMarkers', this.get('index'));
        },
        
        showDetails: function() {
            this.sendAction('showDetails', this.get('index'));
        }
    }
});
