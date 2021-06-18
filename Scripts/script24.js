var timerID = null;
var timerINT = 100;                               
var scr=0     ;                                    //time counter
var keyLR=0 ;                                      //Key L/R FLAG
var keyL=0;
var keyR=0;
var keyZ=0 ;                                       //Key Z FLAG
var keyX=0  ;                                      //Key X FLAG
var startFLG=0;                                    //Game Start FLAG
var myX=0;
var myY=0;
var oldmyX=0;
var oldmyY=0;
var myA=0;
var myVa=0;
var speed=0;
var wood=22;
var pylon=10;
var power=.1;
var Bpower=.13;
var drag=.03;
var level=120;
var drift=0;
var sector=0;

var pyX = new Array(50)    ;                       //pylon X
var pyY = new Array(50)     ;                      //pylon Y
 pyX[0]=-5; pyY[0]=0;
 pyX[1]=-5; pyY[1]=10;
 pyX[2]=-5; pyY[2]=20;
 pyX[3]=-5; pyY[3]=30;
 pyX[4]=-5; pyY[4]=40;
 pyX[5]=-5; pyY[5]=50;
 pyX[6]= 5; pyY[6]=50;
 pyX[7]=15; pyY[7]=50;
 pyX[8]=25; pyY[8]=50;
 pyX[9]=35; pyY[9]=50;

 pyX[10]=45; pyY[10]=50;
 pyX[11]=45; pyY[11]=40;
 pyX[12]=45; pyY[12]=30;
 pyX[13]=45; pyY[13]=20;
 pyX[14]=45; pyY[14]=10;
 pyX[15]=45; pyY[15]= 0;
 pyX[16]=35; pyY[16]=-10;
 pyX[17]=25; pyY[17]=-10;
 pyX[18]=15; pyY[18]=-10;
 pyX[19]= 5; pyY[19]=-10;

 pyX[20]=-5; pyY[20]=-10;
 pyX[21]=45; pyY[21]=-10;


 pyX[22]=15; pyY[22]=25;
 pyX[23]=20; pyY[23]=20;
 pyX[24]=20; pyY[24]=25;
 pyX[25]=35; pyY[25]=20;
 pyX[26]=35; pyY[26]=30;
 pyX[27]=35; pyY[27]=40;
 pyX[28]=15; pyY[28]=0;
 pyX[29]=25; pyY[29]=0;

 pyX[30]=5;  pyY[30]=40;
 pyX[31]=15; pyY[31]=20;

var scX1 = new Array(50);                          //sector check point
var scY1 = new Array(50);
var scX2 = new Array(50);
var scY2 = new Array(50);
var scXY = new Array(50);

 scX1[0]=-5; scY1[0]=40; scX2[0]=5 ; scY2[0]=40; scXY[0]="Y+";
 scX1[1]=35; scY1[1]=40; scX2[1]=35; scY2[1]=50; scXY[1]="X+";
 scX1[2]=35; scY1[2]=30; scX2[2]=35; scY2[2]=40; scXY[2]="X-";
 scX1[3]=35; scY1[3]=20; scX2[3]=35; scY2[3]=30; scXY[3]="X+";
 scX1[4]=35; scY1[4]=-10;scX2[4]=35; scY2[4]=20; scXY[4]="X-";
 scX1[5]=-5; scY1[5]=20; scX2[5]=15; scY2[5]=20; scXY[5]="Y+";
 scX1[6]=15; scY1[6]=25; scX2[6]=15; scY2[6]=50; scXY[6]="X+";
 scX1[7]=20; scY1[7]=25; scX2[7]=45; scY2[7]=25; scXY[7]="Y-";
 scX1[8]=20; scY1[8]=20; scX2[8]=40; scY2[8]=20; scXY[8]="Y-";
 scX1[9]=15; scY1[9]=0 ; scX2[9]=25; scY2[9]=0 ; scXY[9]="Y-";

 scX1[49]=15; scY1[49]=0 ; scX2[49]=25; scY2[49]=0 ; scXY[49]="Y-";

var endSector=10;


var pyZ = new Array(50);                           //pylon Z
for (ia=0; ia<50; ia++){
 pyZ[ia]=0;
}


function interval1(){
 clearTimeout(timerID);

 scr=scr+1;
 pscr=scr/10;
 tmpscr=scr-parseInt(pscr)*10;
 tmpSC0="";


  if (tmpscr==0){tmpSC0=".0";}
 document.forms[1].elements[0].value = pscr+tmpSC0;
  tmpVspeed=parseInt(speed*60);
 document.forms[0].elements[0].value = tmpVspeed;
 tmpSec0=parseInt((sector+1)/10);
 tmpSec1=sector+1-tmpSec0*10;
 if (document.getElementById){
  document.getElementById("N0").style.top =  tmpSec0*1000+1000;
  document.getElementById("N1").style.top =  tmpSec1*1000+1000;
 }else{
  N0.style.top=tmpSec0*1000+1000;
  N1.style.top=tmpSec1*1000+1000;
 }


 showMap();
 keyLR=keyL+keyR;

 
 if (keyX!=0){
  if (keyLR!=0){
   if (speed!=0){
    drift=drift+keyLR*2;
   }
  }
 }
 if (speed==0){myA=myA+drift;drift=0;}
 if (speed!=0){myA=myA+keyLR*(6+keyX*2-keyZ*3)+drift*.1;drift=drift*.9;}
 if (myA>180){myA=myA-360;}
 if (myA<-180){myA=myA+360;}
 myVa=myA+drift;
 if (myVa>180){myVa=myVa-360;}
 if (myVa<-180){myVa=myVa+360;}

 
 tmpOldSpeed=speed;
 speed=Math.sqrt(speed*speed+keyZ*power);
 tmpSP=1;
 if (speed<.5){tmpSP=.3;}
 tmpBp=speed*speed-keyX*Bpower*tmpSP-drag;
 if (tmpBp<=0){tmpBp=0;}
 speed=Math.sqrt(tmpBp);


 if (tmpOldSpeed<speed){
  level=125;
 }else{
  if (tmpOldSpeed==speed){
   level= 120;
  }else{
   if (keyX!=0){level= 115;}else{level=120;}
  }
 }

 oldmyX=myX;oldmyY=myY;
 myX=myX+speed*Math.sin(myA/180*Math.PI);
 myY=myY+speed*Math.cos(myA/180*Math.PI);
 secCHK(sector);

 if (sector<endSector-1){
  tmpSec=sector;
  sector=49;
  secCHK(49);
  if (sector!=50){sector=tmpSec;}
 }


 showPylon(myX,myY,myVa);

 
 CourseOutCHK();

 if (sector>=endSector){startFLG=0;}

 if (startFLG==1){


   timerID = setTimeout("interval1()",timerINT);
 }else{

  
   myX=0;
   myY=0;
   myA=0;
   scr=0;
   speed=0;
   level=120;
   drift=0;
   myVa=0;

  if (sector<endSector){
   if (document.getElementById){
    document.getElementById("OUT").style.top =  96;
    document.getElementById("BTN").style.top =  140;
    document.getElementById("arrow").style.top = 4;
   }else{
    OUT.style.top=96;
    BTN.style.top=140;
    arrow.style.top=4;
   }
  }else{
   if (document.getElementById){
    if (sector==50){
     document.getElementById("miss").style.top =  96;
    }else{
     document.getElementById("GOAL").style.top =  96;
    }
    document.getElementById("BTN").style.top =  140;
    document.getElementById("arrow").style.top = 4;
   }else{
    if (sector==50){
     miss.style.top=96;
    }else{
     GOAL.style.top=96;
    }
    BTN.style.top=140;
    arrow.style.top=4;
   }
  }

 }

}

// ------------------------------------------------------------------
//                       Sub function
// ------------------------------------------------------------------


// ON LOAD
function onLD(){
 if (document.all){window.focus();}
 a=0;
 showPylon(myX,myY,myVa);
}

// Game initiate
function initG(){
 showPylon(myX,myY,myVa);
 showMap() ;
 startFLG=1;
 keyL=0;
 keyR=0;
 oldmyX=0;
 oldmyY=0;
 sector=0;

 if (document.getElementById){
  document.getElementById("startMES").style.top =  -1000;
  document.getElementById("BTN").style.top =  -1000;
  document.getElementById("T3").style.top =  96;
  document.getElementById("OUT").style.top =  -1000;
  document.getElementById("miss").style.top =  -1000;
  document.getElementById("GOAL").style.top =  -1000;
  document.getElementById("infoCP").style.top = 220;
  document.getElementById("N0").style.top =  1000;
  document.getElementById("N1").style.top =  2000;
 }else{
  startMES.style.top=-1000;
  BTN.style.top=-1000;
  T3.style.top=96;
  OUT.style.top=-1000;
  miss.style.top=-1000;
  GOAL.style.top=-1000;
  infoCP.style.top= 220;
  N0.style.top= 1000;
  N1.style.top= 2000;
 }
 timerID = setTimeout("T3R()",1000);
}

// 3sec before
function T3R(){
 if (document.getElementById){
  document.getElementById("T3").style.top =  -1000;
  document.getElementById("T2").style.top =  96;
 }else{
  T3.style.top=-1000;
  T2.style.top=96;
 }
 timerID = setTimeout("T2R()",1000);
}

// 2sec before
function T2R(){
 if (document.getElementById){
  document.getElementById("T2").style.top =  -1000;
  document.getElementById("T1").style.top =  96;
 }else{
  T2.style.top=-1000;
  T1.style.top=96;
 }
 timerID = setTimeout("T1R()",1000);
}

// 1sec before
function T1R(){
 if (document.getElementById){
  document.getElementById("arrow").style.top =  -1000;
  document.getElementById("T1").style.top =  -1000;
 }else{
  arrow.style.top=-1000;
  T1.style.top=-1000;
 }
 timerID = setTimeout("interval1()",1);
}


// KEY DOWN
function keyDown(DnEvents){
 if (document.all){
  k=window.event.keyCode;
 }else{
  k=DnEvents.which;
 }

  if (k == 54){keyR=1;}                          //6
  if (k == 102){keyR=1;}                         //6
  if (k == 39){keyR=1;}                          //Right arrow

  if (k == 52){keyL=-1;}                         //4
  if (k == 100){keyL=-1;}                        //4
  if (k == 37){keyL=-1;}                         //Left arrow

  if (k == 90){keyZ=1;}                          //Z
  if (k == 122){keyZ=1;}                         //z

  if (k == 88){keyX=1;}                          //X
  if (k == 120){keyX=1;}                         //x

  if (k == 83){if (startFLG==0){initG();}}       //S
  if (k == 115){if (startFLG==0){initG();}}      //s


}


function keyUp(UpEvents){
 if (document.all){
  k=window.event.keyCode;
 }else{
  k=UpEvents.which;
 }
  if (k == 102){keyR=0;}                         
  if (k == 54 ){keyR=0;}                         
  if (k == 100){keyL=0;}                       
  if (k == 52 ){keyL=0;}                        
  if (k == 37 ){keyL=0;}                       
  if (k == 39 ){keyR=0;}                         
  if (k == 90){keyZ=0;}                        
  if (k == 122){keyZ=0;}                         
  if (k == 88){keyX=0;}                          
  if (k == 120){keyX=0;}                         

}



function showMap(){
  if (document.getElementById){
   document.getElementById("star").style.top =  54-myY;
   document.getElementById("star").style.left =  499+myX;
  }else{
   star.style.top=54-myY;
   star.style.left=499+myX;
  }
}



function showPylon(epX,epY,epA){

 if (document.getElementById){
  document.getElementById("Surface").style.top =  level;
 }else{
  Surface.style.top=level;
 }


 for (ia=0; ia<wood+pylon; ia++){
  ttaX=pyX[ia]-epX;
  ttaY=pyY[ia]-epY;
  pyZ[ia]=Math.sqrt(ttaX*ttaX+ttaY*ttaY);
 }

 for (ia=wood; ia<wood+pylon-1; ia++){
  for (ib=ia; ib<wood+pylon; ib++){
   if (pyZ[ia]<pyZ[ib]){
    tmpS=pyZ[ia];pyZ[ia]=pyZ[ib];pyZ[ib]=tmpS;
    tmpS=pyX[ia];pyX[ia]=pyX[ib];pyX[ib]=tmpS;
    tmpS=pyY[ia];pyY[ia]=pyY[ib];pyY[ib]=tmpS;
   }
  }
 }

 for (ia=0; ia<wood-1; ia++){
  for (ib=ia; ib<wood; ib++){
   if (pyZ[ia]<pyZ[ib]){
    tmpS=pyZ[ia];pyZ[ia]=pyZ[ib];pyZ[ib]=tmpS;
    tmpS=pyX[ia];pyX[ia]=pyX[ib];pyX[ib]=tmpS;
    tmpS=pyY[ia];pyY[ia]=pyY[ib];pyY[ib]=tmpS;
   }
  }
 }



 for (ia=0; ia<wood+pylon; ia++){
  ttaX=pyX[ia]-epX;
  ttaY=pyY[ia]-epY;
  tmpA=Math.atan2(ttaX,ttaY)*180/Math.PI-epA;
  if (tmpA>180){tmpA=tmpA-360;}
  if (tmpA<-180){tmpA=tmpA+360;}
  tmpA=tmpA*6.2;
  tmpT=Math.atan2(4,pyZ[ia])*180/Math.PI*1.78;

  if (ia<wood){
   
   pXX=tmpT*2.5;
   imgZoom(ia,pXX,tmpT*6);
   imgMove(ia,tmpA+280-pXX/2,level-tmpT*4.66666666);
  }else{
     
   pXX=tmpT/2.5;
   imgZoom(ia,pXX,tmpT);
   imgMove(ia,tmpA+280-pXX/2,tmpT/3+level);
  }

 }

}

function CourseOutCHK(){
 if (myX<-5){startFLG=0;}
 if (myX>45){startFLG=0;}
 if (myY<-10){startFLG=0;}
 if (myY>50){startFLG=0;}
}


function secCHK(chNo){

 if (scXY[chNo]=="Y+"){
  if (oldmyY<=scY1[chNo]){
   if (myY>scY1[chNo]){
    tmpXR=(oldmyX-myX)*(scY1[chNo]-myY)/(oldmyY-myY)+myX;
    
     if (tmpXR>scX1[chNo]){
      if (tmpXR<scX2[chNo]){
       sector=sector+1;
      }
     }
    
   }
  }
 }

 if (scXY[chNo]=="Y-"){
  if (oldmyY>=scY1[chNo]){
   if (myY<scY1[chNo]){
    tmpXR=(oldmyX-myX)*(scY1[chNo]-myY)/(oldmyY-myY)+myX;
    
     if (tmpXR>scX1[chNo]){
      if (tmpXR<scX2[chNo]){
       sector=sector+1;
      }
     }
    
   }
  }
 }

 if (scXY[chNo]=="X+"){
  if (oldmyX<=scX1[chNo]){
   if (myX>scX1[chNo]){
    tmpYR=(oldmyY-myY)*(scX1[chNo]-myX)/(oldmyX-myX)+myY;
     if (tmpYR>scY1[chNo]){
      if (tmpYR<scY2[chNo]){
       sector=sector+1;
      }
     }
    
   }
  }
 }

 if (scXY[chNo]=="X-"){
  if (oldmyX>=scX1[chNo]){
   if (myX<scX1[chNo]){
    tmpYR=(oldmyY-myY)*(scX1[chNo]-myX)/(oldmyX-myX)+myY;
     if (tmpYR>scY1[chNo]){
      if (tmpYR<scY2[chNo]){
       sector=sector+1;
      }
     }
    
   }
  }
 }

}


function imgMove(mId,mX,mY){
  document.images[mId].style.top=mY;
  document.images[mId].style.left=mX;
}


function imgZoom(zId,zX,zY){
  document.images[zId].style.width=zX;
  document.images[zId].style.height=zY;
}

 document.onkeydown = keyDown;
 document.onkeyup = keyUp;
