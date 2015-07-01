import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  librariesBinding: 'controllers.application.libraries',

  queryParams: ['location', 'from', 'to'],

  fromDate: Ember.computed('from', function(key, value) {
    if (arguments.length > 1) {
      this.set('from', value.format('YYYY-MM-DD'));
    }
    return moment(this.get('from'));
  }),

  toDate: Ember.computed('to', function(key, value) {
    if (arguments.length > 1) {
      this.set('to', value.format('YYYY-MM-DD'));
    }
    return moment(this.get('to'));
  }),

  maxFromDate: Ember.computed('to', function() {

    return this.get('to') ? moment(this.get('to')) : moment(moment().format('YYYY-MM-DD'));

  }),

  minToDate: Ember.computed('from', function() {
    return this.get('from') ? moment(this.get('from')) : moment(moment().format('YYYY-MM-DD'));
  }),

  icons: {
    next: "fa fa-chevron-right",
    previous: "fa fa-chevron-left"
  },

  numberOfOrders: Ember.computed('model.orders', function() {
    var sum = 0;
    this.get('model.orders.0.data').forEach(function(item) {
      sum += item[1];
    });
    return sum;
  }),


  numberOfOrdersChartData: Ember.computed.alias('model.orders'),

  numberOfOrdersChartOptions: {
    chart: {
      type: 'line'
    },
    legend: {
      enabled: false
    },
    title: {
      text: null
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: null
      }
    },
    xAxis: {
      type: 'category'
    }
  },


  orderTypesData: Ember.computed.alias('model.orderTypes'),

  orderTypesOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Beställningstyp'
    }
  },



  deliverySourceData: Ember.computed.alias('model.deliverySources'),

  deliverySourceOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Levererad från'
    }
  },


  orderPathData: Ember.computed.alias('model.orderPaths'),

  orderPathOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Beställningsväg'
    }
  },


  orderLibraryData: Ember.computed.alias('model.locations'),

  orderLibraryOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Handläggande bibliotek'
    }
  }
});
