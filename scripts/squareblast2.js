var guy=document.getElementById('guy');
var container=document.getElementById('container');
var guyX = 0;
var guyY = 0;
var moveDx = 4;
var moveDy = 4;

function init(){
  guy=document.getElementById('guy');
}
function animateSquareGuy(e){
  console.log(guy);
  if(e.keyCode == 39){ //right
    guyX += moveDx;
//    $('#guy').css('left',guyX+'px');
    guy.style.left = guyX + 'px';
  }
  if(e.keyCode == 37){ //left
    guyX -= moveDx;
    guy.style.left = guyX + 'px';
  }
  if(e.keyCode == 38){ //up
    guyY -= moveDy;
    guy.style.top = guyY + 'px';
  }
  if(e.keyCode == 40){ //down
    guyY += moveDy;
    guy.style.top = guyY + 'px';
  }
}

document.onkeydown = animateSquareGuy;
