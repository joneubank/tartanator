"use strict";

function setBackground(plaid)
{
    plaid.build({width:width, height:height});
    var dataUrl = plaid.getDataUrl();

    var display = document.getElementById("tartan-display");
    display.style.backgroundImage = "url("+dataUrl+")";
    
}



// var color1 = Tartanator.Color.make(200, 40, 10);
// var color2 = Tartanator.Color.make(10, 10, 90);
var color1 = Tartanator.Color.random();
var color2 = Tartanator.Color.random();

var plaid = Tartanator.blank();
plaid.addHorizontal(10, color1);
plaid.addHorizontal(2, color2);
plaid.addHorizontal(1, color1);
plaid.addHorizontal(8, color2);
plaid.addHorizontal(1, color1);
plaid.addHorizontal(2, color2);
plaid.addVertical(10, color1);
plaid.addVertical(2, color2);
plaid.addVertical(1, color1);
plaid.addVertical(8, color2);
plaid.addVertical(1, color1);
plaid.addVertical(2, color2);

var width = 200;
var height = 200;


setBackground(plaid);

