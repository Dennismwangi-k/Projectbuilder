/*
|--------------------------------------------------------------------------
| eCommerce Overview Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {
  $(document).ready(function() {
    var colors = window.ShardsDashboards.colors;

    // Main header date range.
    $('#sales-overview-date-range').datepicker({});
    $('#sales-report-date-range').datepicker({});

    //
    // Sales Overview - Small Stats
    //

    // Datasets
    var soSmallStatsDatasets = [
      {
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(),
        data: [4, 4, 4, 9, 20]
      },
      {
        backgroundColor: colors.success.toRGBA(0.1),
        borderColor: colors.success.toRGBA(),
        data: [1, 9, 1, 9, 9]
      },
      {
        backgroundColor: colors.warning.toRGBA(0.1),
        borderColor: colors.warning.toRGBA(),
        data: [9, 9, 3, 9, 9]
      },
      {
        backgroundColor: colors.salmon.toRGBA(0.1),
        borderColor: colors.salmon.toRGBA(),
        data: [3, 3, 4, 9, 4]
      }
    ];

    // Options
    var soSmallStatsOptions = {
      responsive: true,
      // Uncomment the following line in order to disable the animations.
      // animation: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [{
          gridLines: false,
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: false,
          ticks: {
            display: false
          }
        }]
      },
    };

    // Generate charts
    soSmallStatsDatasets.forEach(function (el, index) {
      const ctx = document.getElementsByClassName('sales-overview-small-stats-' + (index + 1));
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
          datasets: [{
            label: 'Today',
            fill: 'start',
            data: el.data,
            backgroundColor: el.backgroundColor,
            borderColor: el.borderColor,
            borderWidth: 1.5
          }]
        },
        options: soSmallStatsOptions
      });
    });

    //
    // Sales Report
    //

    var soData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
      datasets: [{
        label: 'Profit',
        fill: 'start',
        data: [28922, 25317, 23182, 32119, 11291, 8199, 25182, 22120, 10219, 8771, 12992, 8221],
        backgroundColor: 'rgba(0, 123, 255, 1)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: '#FFFFFF',
        pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1.5
      }, {
        label: 'Shipping',
        fill: 'start',
        data: [2892, 2531, 2318, 3211, 1129, 819, 2518, 2212, 1021, 8771, 1299, 820],
        backgroundColor: 'rgba(72, 160, 255, 1)',
        borderColor: 'rgba(72, 160, 255, 1)',
        pointBackgroundColor: '#FFFFFF',
        pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1.5
      }, {
        label: 'Tax',
        fill: 'start',
        data: [1400, 1250, 1150, 1600, 500, 400, 1250, 1100, 500, 4000, 600, 500],
        backgroundColor: 'rgba(153, 202, 255, 1)',
        borderColor: 'rgba(153, 202, 255, 1)',
        pointBackgroundColor: '#FFFFFF',
        pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1.5
      }]
    };

    var soOptions = {
      legend: false,
      // Uncomment the following line in order to disable the animations.
      // animation: false,
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest'
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: false
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            userCallback: function (label, index, labels) {
              return label > 999 ? (label / 1000).toFixed(0) + 'k' : label;
            }
          }
        }]
      }
    };

    var soCtx = document.getElementsByClassName('sales-overview-sales-report')[0];
    window.SalesOverviewChart = new Chart(soCtx, {
      type: 'bar',
      data: soData,
      options: soOptions
    });

    // Generate the sales overview chart label.
    $("#sales-overview-sales-report-legend").html(SalesOverviewChart.generateLegend());


    //
    // Users by country statistics
    //

    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(function () {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Sales'],
        ['United States', 12219],
        ['United Kingdom', 11192],
        ['Australia', 9291],
        ['Japan', 2291],
      ]);

      var options = {
        colorAxis: {
          colors: ['#B9C2D4', '#E4E8EF']
        },
        legend: false
      };

      var chart = new google.visualization.GeoChart(document.getElementById('users-by-country-map'));

      function drawGeochart() {
        chart.draw(data, options);
      }

      drawGeochart();
      window.addEventListener('resize', drawGeochart);
    });
  })
})(jQuery);
