import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({

  queryParams: {
    location: {
      refreshModel: true
    },
    from: {
      refreshModel: true
    },
    to: {
      refreshModel: true
    }
  },

  setupController: function(controller, model) {

    controller.set('maxToDate', moment(moment().format('YYYY-MM-DD')));
    controller.set('model', model);
  },

  beforeModel: function(transition) {

    var qp = transition.queryParams;

    var location = qp.location || '';
    var from = qp.from || moment().subtract(1, 'months').format('YYYY-MM-DD');
    var to = qp.to || moment().format('YYYY-MM-DD');

    if (!qp.location || !qp.from || !qp.to) {
      this.transitionTo({queryParams: {location: location, from: from, to: to}});
    }

  },

  model: function(params) {
    return Ember.RSVP.hash({
      orders: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/statistics?' + 'location=' + params.location + '&start=' + params.from + '&end=' + params.to
      }).then(function(result) {
        var data = $.map(result.incoming.per_day, function(value, key) {
          return [[key, value]];
        });
        return [
          {
            name: 'beställningar',
            data: data
          }
        ];
      }),

      orderTypes: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/statistics?' + 'location=' + params.location + '&start=' + params.from + '&end=' + params.to
      }).then(function(result) {
        var data = $.map(result.order_types, function(outerValue) {
            return $.map(outerValue, function(innerValue, key) {
              return [[key, innerValue]];
          });
        });
        return [
          {
            name: 'Beställningstyp',
            data: data
          }
        ];
      }),

      deliverySources: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/statistics?' + 'location=' + params.location + '&start=' + params.from + '&end=' + params.to
      }).then(function(result) {
        var data = $.map(result.delivery_sources, function(outerValue) {
            return $.map(outerValue, function(innerValue, key) {
              return [[key, innerValue]];
          });
        });
        return [
          {
            name: 'Levererad från',
            data: data
          }
        ];
      }),

      locations: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/statistics?' + 'location=' + params.location + '&start=' + params.from + '&end=' + params.to
      }).then(function(result) {
        var data = $.map(result.locations, function(outerValue) {
            return $.map(outerValue, function(innerValue, key) {
              return [[key, innerValue]];
          });
        });
        return [
          {
            name: 'Handläggande bibliotek',
            data: data
          }
        ];
      }),

      orderPaths: Ember.$.ajax({
        url: ENV.APP.serviceURL + '/statistics?' + 'location=' + params.location + '&start=' + params.from + '&end=' + params.to
      }).then(function(result) {
        var data = $.map(result.order_paths, function(outerValue) {
            return $.map(outerValue, function(innerValue, key) {
              return [[key, innerValue]];
          });
        });
        return [
          {
            name: 'Beställningsväg',
            data: data
          }
        ];
      })

    });
  }
});
