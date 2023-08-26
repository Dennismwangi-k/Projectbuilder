/*
|--------------------------------------------------------------------------
| Transaction History Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {

  // Initialize the DatePicker
  $('#transaction-history-date-range').datepicker({});

  // Initialize the Transaction History datatable.
  $('.transaction-history').DataTable({ responsive: true });

})(jQuery);
