const arnay = document.getElementById("arnay");
const hand = document.getElementById("hand");
const score = document.getElementById("score");
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

  arnayPos = getOffset(arnay);
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
        if(elmnt.offsetTop>arnayPos.top-20 && elmnt.offsetTop<arnayPos.top+200){
            slap('-');
        };
    } 

    if(elmnt.offsetTop>arnayPos.top+200 && (elmnt.offsetTop - pos2)<arnayPos.top+200){
        if(elmnt.offsetLeft>arnayPos.left-20 && elmnt.offsetLeft<arnayPos.left+180){
            slap('+');
        }
    }
    if(elmnt.offsetLeft>arnayPos.left+180 && (elmnt.offsetLeft - pos1)<arnayPos.left+180){
        if(elmnt.offsetTop>arnayPos.top-20 && elmnt.offsetTop<arnayPos.top+200){
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
    
    var deg = Math.floor((Math.random() * 5) + 1);
    arnay.style.transform = "rotate("+sign+deg+"deg)";
    var soundNum = Math.floor((Math.random() * 3) + 1);
    var audio = new Audio('assets/slap'+soundNum+'.mp3');
    audio.play();

    arnay.style.width = "14.5em";
    setTimeout(function(){
        arnay.style.width = "15em";
    }, 500);
}