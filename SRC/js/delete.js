$(function() {
	$("#delete").click(function() {
		var tr = $(this).parent().parent();
		$.getJSON($(this).attr("href"), function() {
			$(tr).addClass("deleted");
		});
	});
});