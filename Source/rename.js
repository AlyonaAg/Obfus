var using_name = [];
var new_using_name = [];

function GenerateNewName()
{
	do
	{
		number1 = getRandomIntMinMax(10, 99);
		number2 = getRandomIntMinMax(1000, 9999);
		name = '_0ib'+number1.toString()+'k'+number2.toString()+'s';
	}while(new_using_name.indexOf(name) != -1);
	
	new_using_name.push(name);
	return name;
}

function ChangeFunctionName(script)
{
	for (let i = 0; i < using_name.length; i++)
		{
			new_name = GenerateNewName();
			re = new RegExp('([^0-9a-zA-Z_\.])('+using_name[i]+')([^0-9a-zA-Z_])', 'g');
			script = script.replace(re, '$1'+new_name+'$3');
			script = script.replace(re, '$1'+new_name+'$3');
		}
	return script;
}

function FindFuncNameInScript(str, p1, p2, offset, s)
{
	using_name.push(p2)
	return p1+p2;
}

function FindVarNameInScript(str, p1,p2, p3, p4, p5,p6, offset, s)
{
	result ="";
	if (!!p1)
		result += p1;
	if (!!p3)
		result += p3;
	if (!!p4)
		result += p4;
	if (!!p5)
	{
		result += p5;
		if (!using_name.includes(p6))
			using_name.push(p6)
	}

	return result;
}

function FunctionName(script)
{
	using_name = [];
	script.replace(/(function[ \r\n\t]+)([_a-zA-Z][_a-zA-Z0-9]*)/g, FindFuncNameInScript);
	script = ChangeFunctionName(script);
	return script;
}

function VariableName(script)
{
	using_name = [];
	
	re = new RegExp('([^_0-9a-z](type|Infinity|break|case|class|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|enum|await|implements|package|protected|static|interface|private|public|abstract|boolean|byte|char|double|final|float|goto|int|long|native|short|synchronized|transient|volatile|true|false|null)[^_0-9a-zA-Z])|(\'[a-zA-Z0-9\=\+\/]*\')|(\"[a-zA-Z0-9\=\+\/]*\")|([^\.0-9a-zA-Z]([_a-zA-Z][_a-zA-Z0-9]*)[^\(\.0-9a-zA-Z])', 'g');
	
	script = script.replace(re, FindVarNameInScript);
	script = ChangeFunctionName(script);
	return script;
}