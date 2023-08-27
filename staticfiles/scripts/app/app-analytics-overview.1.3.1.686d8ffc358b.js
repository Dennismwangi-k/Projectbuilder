/*
|--------------------------------------------------------------------------
| Shards Dashboards: Analytics Overview Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {
  $(document).ready(function() {
    var colors = window.ShardsDashboards.colors;

    // Main header and sessions overview date range init.
    $('#analytics-overview-date-range').datepicker({});
    $('#sessions-overview-date-range').datepicker({});

    //
    // Small Stats
    //

    // Datasets
    var aoSmallStatsDatasets = [
      {
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(),
        data: [9, 3, 3, 9, 9],
      },
      {
        backgroundColor: colors.success.toRGBA(0.1),
        borderColor: colors.success.toRGBA(),
        data: [3.9, 4, 4, 9, 4]

      },
      {
        backgroundColor: colors.warning.toRGBA(0.1),
        borderColor: colors.warning.toRGBA(),
        data: [6, 6, 9, 3, 3]
      },
      {
        backgroundColor: colors.salmon.toRGBA(0.1),
        borderColor: colors.salmon.toRGBA(),
        data: [0, 9, 3, 3, 3]
      }
    ];

    // Options
    function aoSmallStatsOptions(max) {
      return {
        maintainAspectRatio: true,
        responsive: true,
        // Uncomment the following line in order to disable the animations.
        // animation: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
          custom: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: .33
          }
        },
        scales: {
          xAxes: [{
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: false,
            scaleLabel: false,
            ticks: {
              display: false,
              // Avoid getting the graph line cut of at the top of the canvas.
              // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
              suggestedMax: max
            }
          }],
        },
      };
    }

    // Generate the small charts
    aoSmallStatsDatasets.map(function (el, index) {
      var chartOptions = aoSmallStatsOptions(Math.max.apply(Math, el.data) + 1);
      var ctx = document.getElementsByClassName('analytics-overview-stats-small-' + (index + 1));
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
        options: chartOptions
      });
    });


    //
    // Analytics Overview Sessions
    //

    var aosCtx = document.getElementsByClassName('analytics-overview-sessions')[0];

    // Data
    var aosData = {
      labels: ["09:00 PM", "10:00 PM", "11:00 PM", "12:00 PM", "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"],
      datasets: [{
        label: 'Today',
        fill: 'start',
        data: [5, 5, 10, 30, 10, 42, 5, 15, 5],
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(1),
        pointBackgroundColor: colors.white.toHex(),
        pointHoverBackgroundColor: colors.primary.toRGBA(1),
        borderWidth: 1.5
      }, {
        label: 'Yesterday',
        fill: 'start',
        data: ['', 23, 5, 10, 5, 5, 30, 2, 10],
        backgroundColor: colors.salmon.toRGBA(0.1),
        borderColor: colors.salmon.toRGBA(1),
        pointBackgroundColor: colors.white.toHex(),
        pointHoverBackgroundColor: colors.salmon.toRGBA(1),
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0,
        pointBorderColor: colors.salmon.toRGBA(1)
      }]
    };

    // Options
    var aosOptions = {
      responsive: true,
      legend: false,
      elements: {
        line: {
          // A higher value makes the line look skewed at this ratio.
          tension: .38
        }
      },
      scales: {
        xAxes: [{
          gridLines: false,
          ticks: {
            callback: function (tick, index) {
              return index % 2 === 0 ? '' : tick;
            }
          }
        }],
        yAxes: [{
          ticks: {
            suggestedMax: 45
          }
        }]
      },
      // Uncomment the next lines in order to disable the animations.
      // animation: {
      //   duration: 0
      // },
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest'
      }
    };

    // Generate the Analytics Overview chart.
    var AnalyticsOverviewChart = new Chart(aosCtx, {
      type: 'line',
      data: aosData,
      options: aosOptions
    });

    // Generate the analytics overview chart labels.
    $("#analytics-overview-sessions-legend").html(AnalyticsOverviewChart.generateLegend());

    // Hide initially the first and last analytics overview chart points.
    // They can still be triggered on hover.
    var aocMeta = AnalyticsOverviewChart.getDatasetMeta(0);
    aocMeta.data[0]._model.radius = 0;
    aocMeta.data[aosData.datasets[0].data.length - 1]._model.radius = 0;

    // Render the chart.
    AnalyticsOverviewChart.render();


    //
    // Users by device doughnut chart
    //

    // Data
    var ubdData = {
      datasets: [{
        hoverBorderColor: colors.white.toRGBA(1),
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          colors.primary.toRGBA(0.9),
          colors.primary.toRGBA(0.5),
          colors.primary.toRGBA(0.3)
        ]
      }],
      labels: ["Desktop", "Tablet", "Mobile"]
    };

    // Options
    var ubdOptions = {
      legend: false,
      cutoutPercentage: 80,
      // Uncomment the following line in order to disable the animations.
      // animation: false,
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest'
      }
    };

    var ubdCtx = document.getElementsByClassName('analytics-users-by-device')[0];

    // Generate the users by device chart.
    window.ubdChart = new Chart(ubdCtx, {
      type: 'doughnut',
      data: ubdData,
      options: ubdOptions
    });


    //
    // Goals Overview Charts
    //

    var goDatasets = [{
      datasets: [{
        hoverBorderColor: '#fff',
        data: [57.2, 42.8],
        backgroundColor: [
          colors.primary.toRGBA(0.9),
          colors.athensGray.toRGBA(.8)
        ]
      }],
      labels: ["Label 1", "Label 2"]
    }, {
      datasets: [{
        hoverBorderColor: '#fff',
        data: [45.5, 54.5],
        backgroundColor: [
          colors.success.toRGBA(0.9),
          colors.athensGray.toRGBA(.8)
        ]
      }],
      labels: ["Label 1", "Label 2"]
    }, {
      datasets: [{
        hoverBorderColor: '#fff',
        data: [5.2, 94.8],
        backgroundColor: [
          colors.salmon.toRGBA(0.9),
          colors.athensGray.toRGBA(.8)
        ]
      }],
      labels: ["Label 1", "Label 2"]
    }, {
      datasets: [{
        hoverBorderColor: '#fff',
        data: [30.2, 69.8],
        backgroundColor: [
          colors.warning.toRGBA(0.9),
          colors.athensGray.toRGBA(.8)
        ]
      }],
      labels: ["Label 1", "Label 2"]
    }];

    var goOptions = {
      legend: false,
      responsive: false,
      cutoutPercentage: 70,
      animation: false,
      tooltips: false
    };

    [0, 1, 2, 3].forEach(function(index) {
      var goCtx = document.getElementById('analytics-overview-goal-completion-' + (index + 1));
      new Chart(goCtx, {
        type: 'doughnut',
        data: goDatasets[index],
        options: goOptions
      });
    });

    //
    // Users by country statistics
    //

    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(function() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Users'],
        ['United States', 12219],
        ['United Kingdom', 11192],
        ['Australia', 9291],
        ['Japan', 2291],
      ]);

      var options = {
        colorAxis: {colors: ['#B9C2D4', '#E4E8EF']},
        legend: false,
        width: '100%'
      };

      var chart = new google.visualization.GeoChart(document.getElementById('users-by-country-map'));

      function drawGeochart() {
        chart.draw(data, options);
      }

      drawGeochart();

      window.addEventListener('resize', drawGeochart);
    });
  });
})(jQuery);
