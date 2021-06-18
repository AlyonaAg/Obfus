var image_directory = ""; //Директория (адрес) рисунков
var ok = false; 
var pcbusy = false; 
var userturn = true;
var butdown = false;
var stage = 1;
var cnt = 1;
var pcclicks = new Array();
var userclicks = new Array();
var pos;
var tst = true;
var msg = "Нажмите ВПЕРЕД!";
btn1 = new Image();
btn1.src = image_directory + "purple.gif";
btn2 = new Image();
btn2.src = image_directory + "yellow.gif";
function updown(isdn) {
if (isdn) {
document.f[('pl'+pos)].src = image_directory + 'yellow.gif';
}
else {
document.f[('pl'+pos)].src= image_directory + 'purple.gif';
   }
}
function dopc() {
document.f.st.value = stage;
if (cnt <= stage) {
pcbusy = true;
userturn = false;
document.f.s.value = "Очередь Саймона";
setTimeout("pos=Math.floor((Math.random()*8)+1); updown(true)",500);
setTimeout("updown(false) ; pcclicks[cnt]=pos; cnt++; dopc()",1200);
}
else {
userclicks = new Array();
cnt = 1;
document.f.s.value = "Ваша очередь";
pcbusy = false;
userturn = true;
document.f.b.focus();
   }
}
function testclicks() {
tst = true;
for(i = 1;cnt > i; i++) {
if (pcclicks[i] == userclicks[i]) {
tst = true && tst;
}
else {
tst = false && tst;
   }
}
if(tst) {
setTimeout("stage++ ; document.f.st.value=stage ; alert('ПРАВИЛЬНО!  Переход на следующий уровень....'); document.f.s.value=msg ; document.f.b.focus()",300);
}
else {
setTimeout("stage=1 ; cnt=1 ; pcclicks=new Array() ; document.f.st.value=stage ; alert('ОШИБКА!.  Вам прийдется начать новую игру.') ; document.f.s.value=msg",300);
}
cnt = 1;
}
function testclk(downflag, pos) {
if (userturn&&(!pcbusy)) {
if (downflag) {
document.f[('pl'+pos)].src = image_directory + 'yellow.gif';
}else{
document.f[('pl'+pos)].src = image_directory + 'purple.gif';
}
if (ok && !downflag) {
userclicks[cnt] = pos;
cnt++;
if (pcclicks.length == userclicks.length) {
testclicks();
         }
      }
   }
}