import Ember from 'ember';

export default Ember.Route.extend({
    leaveRoute: function() {
        this.controllerFor('index').set('startingPoint', null);
        this.controllerFor('index').set('destinationPoint', null);
    }.on('deactivate')
});
