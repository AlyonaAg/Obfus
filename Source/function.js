var scriptCommand = [];
var nameNewFunc = [];

function AddNewFunctions(str, p1, offset, s)
{
	result = "";
	var countFunc = getRandomInt(5);
	
	for (var i=0;i<countFunc-1;i++)
		result+=GenerateNewFunctions();
	
	return result+p1;
}

function GenerateNewFunctions()
{
	var funcName = GenerateNewName();
	nameNewFunc.push(funcName);
	
	var func = "function "+funcName+"(";
	
	var countParam = getRandomInt(5);
	for (var i=0;i<countParam-1;i++)
		func+=GenerateNewName()+",";
	func+=GenerateNewName()+"){";
	
	var countCommand = getRandomInt(20);
	for (var i=0;i<countCommand;i++)
	{
		var indexCommand = getRandomInt(scriptCommand.length);
		func+=scriptCommand[indexCommand];
	}
	
	if (getRandomInt(2) == 1)
		func+="return "+GenerateNewName()+";";
	
	func+="}";	
	//alert(func);
	return func;
}

function CopyScriptCommand(str, p1, offset, s)
{
	if ((p1.split('(').length == p1.split(')').length)&&(!p1.includes("break"))&&(!p1.includes("cotinue"))&&(!p1.includes("return"))&&(!p1.includes("if"))&&(!p1.includes("else"))&&(!p1.includes("_ib0string_mas"))
	&& (for_flag == false))
			scriptCommand.push(p1);
	
	//if (p1.includes("for"))
	//		for_flag = true;
	//if ((p1.split('(').length < p1.split(')').length) && (for_flag == true))
	//		for_flag = false;
	
	return p1;
}

function FindCommandInScript(script)
{
	nameNewFunc=[];
	scriptCommand=[];
	
	script = script.replace(/([^{};]*\;)/g, CopyScriptCommand);
	script = script.replace(/(function[ \r\n\t]+[_a-zA-Z][_a-zA-Z0-9]*)/g, AddNewFunctions);

	//alert(nameNewFunc);
	
	return script;
}
