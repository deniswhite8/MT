var head = 1;
var map = {};
var state = 0;
var running = false;
var delay = 500;

$(document).ready(function(){

	var row = $("#row");
	row.children().eq(head).addClass("selected");
	var table = $("#table");
	var tape = $("#tape");
	var cur_state = $("#cur_state");
	
	$("#string").keyup(init);
	init();
	if(!check()) createTable();
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
		cur_state.text("q"+state);
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
			map = {};
			if(check()) return;
			createTable();
			running = true;
			$("#ok").attr("disabled", "disabled");
			$("#string").attr("disabled", "disabled");
			$("#commands").attr("disabled", "disabled");
			$("#run").attr('value', 'Сброс');
			
			setTimeout(run, delay);
		}
		
	});
	
	function check()
	{
		var ins = false;
		var commands = $("#commands").val().replace(/^\s+|\s+$/g, '').split("\n");
		for(var i = 0; i < commands.length; i++)
		{
			if(commands[i] == "") continue;
			
			ins = true;
			
			if(!(/^q\d+\S->q([z]|[\d]+)\S[RLE]$/.test(commands[i])))
			{
				alert("incorrect instruction: " + commands[i]);
				return 1;
			}
			
			var mas = commands[i].split("->");

			var move1 = mas[1][mas[1].length-1];
			mas[1] = mas[1].substr(0, mas[1].length-1);
	
			var ch1 = mas[1][mas[1].length-1];
			mas[1] = mas[1].substr(0, mas[1].length-1);
	
			mas[1] = mas[1].substr(1);
			var n1 = mas[1];
		
			if(map[mas[0]] === undefined) map[mas[0]] = {n:n1, ch:ch1, move:move1};
			else
			{
				alert("Repeat for: " + mas[0]);
				return 1;
			}
		}
		
		if(!ins) 
		{
			alert("Not given instructions!");
			return 1;
		}
		return 0;
	}
	
	function run()
	{
		if(state != "z" && running)
		{
			if(!step()) setTimeout(run, delay);
		}
		else if(state == "z")
		{
			alert("Машина удачно закончила свою работу в состоянии qz");
		}
	}

	function step()
	{
		var maxWidth = tape[0].scrollWidth - tape[0].clientWidth + 100;
		var count = row.children().length;
		
		var ch = row.children().eq(head).text();
		var next = map["q"+state+ch];
		if(next === undefined)
		{
			alert("Not next instruction!");
			return 1;
		}
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
		
		tape.scrollLeft(head/count*maxWidth);
		
		row.children().eq(head).addClass("selected");
		cur_state.text("q"+state);
		return 0;
	}
	
	function createTable()
	{
		table.empty();
		var _q = [], _c = [], q = [], c = [];
		for(var key in map)
		{
			var str = key.substr(1);
			_c.push(str[str.length-1]);
			_q.push(str.substr(0, str.length-1));
		}
		_q.sort(function(a,b){return parseInt(a)-parseInt(b)});
		_c.sort();
		
		var old = -1;
		for(var i = 0; i < _q.length; i++)
		{
			if(_q[i] != old)
			{
				q.push(_q[i]);
				old = _q[i];
			}
		}
		q.push("z");
		old = -1;
		for(var i = 0; i < _c.length; i++)
		{
			if(_c[i] != old)
			{
				c.push(_c[i]);
				old = _c[i];
			}
		}
		
		var str = "<tr><th></th>";
		for(var i = 0; i < c.length; i++)
		{
			str += "<th>" + c[i] + "</th>"
		}
		str += "</tr>";
		
		for(var i = 0; i < q.length; i++)
		{
			str += "<tr><th>q" + q[i] + "</th>";
			for(var j = 0; j < c.length; j++)
			{
				var obj = map["q"+q[i]+c[j]];
				if(obj !== undefined) str += "<td>q" + obj.n + "" + obj.ch + "" + obj.move + "</td>"
				else str += "<td></td>"
			}
			str += "</tr>";
		}
		
		table.append(str);
	}
	
	
	// $("#lenta").mouseenter(function(){$("#tape").addClass("focus_div");});
	// $("#lenta").mouseleave(function(){$("#tape").removeClass("focus_div");});
	
	// $("#yy").mouseenter(function(){$("#control").addClass("focus_div");});
	// $("#yy").mouseleave(function(){$("#control").removeClass("focus_div");});
	
	// $("#tblc").mouseenter(function(){$("#table_div").addClass("focus_div");});
	// $("#tblc").mouseleave(function(){$("#table_div").removeClass("focus_div");});
	
	// $("#z").mouseenter(function(){$("#string").addClass("focus_text");});
	// $("#z").mouseleave(function(){$("#string").removeClass("focus_text");});
	
	// $("#k").mouseenter(function(){$("#commands").addClass("focus_text");});
	// $("#k").mouseleave(function(){$("#commands").removeClass("focus_text");});
	
	// $("#btn").mouseenter(function(){$("#run").addClass("focus_run");});
	// $("#btn").mouseleave(function(){$("#run").removeClass("focus_run");});
	
});
