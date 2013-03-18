var head = 1;
var map = {};
var state = 0;

$(document).ready(function(){

	var row = $("#row");
	row.children().eq(head).addClass("selected");
	
	$("#ok").click(function() {
		head = 1;
		map = {};
		state = 0;
	
		var text = $("#string").val();
		
		row.empty();
		row.append("<td>&lambda;</td>");
		for(var i = 0; i < text.length; i++)
			row.append("<td>"+ text[i] +"</td>");
		row.append("<td>&lambda;</td>");
		
		row.children().eq(head).addClass("selected");
	});
	
	$("#run").click(function() {
		head = 1;
		map = {};
		state = 0;
		var commands = $("#commands").val().replace(/ /g,'').split("\n");
		for(var i = 0; i < commands.length; i++)
		{
			var mas = commands[i].split("->");
			
			var move1 = mas[1][mas[1].length-1];
			mas[1] = mas[1].substr(0, mas[1].length-1);
			
			var ch1 = mas[1][mas[1].length-1];
			mas[1] = mas[1].substr(0, mas[1].length-1);
			
			mas[1] = mas[1].substr(1);
			var n1 = mas[1];
			
			map[mas[0]] = {n:n1, ch:ch1, move:move1};
		}
		
		while(state != "z")
		{
			var ch = row.children().eq(head).text();
			var next = map["q"+state+ch];
			if(next === undefined) alert("Not next instruction!");
			state = next.n;
			row.children().eq(head).text(next.ch);
			row.children().eq(head).removeClass("selected");
			if(next.move == "R") 
			{
				head++;
				if(head == row.children().length-1) row.children().eq(head).after("<td>&lambda;</td>");
			}
			else if(next.move == "L")
			{
				head--;
				if(head == 0) row.children().eq(head).before("<td>&lambda;</td>");
				head = 1;
			}
			else if(next.move != "E") alert("R, L or E!");
			row.children().eq(head).addClass("selected");
		}
		
	});
	
});
