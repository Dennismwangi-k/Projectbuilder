/*
|--------------------------------------------------------------------------
| File Manager Template
|--------------------------------------------------------------------------
*/

'use strict';

(function ($) {

  //
  // List style file manager.
  //

  // Initialize the File Manager datatable.
  $('.file-manager-list').DataTable({
    responsive: true,
    order: [[ 0, 'desc' ]] // Default sort by file type.
  });

  //
  // Card style file manager.
  //

  // Toggle the input's selected class when clicked.
  // This is placeholder code to demonstrate how each card
  // looks when selected.

  $('.file-manager__item').click(function () {
    $(this).toggleClass('file-manager__item--selected');
  });

})(jQuery);
