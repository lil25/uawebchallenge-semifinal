import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['startLatitude', 'startLongitude', 'destinationLatitude', 'destinationLongitude'],
    startLatitude: null,
    startLongitude: null,
    destinationLatitude: null,
    destinationLongitude: null,
    
    actions: {
        setCoordsQuery: function(params) {
            if(params.startLatitude || params.startLatitude === null) {this.set('startLatitude', params.startLatitude);}
            if(params.startLongitude || params.startLongitude === null) {this.set('startLongitude', params.startLongitude);}
            if(params.destinationLatitude || params.destinationLatitude === null) {this.set('destinationLatitude', params.destinationLatitude);}
            if(params.destinationLongitude || params.destinationLongitude === null) {this.set('destinationLongitude', params.destinationLongitude);}
        }
    }
});
