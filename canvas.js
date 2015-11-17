$(function() {


  console.log('Sanity Check');
  var canvas = $('#canvas')[0];
  // function clickElements(){
  //   canvas.
  // }


  $('#canvas').click(function (e) { //Default mouse Position
      var posX = $(this).offset().left,
          posY = $(this).offset().top;
      var x = e.pageX - posX,
          y = e.pageY - posY;
          console.log('x ='+x);
          console.log('y ='+y);

        //  Select Left Square
          // Inlet
          var inletX = boxX+20,
          side = 12.5,
          h = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
          inletY = boxY - h;
          console.log(h);
          //InletBox
          var iBoxL = 50;
              iBoxX = inletX-100-iBoxL,
              iBoxY = inletY-50 - iBoxL/2;
          // ctx.rect(iBoxX,iBoxY,iBoxL,iBoxL);
          // ctx.stroke();
          console.log(iBoxY+' = iBoxY');
        //Vessel Properties
        if(x  > iBoxX && x < iBoxX+iBoxL && y > 68 && y < 118 ){
          console.log('You Clicked the Box');
          psvBoxClear(psvX,psvY,ctx);
          centerBoxClear(xStart,yStart,ctx);
          inletBoxRed(boxX,boxY,ctx);

          $('.vessel-properties').css("display","none");
          $('.psv-properties').css("display","none");
          $('.fluid-properties').css("display","block");
        }
        if(x > 278 && x<528 && y>153 && y<253){
          psvBoxClear(psvX,psvY,ctx);
          inletBoxRedClear(boxX,boxY,ctx);
          centerBoxFill(xStart,yStart,ctx);

          $('.psv-properties').css("display","none");
          $('.fluid-properties').css("display","none");
          $('.vessel-properties').css("display","block");
        }
        if(x < 574 && x>490 && y>27 && y<120){
          inletBoxRedClear(boxX,boxY,ctx);
          centerBoxClear(xStart,yStart,ctx);
          psvBOX(psvX,psvY,ctx);

          $('.fluid-properties').css("display","none");
          $('.vessel-properties').css("display","none");
          $('.psv-properties').css("display","block");
        }

        // && x < iBoxX+iBoxL && y > iBoxY && y < iBoxY+iBoxL
        })



        //






    var height = canvas.height,
      width = canvas.width,
      //Center Starting Position
      xStart = width / 2,
      yStart = height / 2,
      //Rectangle Info
      boxHeight = 100,
      boxWidth = 250,
      boxX = xStart - boxWidth / 2,
      boxY = yStart - boxHeight / 2;

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      tank(boxX,boxY,boxWidth,boxHeight,ctx);

      outlet(boxX,boxY,boxWidth,boxHeight,ctx);
      inlet(boxX,boxY,ctx);

      // //PSV
      var psvX = boxX + boxWidth;
      var psvY = boxY;
      psv(psvX, psvY,ctx);


      // psv(psvX,psvY,ctx);
      psvBOX(psvX,psvY,ctx);
      psvBoxClear(psvX,psvY,ctx);



      inletBoxRed(boxX,boxY,ctx);
      inletBoxRedClear(boxX,boxY,ctx);
      //Fill Rectangle On Click
      centerBoxFill(xStart,yStart,ctx);
      centerBoxClear(xStart,yStart,ctx);

    }


  function tank(boxX,boxY,boxWidth,boxHeight,ctx){
        //Rectangle
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        //Half Circle Ends
        ctx.beginPath();
        var circleLeftX = boxX; // x coordinate
        var circleLeftY = boxY + boxHeight / 2; // y coordinate
        var radius = boxHeight / 2; // Arc radius
        var startAngle = 0.5 * Math.PI; // Starting point on circle
        var endAngle = 1.5 * Math.PI; // End point on circle
        var anticlockwise = false; // clockwise or anticlockwise

        ctx.arc(circleLeftX, circleLeftY, radius, startAngle, endAngle, anticlockwise);
        ctx.stroke();

        ctx.beginPath();
        var circleRightX = boxX + boxWidth; // x coordinate
        var circleRightY = circleLeftY; // y coordinate
        // var radius = 50; // Arc radius
        var startAngle = 1.5 * Math.PI; // Starting point on circle
        var endAngle = 0.5 * Math.PI; // End point on circle
        var anticlockwise = false; // clockwise or anticlockwise

        ctx.arc(circleRightX, circleRightY, radius, startAngle, endAngle, anticlockwise);
        ctx.stroke();
  }

  function triangle(x, y, side, direction,ctx) {
    var height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2));

    if (direction == 'up') {
      ctx.beginPath();
      ctx.moveTo(x-side/2, y);
      ctx.lineTo(x, y - height);
      ctx.lineTo(x+side/2, y);
      ctx.closePath();
      ctx.stroke();
    }
    else if(direction == 'left'){
      ctx.beginPath();
      ctx.moveTo(x, y+side/2);
      ctx.lineTo(x-height,y);
      ctx.lineTo(x,y-side/2);
      ctx.closePath();
      ctx.stroke();
    }
    else if(direction == 'right'){
      ctx.beginPath();
      ctx.moveTo(x,y+side/2);
      ctx.lineTo(x+height,y);
      ctx.lineTo(x,y-side/2);
      ctx.closePath();
      ctx.stroke();
    }
    else if(direction == 'down'){
      ctx.beginPath();
      ctx.moveTo(x-side/2,y);
      ctx.lineTo(x,y+height);
      ctx.lineTo(x+side/2,y);
      ctx.closePath();
    }
  }
  function psv(posX, posY,ctx) {
    //line from psv start to psv
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    posY = posY - 50;
    ctx.lineTo(posX, posY);
    ctx.stroke();
    //First Triangle
    var side = 25
    triangle(posX,posY,side,'up',ctx);
    //Second Triangle
    var tY = posY - Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2))
    var tX = posX + Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2))
    triangle(tX,tY,side,'left',ctx);

    //Outlet PSV line
    ctx.moveTo(tX,tY);
    ctx.lineTo(tX+100,tY);
    ctx.stroke();

    triangle(tX+100,tY,12.5,'right',ctx);
    ctx.moveTo(tX+110,tY);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.moveTo(posX,tY);
    ctx.lineTo(posX,tY-50);
    ctx.stroke();

    for(i = 0; i<2; i++){
      ctx.moveTo(posX-20,tY-10-i*10);
      ctx.lineTo(posX+20,tY -30 -i*10);
      ctx.stroke();
    }
  }

  //PSV Box
  function psvBOX(psvX,psvY,ctx){
    //Bottom Left Box

    var height = 10;
    var leftLength = 40;
    ctx.fillStyle="red";
    ctx.fillRect(psvX - leftLength-10, psvY - height-20,leftLength,height);

    //Left bar
      var leftBarLength = 109;
      ctx.fillStyle="red";
      ctx.fillRect(psvX -leftLength-10,psvY-leftBarLength-height-20,height,leftBarLength);

    //Top bar
    var topBarLength = 90;
    ctx.fillStyle="red";
    ctx.fillRect(psvX -leftLength,psvY-leftBarLength-height-20,topBarLength,height);

    //Right bar
    var rightBarLength = 60;
    ctx.fillStyle="red";
    ctx.fillRect(psvX -leftLength +topBarLength,psvY-leftBarLength-height-20,height,rightBarLength);
    //Right Lower bar
    var rightLowerBarLength = 40;
    ctx.fillStyle="red";
    ctx.fillRect(psvX -leftLength +topBarLength,psvY-leftBarLength-height+rightBarLength-5,height,rightLowerBarLength);

    var bottomBarLength = 70;
    ctx.fillStyle="#FF0000";
    ctx.fillRect(psvX+10,psvY - height-20,50,height);
  }

  //Clear PSV Box
  function psvBoxClear(psvX,psvY,ctx){
    //Bottom Left Box

    var height = 10;
    var leftLength = 40;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX - leftLength-10, psvY - height-20,leftLength,height);

    // //Left bar
      var leftBarLength = 109;
    //   ctx.fillStyle="red";
      ctx.clearRect(psvX -leftLength-10,psvY-leftBarLength-height-20,height,leftBarLength);
    //
    // //Top bar
    var topBarLength = 90;
    ctx.fillStyle="red";
    ctx.clearRect(psvX -leftLength,psvY-leftBarLength-height-20,topBarLength,height);
    //
    // //Right bar
    var rightBarLength = 60;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX -leftLength +topBarLength,psvY-leftBarLength-height-20,height,rightBarLength);
    // //Right Lower bar
    var rightLowerBarLength = 40;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX -leftLength +topBarLength,psvY-leftBarLength-height+rightBarLength-5,height,rightLowerBarLength);
    //
    var bottomBarLength = 70;
    // ctx.fillStyle="#FF0000";
    ctx.clearRect(psvX+10,psvY - height-20,50,height);
  }

  //Outlet
  function outlet(boxX,boxY,boxWidth,boxHeight,ctx){
  var outletX = boxX+boxWidth-20,
      outletY = boxY+boxHeight;
  ctx.beginPath();
  ctx.moveTo(outletX,outletY);
  ctx.lineTo(outletX,outletY+50);
  ctx.lineTo(outletX+100,outletY+50);
  ctx.stroke();
  triangle(outletX+100,outletY+50,12.5,'right',ctx);
  ctx.fillStyle="black";
  ctx.fill();
}

function inlet(boxX,boxY,ctx){

//Inlet
var inletX = boxX+20,
    side = 12.5,
    h = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
    inletY = boxY - h;
triangle(inletX,inletY,side,'down',ctx);
ctx.fillStyle = "black";
ctx.fill();
ctx.beginPath();
ctx.moveTo(inletX,inletY);
ctx.lineTo(inletX,inletY-50);
ctx.lineTo(inletX-100,inletY-50);
ctx.stroke();

//InletBox
var iBoxL = 50,
    iBoxX = inletX-100-iBoxL,
    iBoxY = inletY-50 - iBoxL/2;
ctx.rect(iBoxX,iBoxY,iBoxL,iBoxL);
ctx.stroke();
}

function inletBoxRed(boxX,boxY,ctx){
var inletX = boxX+20,
    side = 12.5,
    height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
    inletY = boxY - height;
var iBoxL = 50,
    iBoxX = inletX-100-iBoxL,
    iBoxY = inletY-50 - iBoxL/2;
// ctx.rect(iBoxX,iBoxY,iBoxL,iBoxL);
// ctx.stroke();
ctx.fillStyle = "#FF0000";
ctx.fillRect(iBoxX+5,iBoxY+5,iBoxL-10,iBoxL-10);
}

function inletBoxRedClear(boxX,boxY,ctx){
var inletX = boxX+20,
    side = 12.5,
    height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
    inletY = boxY - height;
var iBoxL = 50,
    iBoxX = inletX-100-iBoxL,
    iBoxY = inletY-50 - iBoxL/2;
ctx.clearRect(iBoxX+5,iBoxY+5,iBoxL-8,iBoxL-8);
}

//Fill Center Box on Click
function centerBoxFill(xStart,yStart,ctx){
var iBoxL = 50;
    // iBoxX = inletX-100-iBoxL,
    // iBoxY = inletY-50 - iBoxL/2;
ctx.fillStyle = "#FF0000";
var iBx = iBoxL - 10;
ctx.fillRect(xStart - iBx/2,yStart-iBx/2,iBx,iBx);
}
function centerBoxClear(xStart,yStart,ctx){
var iBoxL = 50;
var iBx = iBoxL - 10;
ctx.clearRect(xStart - iBx/2-1,yStart-iBx/2-1,iBx+2,iBx+2);
}





})
