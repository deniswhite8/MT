var head = 1;
var map = {};
var state = 0;

$(document).ready(function(){

	var row = $("#row");
	row.children().eq(head).addClass("selected");
	
	$("#ok").click(function() {
		var text = $("#string").val();
		
		row.empty();
		row.append("<td>&lambda;</td>");
		for(var i = 0; i < text.length; i++)
			row.append("<td>"+ text[i] +"</td>");
		row.append("<td>&lambda;</td>");
		
		row.children().eq(head).addClass("selected");
	});
	
	$("#run").click(function() {
		var commands = $("#commands").val().replace(/ /g,'').split("\n");
		for(var i = 0; i < commands.length; i++)
		{
			var mas = commands[i].split("->");
			
			mas2 = mas[1].split("q");
			var _move = mas2[1][mas2[1].length-1];
			mas2[1] = mas2[1].slice(0, -1);
			var ch2 = mas2[0];
			var n2 = mas2[1];
			
			map[mas[0]] = {n:n2, ch:ch2, move:_move};
		}
		
		while(state != "z")
		{
			var ch = row.children().eq(head).text();
			var next = map[ch+"q"+state];
			if(next === undefined) alert("Not next instruction!");
			state = next.n;
			row.children().eq(head).text(next.ch);
			row.children().eq(head).removeClass("selected");
			if(next.move == "R") head++;
			else if(next.move == "L") head--;
			else if(next.move != "E") alert("R, L or E!");
			row.children().eq(head).addClass("selected");
		}
		
	});
	
});
