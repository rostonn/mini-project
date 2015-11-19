$(function() {


  console.log('Sanity Check');
  var canvas = $('#canvas')[0];
  var psvProperties = {};
  var fluidProperties = {};
  var vesselProperties = {};
  var output = {};
  // function clickElements(){
  //   canvas.
  // }
  //Output Function;

  function errorChecking(object){
    for(i in object){
      if(!object[i]){
        alert('Error'+i+' is empty');
        return false;
      }
    }
    return true;
  }

  $('#calculate-output').on("click",function(){
    if(!(errorChecking(fluidProperties))){
      return;
    }
    // console.log('SANITY CLICK CHECK');
    var SG = fluidProperties.specificGravity,
        flowRate = fluidProperties.flowRate,
        k = psvProperties.k,
        kV = psvProperties.kV,
        kW = psvProperties.kW,
        kP = psvProperties.kP,
        setPressure = psvProperties.setPressure;
        // console.log(flowRate+'flowRate');
        // console.log(k+' = k');
        // console.log(kV+' = kV');
        // console.log(kW+' = kW');
        // console.log(kP+' = kP');
    var orificeSize = flowRate * Math.pow(SG,0.5)/((38*k*kW*kP*kV)*
    (Math.pow((1+.1)*setPressure - 0),0.5));
    console.log('Orifice Size = '+orificeSize);

    //Clear The properties
    $('.fluid-properties').css("display", "none");
    $('.vessel-properties').css("display", "none");
    $('.psv-properties').css("display", "none");
    //Clear The Red Boxes
    inletBoxRedClear(boxX, boxY, ctx);
    centerBoxClear(xStart, yStart, ctx);
    psvBoxClear(psvX, psvY, ctx);
    //Display Output
    $('.output').css("display",'block');


    //Select orifice size:
    var psvSize = [
      {negFour: 0.049},
      {D: 0.11},
      {E: 0.196},
      {F: 0.307},
      {G: 0.503},
      {H: 0.785},
      {J: 1.287},
      {K: 1.838},
      {L: 2.853},
      {M: 3.60},
      {N: 4.34},
      {P: 6.38},
      {Q: 11.05},
      {R: 16.00},
      {T: 26.00}
    ]
    orificeSize = 2;
    //Append Output to the Output
    $('#answer').text('The calculated orifice size is '+orificeSize);
    for(var i=0; i < psvSize.length; i++){
      for(key in psvSize[i]){
        if(orificeSize < psvSize[i][key]){
          $('#'+key).css("background-color","yellow");
          return;
        }
      }
    }
  })

  //Store Fluid Properties in an Object
  //Sets the span to show and input to hide
  $('#fluid-properties').submit(function(event) {
      fluidProperties.fluidName = $('#fluidName').val();
      fluidProperties.atmosphericPressure = $('#atmosphericPressure').val();
      fluidProperties.normalOperatingPressure = $('#normalOperatingPressure').val();
      fluidProperties.zFactor = $('#zFactor').val();
      fluidProperties.viscosity = $('#viscosity').val();
      fluidProperties.specificGravity = $('#specificGravity').val();
      fluidProperties.cpCv = $('#cpCv').val();
      fluidProperties.flowRate = $('#flowRate').val();
      //Caclulate c
      var k = fluidProperties.cpCv;
      console.log('k = '+k);
      var c = 520*Math.sqrt(k + Math.pow((2/(k+1)),((k+1)/(k-1))));
      console.log(c);
      c = c.toPrecision(3);
      //Insert C
      $('#kRatio').css("display","");
      $('#c').text(c);

      // console.log('FLUID PROPERTIES:');
      // for (i in fluidProperties) {
      //   console.log('key: ' + i + '   value: ' + fluidProperties[i]);
      // }
      //Hide The Input Field
      $('#fluidName').css("display", "none");
      $('#SfluidName').css("display", "block")
        .text(fluidProperties.fluidName);

      $('#atmosphericPressure').css("display", "none");
      $('#SatmosphericPressure').css("display", "block")
        .text(fluidProperties.atmosphericPressure);

      $('#normalOperatingPressure').css("display", "none");
      $('#SnormalOperatingPressure').css("display", "block")
        .text(fluidProperties.normalOperatingPressure);

      $('#zFactor').css("display", "none");
      $('#SzFactor').css("display", "block")
        .text(fluidProperties.zFactor);

      $('#viscosity').css("display", "none");
      $('#Sviscosity').css("display", "block")
        .text(fluidProperties.viscosity);

      $('#specificGravity').css("display", "none");
      $('#SspecificGravity').css("display", "block")
        .text(fluidProperties.specificGravity);

      $('#cpCv').css("display", "none");
      $('#ScpCv').css("display", "block")
        .text(fluidProperties.cpCv);

      $('#flowRate').css("display","none");
      $('#SflowRate').css("display", "block")
        .text(fluidProperties.flowRate);

      event.preventDefault();
    })
    //Edit Fluid Properties
  $('#fluidEdit').on("click", function() {
    $('#SfluidName').css("display", "none");
    $('#fluidName').css("display", "block");

    $('#SatmosphericPressure').css("display", "none");
    $('#atmosphericPressure').css("display", "block");

    $('#SnormalOperatingPressure').css("display", "none");
    $('#normalOperatingPressure').css("display", "block");

    $('#SzFactor').css("display", "none");
    $('#zFactor').css("display", "block");

    $('#Sviscosity').css("display", "none");
    $('#viscosity').css("display", "block");

    $('#SspecificGravity').css("display", "none");
    $('#specificGravity').css("display", "block");

    $('#ScpCv').css("display", "none");
    $('#cpCv').css("display", "block");

    $('#kRatio').css("display","none");

    $('#SflowRate').css("display","none");
    $('#flowRate').css("display", "block");

    event.preventDefault();
  })

  //PSV Properties Submit - Sets the PSV Properties Object
  //Sets The Span to show and the input to hide
  $('#psv-properties').submit(function(event) {
    psvProperties = {
      psvTag: $('#psvTag').val(),
      setPressure: $('#setPressure').val(),
      k: $('#k').val(),
      kW: $('#kW').val(),
      kP: $('#kP').val(),
      kV: $('#kV').val()
    };
    for (i in psvProperties) {
      console.log('key: ' + i + '    Value: ' + psvProperties[i]);
    }
    // console.log(psvProperties.psvTag);
    $('#psvTag').css("display", "none");
    $('#SpsvTag').css("display", "block")
      .text(psvProperties.psvTag);

    $('#setPressure').css("display", "none");
    $('#SsetPressure').css("display", "block")
      .text(psvProperties.setPressure);

    $('#k').css("display", "none");
    $('#Sk').css("display", "block")
      .text(psvProperties.k);

    $('#kW').css("display", "none");
    $('#SkW').css("display", "block")
      .text(psvProperties.kW);

    $('#kP').css("display", "none");
    $('#SkP').css("display", "block")
      .text(psvProperties.kP);

    $('#kV').css("display", "none");
    $('#SkV').css("display", "block")
      .text(psvProperties.kV);

    event.preventDefault();
  })

  //Edit PSV Properties
  $('#psvEdit').on("click", function() {
    $('#SpsvTag').css("display", "none");
    $('#psvTag').css("display", "block");


    $('#SsetPressure').css("display", "none");
    $('#setPressure').css("display", "block");

    $('#Sk').css("display", "none");
    $('#k').css("display", "block");

    $('#SkW').css("display", "none");
    $('#kW').css("display", "block");

    $('#SkP').css("display", "none");
    $('#kP').css("display", "block");

    $('#SkV').css("display", "none");
    $('#kV').css("display", "block");

    event.preventDefault();
  })
  $('#vessel-properties').submit(function(event) {
    vesselProperties = {
      vesselName: $('#vesselName').val(),
      vesselOrientation: $('#vesselOrientation').val(),
      vesselDiameter: $('#vesselDiameter').val(),
      vesselLength: $('#vesselLength').val(),
      normalLiquidLevel: $('#normalLiquidLevel').val()
    };

    for (i in vesselProperties) {
      // console.log('key: ' + i + '   Value: ' + vesselProperties[i]);
    }

    $('#vesselName').css("display", "none");
    $('#SvesselName').css("display", "block")
      .text(vesselProperties.vesselName);

    $('#vesselOrientation').css("display", "none");
    $('#SvesselOrientation').css("display", "block")
      .text(vesselProperties.vesselOrientation);

    $('#vesselDiameter').css("display", "none");
    $('#SvesselDiameter').css("display", "block")
      .text(vesselProperties.vesselDiameter);

    $('#vesselLength').css("display", "none");
    $('#SvesselLength').css("display", "block")
      .text(vesselProperties.vesselLength);

    $('#normalLiquidLevel').css("display", "none");
    $('#SnormalLiquidLevel').css("display", "block")
      .text(vesselProperties.normalLiquidLevel);
    event.preventDefault();
  })

  //Edit Vessel Properties
  $('#vesselEdit').on('click', function() {
    $('#SvesselName').css("display", "none");
    $('#vesselName').css("display", "block");

    $('#SvesselOrientation').css("display", "none");
    $('#vesselOrientation').css("display", "block");

    $('#SvesselDiameter').css("display", "none");
    $('#vesselDiameter').css("display", "block");

    $('#SvesselLength').css("display", "none");
    $('#vesselLength').css("display", "block");

    $('#SnormalLiquidLevel').css("display", "none");
    $('#normalLiquidLevel').css("display", "block");

    event.preventDefault();
  })






  $('#canvas').click(function(e) { //Default mouse Position
    var posX = $(this).offset().left,
      posY = $(this).offset().top;
    var x = e.pageX - posX,
      y = e.pageY - posY;
    console.log('x =' + x);
    console.log('y =' + y);

    //  Select Left Square
    // Inlet
    var inletX = boxX + 20,
      side = 12.5,
      h = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
      inletY = boxY - h;
    console.log(h);
    //InletBox
    var iBoxL = 50;
    iBoxX = inletX - 100 - iBoxL,
      iBoxY = inletY - 50 - iBoxL / 2;
    // ctx.rect(iBoxX,iBoxY,iBoxL,iBoxL);
    // ctx.stroke();
    console.log(iBoxY + ' = iBoxY');
    //Vessel Properties
    if (x > iBoxX && x < iBoxX + iBoxL && y > 68 && y < 118) {
      console.log('You Clicked the Box');
      $('.output').css("display",'none');
      psvBoxClear(psvX, psvY, ctx);
      centerBoxClear(xStart, yStart, ctx);
      inletBoxRed(boxX, boxY, ctx);

      $('.output').css("display",'none');
      $('.vessel-properties').css("display", "none");
      $('.psv-properties').css("display", "none");
      $('.fluid-properties').css("display", "block");
    }
    if (x > 278 && x < 528 && y > 153 && y < 253) {
      $('.output').css("display",'none');
      psvBoxClear(psvX, psvY, ctx);
      inletBoxRedClear(boxX, boxY, ctx);
      centerBoxFill(xStart, yStart, ctx);

      $('.psv-properties').css("display", "none");
      $('.fluid-properties').css("display", "none");
      $('.vessel-properties').css("display", "block");
    }
    if (x < 574 && x > 490 && y > 27 && y < 120) {
      $('.output').css("display",'none');
      inletBoxRedClear(boxX, boxY, ctx);
      centerBoxClear(xStart, yStart, ctx);
      psvBOX(psvX, psvY, ctx);

      $('.fluid-properties').css("display", "none");
      $('.vessel-properties').css("display", "none");
      $('.psv-properties').css("display", "block");
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

    tank(boxX, boxY, boxWidth, boxHeight, ctx);

    outlet(boxX, boxY, boxWidth, boxHeight, ctx);
    inlet(boxX, boxY, ctx);

    // //PSV
    var psvX = boxX + boxWidth;
    var psvY = boxY;
    psv(psvX, psvY, ctx);


    // psv(psvX,psvY,ctx);
    psvBOX(psvX, psvY, ctx);
    psvBoxClear(psvX, psvY, ctx);



    inletBoxRed(boxX, boxY, ctx);
    inletBoxRedClear(boxX, boxY, ctx);
    //Fill Rectangle On Click
    centerBoxFill(xStart, yStart, ctx);
    centerBoxClear(xStart, yStart, ctx);

  }


  function tank(boxX, boxY, boxWidth, boxHeight, ctx) {
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

  function triangle(x, y, side, direction, ctx) {
    var height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2));

    if (direction == 'up') {
      ctx.beginPath();
      ctx.moveTo(x - side / 2, y);
      ctx.lineTo(x, y - height);
      ctx.lineTo(x + side / 2, y);
      ctx.closePath();
      ctx.stroke();
    } else if (direction == 'left') {
      ctx.beginPath();
      ctx.moveTo(x, y + side / 2);
      ctx.lineTo(x - height, y);
      ctx.lineTo(x, y - side / 2);
      ctx.closePath();
      ctx.stroke();
    } else if (direction == 'right') {
      ctx.beginPath();
      ctx.moveTo(x, y + side / 2);
      ctx.lineTo(x + height, y);
      ctx.lineTo(x, y - side / 2);
      ctx.closePath();
      ctx.stroke();
    } else if (direction == 'down') {
      ctx.beginPath();
      ctx.moveTo(x - side / 2, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + side / 2, y);
      ctx.closePath();
    }
  }

  function psv(posX, posY, ctx) {
    //line from psv start to psv
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    posY = posY - 50;
    ctx.lineTo(posX, posY);
    ctx.stroke();
    //First Triangle
    var side = 25
    triangle(posX, posY, side, 'up', ctx);
    //Second Triangle
    var tY = posY - Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2))
    var tX = posX + Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2))
    triangle(tX, tY, side, 'left', ctx);

    //Outlet PSV line
    ctx.moveTo(tX, tY);
    ctx.lineTo(tX + 100, tY);
    ctx.stroke();

    triangle(tX + 100, tY, 12.5, 'right', ctx);
    ctx.moveTo(tX + 110, tY);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.moveTo(posX, tY);
    ctx.lineTo(posX, tY - 50);
    ctx.stroke();

    for (i = 0; i < 2; i++) {
      ctx.moveTo(posX - 20, tY - 10 - i * 10);
      ctx.lineTo(posX + 20, tY - 30 - i * 10);
      ctx.stroke();
    }
  }

  //PSV Box
  function psvBOX(psvX, psvY, ctx) {
    //Bottom Left Box

    var height = 10;
    var leftLength = 40;
    ctx.fillStyle = "red";
    ctx.fillRect(psvX - leftLength - 10, psvY - height - 20, leftLength, height);

    //Left bar
    var leftBarLength = 109;
    ctx.fillStyle = "red";
    ctx.fillRect(psvX - leftLength - 10, psvY - leftBarLength - height - 20, height, leftBarLength);

    //Top bar
    var topBarLength = 90;
    ctx.fillStyle = "red";
    ctx.fillRect(psvX - leftLength, psvY - leftBarLength - height - 20, topBarLength, height);

    //Right bar
    var rightBarLength = 60;
    ctx.fillStyle = "red";
    ctx.fillRect(psvX - leftLength + topBarLength, psvY - leftBarLength - height - 20, height, rightBarLength);
    //Right Lower bar
    var rightLowerBarLength = 40;
    ctx.fillStyle = "red";
    ctx.fillRect(psvX - leftLength + topBarLength, psvY - leftBarLength - height + rightBarLength - 5, height, rightLowerBarLength);

    var bottomBarLength = 70;
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(psvX + 10, psvY - height - 20, 50, height);
  }

  //Clear PSV Box
  function psvBoxClear(psvX, psvY, ctx) {
    //Bottom Left Box

    var height = 10;
    var leftLength = 40;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX - leftLength - 10, psvY - height - 20, leftLength, height);

    // //Left bar
    var leftBarLength = 109;
    //   ctx.fillStyle="red";
    ctx.clearRect(psvX - leftLength - 10, psvY - leftBarLength - height - 20, height, leftBarLength);
    //
    // //Top bar
    var topBarLength = 90;
    ctx.fillStyle = "red";
    ctx.clearRect(psvX - leftLength, psvY - leftBarLength - height - 20, topBarLength, height);
    //
    // //Right bar
    var rightBarLength = 60;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX - leftLength + topBarLength, psvY - leftBarLength - height - 20, height, rightBarLength);
    // //Right Lower bar
    var rightLowerBarLength = 40;
    // ctx.fillStyle="red";
    ctx.clearRect(psvX - leftLength + topBarLength, psvY - leftBarLength - height + rightBarLength - 5, height, rightLowerBarLength);
    //
    var bottomBarLength = 70;
    // ctx.fillStyle="#FF0000";
    ctx.clearRect(psvX + 10, psvY - height - 20, 50, height);
  }

  //Outlet
  function outlet(boxX, boxY, boxWidth, boxHeight, ctx) {
    var outletX = boxX + boxWidth - 20,
      outletY = boxY + boxHeight;
    ctx.beginPath();
    ctx.moveTo(outletX, outletY);
    ctx.lineTo(outletX, outletY + 50);
    ctx.lineTo(outletX + 100, outletY + 50);
    ctx.stroke();
    triangle(outletX + 100, outletY + 50, 12.5, 'right', ctx);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  function inlet(boxX, boxY, ctx) {

    //Inlet
    var inletX = boxX + 20,
      side = 12.5,
      h = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
      inletY = boxY - h;
    triangle(inletX, inletY, side, 'down', ctx);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(inletX, inletY);
    ctx.lineTo(inletX, inletY - 50);
    ctx.lineTo(inletX - 100, inletY - 50);
    ctx.stroke();

    //InletBox
    var iBoxL = 50,
      iBoxX = inletX - 100 - iBoxL,
      iBoxY = inletY - 50 - iBoxL / 2;
    ctx.rect(iBoxX, iBoxY, iBoxL, iBoxL);
    ctx.stroke();
  }

  function inletBoxRed(boxX, boxY, ctx) {
    var inletX = boxX + 20,
      side = 12.5,
      height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
      inletY = boxY - height;
    var iBoxL = 50,
      iBoxX = inletX - 100 - iBoxL,
      iBoxY = inletY - 50 - iBoxL / 2;
    // ctx.rect(iBoxX,iBoxY,iBoxL,iBoxL);
    // ctx.stroke();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(iBoxX + 5, iBoxY + 5, iBoxL - 10, iBoxL - 10);
  }

  function inletBoxRedClear(boxX, boxY, ctx) {
    var inletX = boxX + 20,
      side = 12.5,
      height = Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)),
      inletY = boxY - height;
    var iBoxL = 50,
      iBoxX = inletX - 100 - iBoxL,
      iBoxY = inletY - 50 - iBoxL / 2;
    ctx.clearRect(iBoxX + 5, iBoxY + 5, iBoxL - 8, iBoxL - 8);
  }

  //Fill Center Box on Click
  function centerBoxFill(xStart, yStart, ctx) {
    var iBoxL = 50;
    // iBoxX = inletX-100-iBoxL,
    // iBoxY = inletY-50 - iBoxL/2;
    ctx.fillStyle = "#FF0000";
    var iBx = iBoxL - 10;
    ctx.fillRect(xStart - iBx / 2, yStart - iBx / 2, iBx, iBx);
  }

  function centerBoxClear(xStart, yStart, ctx) {
    var iBoxL = 50;
    var iBx = iBoxL - 10;
    ctx.clearRect(xStart - iBx / 2 - 1, yStart - iBx / 2 - 1, iBx + 2, iBx + 2);
  }





})
