$(document).ready(function () {
    $('#score').DataTable(
        {
            "paging": true,
            "pagingType": "simple"
        }
    );
    $('.dataTables_length').addClass('bs-select');
  });