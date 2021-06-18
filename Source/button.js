window.onload = init;

function init(){
    var button = document.getElementById("obfus_button")
    button.onclick = handleButtonClick;
}

function handleButtonClick() {
	using_name = [];
	new_using_name = [];
	scriptCommand = [];
	nameNewFunc = [];
	for_flag = false;
	indexString = 0;
	string_mas = '';

	
	var textInput = document.getElementById("textArea1");
	var textOutput = document.getElementById("textArea2");

	//if (document.getElementById("checkbox1").checked)
	textOutput.value = RemoveComment(textInput.value);
	textOutput.value = StringEncoding(textOutput.value);
	
	textOutput.value = FindCommandInScript(textOutput.value);
	textOutput.value = FindCommandForBranching(textOutput.value);
	
	textOutput.value = RemoveLineBreaks(textOutput.value);
	textOutput.value = RemoveDoubleSpace(textOutput.value);

	
	textOutput.value = NumberChange(textOutput.value);

	
	textOutput.value = FunctionName(textOutput.value);
	textOutput.value = VariableName(textOutput.value);
}
