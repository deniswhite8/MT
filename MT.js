var head = 0;

$(document).ready(function(){

	var row = $("#row");
	row.children().eq(head).addClass("selected");
	
	$("#ok").click(function() {
		var text = $("#text").val();
		
		row.empty();
		row.append("<td>&lambda;</td>");
		for(var i = 0; i < text.length; i++)
			row.append("<td>"+ text[i] +"</td>");
		row.append("<td>&lambda;</td>");
		
		row.children().eq(head).addClass("selected");
	});
});
