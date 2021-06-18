function loadgame() {
v = -1; g = 0; tries = 0; total = 0;
for(var i = 0; i < 6; i++) {
for(var j = 0; j < 6; j++) {
v++;
document.write("<input type='button' value='????' style=\"width:70; height:60; font-size: 18pt; font-family: Verdana; font-weight: bold\" "+
"OnClick='button(" +v+ ")'>");
}
document.write("<br>");
}
}

function setBoard() {
v = -1; g = 0; tries = 0; total = 0;
document.mem.start.value = "Старт";
for(i=0; i<18; i++) {
Array[i] = i; Array[i+18] = i;
}
shuffle(); 
}

function shuffle() {
for(i=0; i < (rand(300)+200); i++) {
x = 0; y = 0;
while(x == y) {
x = rand(36); y = rand(36);
}
temp = Array[x]; Array[x] = Array[y]; Array[y] = temp;
}
show(0);
}

function rand(n) {
return Math.floor(Math.random()*n);
} 

function show(n) {
if((n && confirm("Вы уверены? ")) || !n) {
for(i=0; i<36; i++) {
document.mem.elements[i].value = Array[i];
}
}
}

function blank() {
for(i=0; i<36; i++) {
document.mem.elements[i].value = "";
}
} 

function button(x) {
test = "" +Array[x];
if(test.charAt(0) == "[") return;
document.mem.elements[x].value = Array[x];
if(g == 0) {
first = Array[x];
firstx = x; ;
g++;
return;
}
if(g == 1) {
second = Array[x];
secondx = x;
tries++;
g = 0;
if(first == second) {
Array[firstx] = "[" +Array[firstx]+ "]";
Array[secondx] = "[" +Array[secondx]+ "]"; 
total++;
document.mem.start.value = "попаданий: "+total+"";
if(total == 18) alert("Вы открыли все числа после "+tries+" попыток(попытки)!");
return;
}
}
setTimeout("document.mem.elements[firstx].value = ''", 500);
setTimeout("document.mem.elements[secondx].value = ''", 500);
}