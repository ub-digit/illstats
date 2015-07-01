import Ember from 'ember';
import ENV from '../config/environment';
import Location from '../models/location';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      locations: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/locations'
      }).then(function(result) {
        var locations = Ember.A([Location.create({name_sv: 'Alla', id: '', is_sigel: true})]);
        result.locations.forEach(function(location) {
          locations.pushObject(Location.create(location));
        });
        return locations;
      })
    });
  }

});
