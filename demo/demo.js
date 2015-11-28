"use strict";
var color1;
var color2;
var plaid = Tartanator.blank();
var datgui = new dat.GUI();

function randomizeTartan()
{
    // var color1 = Tartanator.Color.make(137, 71, 31);
    // var color2 = Tartanator.Color.make(21, 39, 28);
    color1 = Tartanator.Color.random();
    color2 = Tartanator.Color.random();
    console.log(color1);
    console.log(color2);

    plaid = Tartanator.blank();
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

    updateDatGui();
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
$("#tartan-random").button().click(function( event ) {
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


function updateDatGui()
{
    datgui.destroy();
    datgui = new dat.GUI();

    var colorFolder = datgui.addFolder("Colors");
    colorFolder.addColor(color1,"guivalue").onChange(function(){
        color1.updateFromGui();
        setBackground(plaid);
    })
    colorFolder.addColor(color2,"guivalue").onChange(function(){
        color2.updateFromGui();
        setBackground(plaid);
    })

    var hFolder = datgui.addFolder('Horizontal Stripes');
    for(var i = 0; i < plaid.h.length; i++)
    {
        hFolder.add(plaid.h[i],"size", 0, 20).onChange(function(){
            setBackground(plaid);
        });
    }

    var vFolder = datgui.addFolder('Vertical Stripes');
    for(var i = 0; i < plaid.v.length; i++)
    {
        vFolder.add(plaid.v[i],"size", 0, 20).onChange(function(){
            setBackground(plaid);
        });
    }
};


//On Load
$(function(){
    randomizeTartan();
    setCatchphrase();
});