str_vict="Вы ЭТО сделали";
function zamen(n){
var n2 ;
for ( var i=0; 16>i; ++i ){if (document.images[i].name=="16"){n2=i;}}
if ((n-n2==4) || (n2-n==4) || ((n-n2==1)&&(Math.floor(n/4)==Math.floor(n2/4))) || ((n2-n==1)&&(Math.floor(n/4)==Math.floor(n2/4))) ){
document.images[n2].src = "fift"+document.images[n].name+".gif";
document.images[n].src = "fift16.gif";
document.images[n2].name = document.images[n].name;
document.images[n].name = "16";
}
n2=0;
for ( var i=0; 13>i; ++i ){if (document.images[i].name==i+1){n2=++n2;}}
if ((n2==13) && (document.images[15].name==16)) {alert(str_vict);zan();}
}
function zan(){
var p1 = new Image();var p2 = new Image();var imgs_ = new Image();var name_;
for ( var i=0; 50>i; ++i ){
p1 = Math.floor(Math.random()*16);p2 = Math.floor(Math.random()*16);
imgs_ = document.images[p1].src;document.images[p1].src = document.images[p2].src;document.images[p2].src = imgs_;
name_ = document.images[p1].name;document.images[p1].name = document.images[p2].name;document.images[p2].name = name_;
}
}