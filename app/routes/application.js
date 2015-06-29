import Ember from 'ember';
import Location from '../models/location';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      locations: Ember.$.ajax({
        url: 'http://fjarrkontrollen-server.ub.gu.se/locations'
      }).then(function(result) {
        var locations = Ember.A([Location.create({name_sv: 'Alla', id: 0, is_sigel: true})]);
        result.locations.forEach(function(location) {
          locations.pushObject(Location.create(location));
        });
        return locations;
      })
    });
  }

});
