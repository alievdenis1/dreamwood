/*"use strict";*/

if($(window).width() < 769){
  //TweenMax.set($('body'), {perspective:400});
  var gn = new GyroNorm();
    
    gn.init().then(function(){
    	gn.start(function(data){
        var rotationZ = data.do.alpha;
        var rotationY = data.do.beta;
        var rotationX = data.do.gamma;

        //$('.logo').html('z: '+rotationZ+'<br/>x: '+rotationX+'<br/>Y: '+rotationY);
        $('#col2').css('background-position-x', `calc(90% + ${rotationX/3}px)`);
        $('#col2').css('background-position-y', `calc(55% + ${rotationY/4}px)`);

        $('#col3').css('background-position-x', rotationX);
        $('#col3').css('background-position-y', rotationY);

        $('#col4').css('background-position-x', `calc(113% + ${rotationX/5}px)`);
        $('#col4').css('background-position-y', `calc(101% + ${rotationY/5}px)`);
        
        

        //TweenMax.to($('.logo'), 0, {rotationX:rotationY, rotationX:rotationY, rotationZ:rotationZ})
       		
        });
    }).catch(function(e){ });
}

function getMousePos(xRef, yRef) {
    let panelRect = boxercontainer.getBoundingClientRect();
    return {
   x: Math.floor(xRef - panelRect.left) / 
   (panelRect.right - panelRect.left)*boxercontainer.offsetWidth,
   y: Math.floor(yRef - panelRect.top) / 
   (panelRect.bottom - panelRect.top) * boxercontainer.offsetHeight
    };
}

document.body.addEventListener("mousemove", function(e) {
  let mousePos = getMousePos(e.clientX, e.clientY),
  distX = mousePos.x,
  distY = mousePos.y;
  
  if($(window).width() > 768){
  $('#col1').css('background-position-x',`calc(50% - ${distX/55}px)`);
  $('#col1').css('background-position-y',`calc(100% + ${distY/40}px)`);


  $('#col2').css('background-position-x',`calc(50% - ${distX/50}px)`);
  $('#col2').css('background-position-y',`calc(100% - ${distY/35}px)`);


  
  $('#col3').css('background-position-x',`calc(50% - ${distX/25}px)`);
  $('#col3').css('background-position-y',`calc(110% - ${distY/25}px)`);


  $('#col4').css('background-position-x',`calc(50% - ${distX/15}px)`);
  $('#col4').css('background-position-y',`calc(110% - ${distY/35}px)`);


  $('.deg').css('left', `calc(10% + ${distX/50}px)`);
  $('.deg').css('top', `calc(25% + ${distY/70}px)`);

  $('.krestik2').css('right', `calc(12% - ${distX/50}px)`);
  $('.krestik2').css('top', `calc(57% + ${distY/70}px)`);

  }


  

})