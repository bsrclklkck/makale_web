
var notid = -1;

$(function () {
    $('#modalnot').on('show.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        notid = button.data("notid");

        $('#modalnot_body').load("/Not/NotGoster/" + notid);

    });
});