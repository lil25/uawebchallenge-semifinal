import Ember from 'ember';

export default Ember.Controller.extend({
    startingPoint: null,
    destinationPoint: null,
    isDisabled: Ember.computed('startingPoint', 'destinationPoint', function() {
        return !(this.get('startingPoint') && this.get('destinationPoint'));
    }),
    
    actions: {
        startingPointSelected: function(item) {
            this.set('startingPoint', item);
        },
        
        destinationPointSelected: function(item) {
            this.set('destinationPoint', item);
        },
        
        showRoute: function() {
            if(!this.get('isDisabled')) {
                this.transitionToRoute('map', {
                    queryParams: {
                        startLatitude: this.get('startingPoint.latitude'),
                        startLongitude: this.get('startingPoint.longitude'),
                        destinationLatitude: this.get('destinationPoint.latitude'),
                        destinationLongitude: this.get('destinationPoint.longitude')
                    }
                });
            }
        }
    }
});
