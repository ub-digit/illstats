import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  librariesBinding: 'controllers.application.libraries',

  queryParams: ['lib', 'from', 'to'],

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
      title: {
        text: null
      }
    },
    xAxis: {
      type: 'category'
    }
  },


  orderTypesData: Ember.computed('model.orderTypes', 'fromDate', 'toDate', function() {

    return [{
      name: 'Beställningstyper',
      data: this.get('model.orderTypes')
    }];
  }),

  orderTypesOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Beställningstyper'
    }
  },



  deliverySourceData: [{
    name: 'Leveransställen',
    data: [
      ['Libris', 50],
      ['Egen samling', 30],
      ['Subito', 10],
      ['OCLC', 6],
      ['Netpunkt', 8],
      ['Bibsys', 20],
      ['BLLD', 4],
      ['Övriga', 9]
    ]
  }],

  deliverySourceOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Leveransställen'
    }
  },

  orderPathData: [{
    name: 'Beställningsväg',
    data: [
      ['SFX', 15],
      ['Web', 35],
      ['Libris', 50]
    ]
  }],

  orderPathOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Beställningsväg'
    }
  },

  orderLibraryData: [{
    name: 'Mottagande bibliotek',
    data: [
      ['G', 30],
      ['Gp', 35],
      ['Gk', 50],
      ['Ge', 20],
      ['Gumu', 30],
      ['Gm', 100]
    ]
  }],

  orderLibraryOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Mottagande bibliotek'
    }
  }
});
