var for_flag = false;

function AddBranching(str, p1, offset, s)
{
	if (getRandomInt(15)>=2)
	{
		if (p1.includes("for"))
			for_flag = true;
		if ((p1.split('(').length < p1.split(')').length) && (for_flag == true))
			for_flag = false;
		
		return p1;
	}
	
	if ((p1.split('(').length != p1.split(')').length)||(p1.includes("break"))||(p1.includes("cotinue"))||(p1.includes("return"))||(p1.includes("_ib0string_mas")) ||(p1.includes("if")) 
	||(p1.includes("else")) || (for_flag == true))
	{
		if (p1.includes("for"))
			for_flag = true;
		if ((p1.split('(').length < p1.split(')').length) && (for_flag == true))
			for_flag = false;
		//alert(p1 + for_flag);
		return p1;
	}
	
	var a1 = getRandomInt(200);
	var a2 = a1, a3 = a1, a4 = a1;
	while(a2 == a1)
		a2 = getRandomIntMinMax(201, 400);
	while(a3 == a1)
		a3 = getRandomInt(200);
	while((a4 == a1) || (a4 == a3))
		a4 = getRandomInt(200);
	
	var variable = GenerateNewName();
	var outString = variable + '=' + a1 + ';';
	outString += "while(" + variable+'<' + a2 + ')';
	outString += "switch("+ variable+'){';
	outString += "case "+a1+':';
	outString +=variable+'='+a3+';'+"break;";
	outString += "case "+a3+':';
	outString +=variable+'='+a2+';'+p1+"break;";
	
	if (getRandomInt(2)==1)
	{
		outString += "case "+a4+':';
		var countCommand = getRandomInt(7);
		for (var i=0;i<countCommand;i++)
		{
			var indexCommand = getRandomInt(scriptCommand.length);
			outString+=scriptCommand[indexCommand];
		}
		outString += "break;";
	}
	outString +='}';
	//alert('p1: '+ p1+'\n' + outString);
	return outString;
}

function FindCommandForBranching(script)
{
	script = script.replace(/([^{};]*\;)/g, AddBranching);
	return script;
}