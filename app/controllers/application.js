import Ember from 'ember';

export default Ember.Controller.extend({

  libraries: Ember.computed('model.locations', function() {
    return this.get('model.locations').map(function(item) {
      return {name: item.name_sv, label: item.label};
    });
  }),

});
