import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    lib: {
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

    var lib = qp.lib || '0';
    var from = qp.from || moment().subtract(1, 'months').format('YYYY-MM-DD');
    var to = qp.to || moment().format('YYYY-MM-DD');

    if (!qp.lib || !qp.from || !qp.to) {
      this.transitionTo({queryParams: {lib: lib, from: from, to: to}});
    }

  },

  model: function(params) {
    return Ember.RSVP.hash({
      orders: Ember.$.ajax({
        url: '/orders.json'
      }).then(function(result) {

        var data = result.filter(function(item) {
          return (item.date >= params.from && item.date <= params.to);
        }).map(function(order) {
          return [order.date, order.value];
        });

        return [
          {
            name: 'Beställningar/fjärrlån',
            data: data
          }
        ];

      }),
      orderTypes: Ember.$.ajax({
        url: '/orderTypes.json'
      })
    });
  }
});
