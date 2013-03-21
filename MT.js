var head = 1;
var map = {};
var state = 0;
var running = false;
var delay = 500;

$(document).ready(function(){

	var row = $("#row");
	row.children().eq(head).addClass("selected");
	
	$("#ok").click(init);
	init();
	function init()
	{
		head = 2;
		map = {};
		state = 0;
		running = false;
	
		var text = $("#string").val();
		
		row.empty();
		row.append("<td>...</td>");
		row.append("<td>&lambda;</td>");
		for(var i = 0; i < text.length; i++)
			row.append("<td>"+ text[i] +"</td>");
		if(text == "") row.append("<td>&lambda;</td>");
		row.append("<td>&lambda;</td>");
		row.append("<td>...</td>");
		
		row.children().eq(head).addClass("selected");
	}
	
	function reset()
	{
		running = false;
		$("#ok").removeAttr("disabled");
		$("#string").removeAttr("disabled");
		$("#commands").removeAttr("disabled");
		$("#run").attr('value', 'Старт');
		init();
	}
	
	$("#run").click(function() {
		if(running)
		{
			reset();
		}
		else
		{
			var ins = false;
			var commands = $("#commands").val().replace(/ /g,'').split("\n");
			for(var i = 0; i < commands.length; i++)
			{
				if(commands[i] == "") continue;
				
				ins = true;
				
				if(!(/^q\d+\S->q([z]|[\d]+)\S[RLE]$/.test(commands[i])))
				{
					alert("incorrect instruction: " + commands[i]);
					return;
				}
				
				var mas = commands[i].split("->");

				var move1 = mas[1][mas[1].length-1];
				mas[1] = mas[1].substr(0, mas[1].length-1);
		
				var ch1 = mas[1][mas[1].length-1];
				mas[1] = mas[1].substr(0, mas[1].length-1);
		
				mas[1] = mas[1].substr(1);
				var n1 = mas[1];
			
				map[mas[0]] = {n:n1, ch:ch1, move:move1};
			}
			
			if(!ins) 
			{
				alert("Not given instructions!");
				return;
			}
			
			running = true;
			$("#ok").attr("disabled", "disabled");
			$("#string").attr("disabled", "disabled");
			$("#commands").attr("disabled", "disabled");
			$("#run").attr('value', 'Сброс');
			
			setTimeout(run, delay);
		}
		
	});
	
	function run()
	{
		if(state != "z" && running)
		{
			step();
			setTimeout(run, delay);
		}
		else if(state == "z")
		{
			alert("Машина удачно закончила свою работу в состоянии qz");
		}
	}

	function step()
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
			if(head == row.children().length-2) row.children().eq(head).after("<td>&lambda;</td>");
		}
		else if(next.move == "L")
		{
			head--;
			if(head == 1)
			{
				row.children().eq(head).before("<td>&lambda;</td>");
				head = 2;
			}
		}
		else if(next.move != "E") alert("R, L or E!");
		
		row.children().eq(head).addClass("selected");
	}
	
});
