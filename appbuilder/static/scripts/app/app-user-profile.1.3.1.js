/*
|--------------------------------------------------------------------------
| Sales Overview Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {

  //
  // Weekly performance
  //

  var wpData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: 'Hours',
      fill: 'start',
      data: [5, 6.4, 7.2, 6, 9, 4.7, 7],
      backgroundColor: 'rgba(0, 123, 255, 1)',
      borderColor: 'rgba(0, 123, 255, 1)',
      pointBackgroundColor: '#FFFFFF',
      pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 0
    }]
  };

  var wpOptions = {
    responsive: true,
    scaleBeginsAtZero: true,
    legend: false,
    tooltips: {
      enabled: false,
      mode: 'index',
      position: 'nearest'
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: false
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  var soCtx = document.getElementsByClassName('user-profile-weekly-performance')[0];
  window.WeeklyPerformanceChart = new Chart(soCtx, {
    type: 'bar',
    data: wpData,
    options: wpOptions
  });

})(jQuery);
