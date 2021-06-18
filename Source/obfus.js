function RemoveComment(script)
{ 
	return script.replace(/("(?:[^\r\n\\"]|\\.)*"|'(?:[^\r\n\\']|\\.)*'|\/[^*\/]([^\\\/]|\\.)*\/[gm]*)|\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, '$1');
}

function RemoveLineBreaks(script)
{ 
	return script.replace(/([\n\r])/g, ' ');
}

function RemoveDoubleSpace(script)
{ 
	script = script.replace(/[ ]+/g, ' ');
	script = script.replace(/[ ]?=[ ]?/g, '=');
	script = script.replace(/[ ]?\-[ ]?/g, '-');
	script = script.replace(/[ ]?\+[ ]?/g, '+');
	script = script.replace(/[ ]?\*[ ]?/g, '*');
	script = script.replace(/[ ]?\%[ ]?/g, '%');
	script = script.replace(/[ ]?\/[ ]?/g, '\/');
	
	script = script.replace(/[ ]?;[ ]?/g, ';');
	script = script.replace(/[ ]?,[ ]?/g, ',');
	
	script = script.replace(/[ ]?\{[ ]?/g, '{');
	script = script.replace(/[ ]?\}[ ]?/g, '}');
	script = script.replace(/[ ]?\([ ]?/g, '(');
	script = script.replace(/[ ]?\)[ ]?/g, ')');
	script = script.replace(/[ ]?\[[ ]?/g, '[');
	script = script.replace(/[ ]?\][ ]?/g, ']');
	
	script = script.replace(/[ ]?\![ ]?/g, '!');
	script = script.replace(/[ ]?\?[ ]?/g, '?');
	script = script.replace(/[ ]?\:[ ]?/g, ':');
	script = script.replace(/[ ]?\<[ ]?/g, '<');
	script = script.replace(/[ ]?\>[ ]?/g, '>');
	script = script.replace(/[ ]?\^[ ]?/g, '^');
	return script;
}


var indexString = 0;
var string_mas = '';

function utf8_to_b64(str) 
{
	return window.btoa(unescape(encodeURIComponent(str)));
}

function replacerString(str, p1, p3, offset, s)
{
	if (indexString)
		string_mas+=',';
	str = str.replace(/\\n/g, '\n');
	//alert(str+' type:'+ typeof(str));
	string_mas+='\''+utf8_to_b64(str.substring(1,str.length-1))+'\'';
	indexString++;
	return 'b64_to_utf8('+(indexString-1)+')';
}

function StringEncoding(script)
{
	indexString = 0;
	string_mas = 'var _ib0string_mas=[';
	script = script.replace(/('(\\.|[^'\\])*')|("(\\.|[^"\\])*")/g, replacerString);
	string_mas+='];'
	var string_decoding = 'function b64_to_utf8(index){return decodeURIComponent(escape(window.atob(_ib0string_mas[index])));}';
	return string_mas+string_decoding+script;
}



function getRandomIntMinMax(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}

function BaseChange(number)
{
	var randomOption = getRandomInt(4);
	if (randomOption == 1)
		return number.toString();
	else if (randomOption == 2)
		return '0o'+number.toString(8);
	else
		return '0x'+number.toString(16);
}

function NumberChangeOption(str, p1, p2, p3, offset, s)
{
	var randomOption = getRandomInt(5);
	//var randomOption = 1;
	var Number1, Number2;
	var number = parseInt(str.substring(1, str.length-1), 10);
	//alert(number);
	if (randomOption == 1)
	{
		Number1 = getRandomInt((number+1)*10);
		if (number < Number1)
		{
			Number2 = Number1 - number;
			return 	p1+'('+BaseChange(Number1)+'-'+ BaseChange(Number2)+')'+p3;
		}
		else
		{
			Number2 = number - Number1;
			return 	p1+'('+BaseChange(Number1)+'+'+BaseChange(Number2)+')'+p3;
		}
	}
	else if (randomOption == 2)
	{
		return p1+BaseChange(number)+p3;
	}
	else if (randomOption == 3)
	{
		Number1 = getRandomIntMinMax((number+1), (number+1)*10);
		Number2 = Number1*getRandomInt(100)+number;
		return p1+'('+BaseChange(Number2)+'%'+BaseChange(Number1)+')'+p3;
	}
	else
	{
		Number1 = getRandomInt((number+1)*10);
		Number2 = number^Number1; 
		return p1+'('+BaseChange(Number2)+'^'+BaseChange(Number1)+')'+p3;
	}
	return p1+p2+p3;
}

function NumberChange(script)
{
	script = script.replace(/([^_a-zA-Z\.0-9])([0-9]+)([^_a-zA-Z\.0-9])/g, NumberChangeOption);
	return script;
}