"use strict";

function randomizeTartan()
{
    // var color1 = Tartanator.Color.make(137, 71, 31);
    // var color2 = Tartanator.Color.make(21, 39, 28);
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

    setBackground(plaid);
}


//Catchphrase:
var phrases = [
    "\"I'll be Plaid...\" -The Tartanator",
    "This. Is. Tartaaaan!",
    "Clash of the Tartans"
];

var currentPassphrase = -1;
function setCatchphrase()
{
    var phrasetag = document.getElementById("tartan-random");
    var selectedPhrase = currentPassphrase;
    while(selectedPhrase == currentPassphrase) {
        selectedPhrase = Math.random()*phrases.length|0;
    } 
    currentPassphrase = selectedPhrase;
    phrasetag.innerHTML = phrases[selectedPhrase];
};

/*
* HUD setup:
*/
$("button").button();
$("#tartan-random").click(function( event ) {
    randomizeTartan();
    setCatchphrase();
});

//Background updates:
function setBackground(plaid)
{
    var width = 200;
    var height = 200;

    plaid.build({width:width, height:height});
    var dataUrl = plaid.getDataUrl();

    var display = document.getElementById("tartan-display");
    display.style.backgroundImage = "url("+dataUrl+")";
    
}


//On Load
$(function(){
    randomizeTartan();
    setCatchphrase();
});