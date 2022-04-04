const face = document.getElementById("face");
const hand = document.getElementById("hand");
const score = document.getElementById("score");
var deg = 0;
dragElement(hand);

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left ,
      top: rect.top ,
    };
  }

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  arnayPos = getOffset(face);
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // set the element's new position:
    if(elmnt.offsetTop<arnayPos.top-20 && (elmnt.offsetTop - pos2)>arnayPos.top-20){
        if(elmnt.offsetLeft>arnayPos.left-20 && elmnt.offsetLeft<arnayPos.left+180){
            slap('-');
        }
    }
    if(elmnt.offsetLeft<arnayPos.left-20 && (elmnt.offsetLeft - pos1)>arnayPos.left-20){
        if(elmnt.offsetTop>arnayPos.top-20 && elmnt.offsetTop<arnayPos.top+250){
            slap('-');
        };
    } 

    if(elmnt.offsetTop>arnayPos.top+250 && (elmnt.offsetTop - pos2)<arnayPos.top+250){
        if(elmnt.offsetLeft>arnayPos.left-20 && elmnt.offsetLeft<arnayPos.left+180){
            slap('+');
        }
    }
    if(elmnt.offsetLeft>arnayPos.left+180 && (elmnt.offsetLeft - pos1)<arnayPos.left+180){
        if(elmnt.offsetTop>arnayPos.top-20 && elmnt.offsetTop<arnayPos.top+250){
            slap('+');
        };
    } 

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function slap(sign){
    score.innerHTML++;
    var newDeg = Math.floor((Math.random() * 3) + 5);
    if(sign==='+'){
      deg+=newDeg;
    }
    else{
      deg-=newDeg;
    }
    face.style.transform = "rotate("+deg+"deg)";
    var soundNum = Math.floor((Math.random() * 3) + 1);
    var audio = new Audio('assets/slap'+soundNum+'.mp3');
    audio.play();

    face.style.width = "14.5em";
    setTimeout(function(){
        face.style.width = "15em";
    }, 500);

    if(score.innerHTML==50){
      face.src="assets/vinay2.png"
    }
    if(score.innerHTML==100){
      face.src="assets/vinay3.png"
    }
}