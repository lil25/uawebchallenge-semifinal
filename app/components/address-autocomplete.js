import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import Ember from 'ember';
import $ from 'jquery';

export default AutoComplete.extend({
    options: [],
    classNames: ['address_field'],
    valueProperty: 'address',
    suggestions: function() {
        return this.get('options');
    }.property('inputVal', 'options.[]'),
    optionsToMatch: function() {
        var caseInsensitiveOptions = [];
        
        this.get('options').forEach(function(item) {
            var value = item.get('address');
            
            caseInsensitiveOptions.push(value);
            caseInsensitiveOptions.push(value.toLowerCase());
        });
        
        return caseInsensitiveOptions;
    }.property('options.[]'),
    
    getOptions: function() {
        var self = this;
        var inputVal = self.get('inputVal') || '';
        
        if(inputVal.length >= 3) {
            $.get('/api/address-autocomplete', {
                addr: inputVal
            })
                .done(function(data) {
                    var tmpArray = [];
                
                    data.addresses.forEach(function(address) {
                        tmpArray.push(Ember.Object.create(address));
                    });

                    self.set('options', tmpArray);
                });
        }
        else {
            self.set('options', []);
        }
    }.observes('inputVal')
});
