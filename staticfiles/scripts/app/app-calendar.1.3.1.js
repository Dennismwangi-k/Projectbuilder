/*
|--------------------------------------------------------------------------
| Calendar Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {
  $(document).ready(function() {

    // Initialize the calendar
    $('#calendar').fullCalendar({
      events: 'https://fullcalendar.io/demo-events.json',
      header: {
        left: 'month,listWeek',
        center: 'title',
        right: 'prev,next'
      }
    });

  });
})(jQuery);
