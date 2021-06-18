//set Interval between each firework display, 
var intervals=2000;
var sparksOn = true;
var speed = 40;
var power = 3;

//Dont change these values-------
var documentWidth=documentHeight=randomx =randomy=leftcorner=topcorner=0;
var ns=(document.layers);
var ie=(document.all);
var ns6= (document. getElementById&&!document.all);
var sparksAflyin = false;
var allDivs = new Array(10);
var totalSparks = 0;
//-------------------------------

function initAll(){
if(!ns && !ie &&!ns6){
sparksOn = false;
return;
}
setInterval("firework()",intervals);

if (ns)
document. captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE);
for(dNum=0; dNum<7; ++dNum){
if(ie)
allDivs[dNum]= eval ('document.all.sDiv'+dNum+'.style');
else if (ns6)
allDivs[dNum]= document. getElementById('sDiv'+dNum).style;
else
allDivs[dNum]= eval ('document.layers["sDiv'+dNum+'"]');
}
}

function firework(){
//below code detects the browser dimenions
if (ie){
documentWidth= document.body.clientWidth;
documentHeight= document.body.clientHeight;
leftcorner=document.body.scrollLeft;
topcorner=document.body.scrollTop;
}
else if (ns||ns6){
documentWidth=window.innerWidth;
documentHeight=window.innerHeight;
leftcorner=pageXOffset;
topcorner=pageYOffset;

}
//below code randomly generates a set of coordinates that fall within the dimension
randomx=leftcorner+Math.floor (Math.random()*documentWidth);
randomy=topcorner+Math.floor (Math.random()*documentHeight);


if(sparksOn){
if(!sparksAflyin){
sparksAflyin=true;
totalSparks=0;
for(var spark=0;spark<=6;spark++){
dx=Math.round(Math.random()*50);
dy=Math.round(Math.random()*50);
moveTo(spark,randomx,randomy,dx,dy);
}
}
}
}

function moveTo (i,tempx,tempy,dx,dy){
if(ie){
if(tempy+80>(document.body. offsetHeight+document.body. scrollTop))
tempy=document.body. offsetHeight+document.body. scrollTop-80;
if(tempx+80>(document.body. offsetWidth+document.body. scrollLeft))
tempx=document.body. offsetWidth+document.body. scrollLeft-80;
}
else if(ns6){
if(tempy+80>(window. innerHeight+pageYOffset))
tempy=window. innerHeight+pageYOffset-80;
if(tempx+80>(window. innerWidth+pageXOffset))
tempx=window. innerWidth+pageXOffset-80;
}
if(tempx>-50&&tempy>-50){
tempx+=dx;tempy+=dy; 
allDivs[i].left=tempx;
allDivs[i].top=tempy;
dx-=power;dy-=power;
setTimeout("moveTo ("+i+","+tempx+","+tempy+","+dx+", "+dy+")",speed);
}
else
++totalSparks;
if(totalSparks==7){
sparksAflyin=false;
totalSparks=0;
}
}
window.onload=initAll;