(function(T){
"use strict";

//Catchphrase:
var phrases = [
    "\"I'll be Plaid...\" -The Tartanator",
    "This. Is. Tartaaaan!",
    "Clash of the Tartans",
    "Let there be Plaid",
    "iPlaid",
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
}

/*
* guiData is the JSON that drives the dat.gui menu
*   the object names are user readable instead of built to developer standards
*/
T.guiData = {

    /*
    * Color Data
    */
    "Colors" : [],
    "Color Names" : [],
    "Add Color" : function(r, g, b)
    {
        r = r !== undefined ? r : (Math.random()*255)|0;
        g = g !== undefined ? g : (Math.random()*255)|0;
        b = b !== undefined ? b : (Math.random()*255)|0;

        // label = a Human Readable name for the color object stored
        var label = "Color " + (this.Colors.length + 1);
        var color = {};
        color[label] = [r, g, b,255];

        this.Colors.push(color);
        this["Color Names"].push(label);
    },

    "Remove Color Number" : 1,
    "Remove Color" : function(index)
    {
        index = index !== undefined ? index : this["Remove Color Number"];

        if (index < this.Colors.length)
        {
            this.Colors[index - 1] = undefined;
            this["Color Names"][index - 1] = undefined;
        }

        var tempColors = [];
        for (var i = 0; i < this.Colors.length; i++)
        {
            if(this.Colors[i] !== undefined)
            {
                tempColors.push(this.Colors[i]);
            }
        }
        this.Colors = tempColors;

        var tempNames = [];
        for (var j = 0; j < this["Color Names"].length; j++)
        {
            if(this["Color Names"][j] !== undefined)
            {
                tempNames.push(this["Color Names"][j]);
            }
        }
        this["Color Names"] = tempNames;
    },

    /*
    * Stripe Data
    */
    /* -- Horizontal -- */
    "hStripes" : [],
    "Add Horizontal" : function(width, color)
    {
        width = width !== undefined ? width : 1;
        color = color !== undefined ? color : this["Color Names"][0];
        var stripe = {
            "Width" : width,
            "Color" : color
        };
        this.hStripes.push(stripe);
    },
    "Remove Horizontal" : function()
    {
        if(this.hStripes.length > 1)
        {
            this.hStrips.pop();
        }
    },

    /* -- Vertical -- */
    "vStripes" : [],
    "Add Vertical" : function(width, color)
    {
        width = width !== undefined ? width : 1;
        color = color !== undefined ? color : this["Color Names"][0];
        var stripe = {
            "Width" : width,
            "Color" : color
        };
        this.vStripes.push(stripe);
    },

    "Remove Vertical" : function()
    {
        if(this.vStripes.length > 1)
        {
            this.vStrips.pop();
        }
    },

    /*
    * Build Propeties
    */
    "Fixed Size" : false,
    "ScaleZoom" : 10,
    "Fixed Width" : 200,
    "Fixed Height" : 200,

    /*
    * Generation Algorithms
    */
    "Generate" : function(options)
    {
        this.Reset();
        this["Add Color"]();
        this["Add Color"]();

        this["Add Horizontal"](10,this["Color Names"][0]);
        // this["Add Horizontal"](2,this["Color Names"][1]);
        // this["Add Horizontal"](5,this["Color Names"][0]);
        this["Add Horizontal"](10,this["Color Names"][1]);
        // this["Add Horizontal"](2,this["Color Names"][0]);
        this["Add Vertical"](10,this["Color Names"][0]);
        // this["Add Vertical"](2,this["Color Names"][1]);
        // this["Add Vertical"](5,this["Color Names"][0]);
        this["Add Vertical"](10,this["Color Names"][1]);
        // this["Add Vertical"](2,this["Color Names"][0]);

        createGui();
        updateObject();
    },

    "Reset" : function()
    {
        this.Colors = [];
        this["Remove Color Number"] = 1;

        this.hStripes = [];
        this.vStripes = [];
    }

};

/*
* Tartan object
*/
function updateObject()
{
    T.plaid = T.blank();

    //Create Colors from guiData
    var colors = {};
    var srcColors = T.guiData.Colors;
    var srcColorNames = T.guiData["Color Names"];

    for (var i = 0; i < srcColors.length; i++)
    {
        var data = srcColors[i][srcColorNames[i]];
        var color = T.Color.make(data[0], data[1], data[2], 255);
        colors[srcColorNames[i]] = color;
    }

    var hList = T.guiData.hStripes;
    for(var h = 0; h < hList.length; h++)
    {
        var hStripe = hList[h];
        T.plaid.addHorizontal(hStripe.Width, colors[hStripe.Color]);
    }

    var vList = T.guiData.vStripes;
    for(var v = 0; v < vList.length; v++)
    {
        var vStripe = vList[v];
        T.plaid.addVertical(vStripe.Width, colors[vStripe.Color]);
    }

    setBackground(T.plaid);
}

/*
* Build the dat.gui menu.
* This will destroy the existing datgui, replacing it with a new one built from
*   the current guiData object
*/
function createGui()
{
    //Destroy and Recreate
    if(T.datgui)
    {
        T.datgui.destroy();
    }
    T.datgui = new dat.GUI();

    /*
    * Color Menu
    */
    var colorFolder = T.datgui.addFolder("Colors");
    var colors = T.guiData.Colors;
    for(var i = 0; i < colors.length; i++)
    {
        var color = colors[i];
        var colorLabel = Object.keys(color)[0];
        colorFolder.addColor(color, colorLabel)
                    .onChange(updateObject);
    }
    colorFolder.add(T.guiData,"Add Color")
                .onFinishChange(createGui);

    /* Remove Color code - Not really a needed feature */
    // var removeColorFolder = colorFolder.addFolder("Remove Color");
    // removeColorFolder.add(T.guiData,"Remove Color Number");
    // removeColorFolder.add(T.guiData,"Remove Color")
    //             .onFinishChange(createGui);

    colorFolder.open();

    /*
    * Horizontal Stripe Menu
    */

    var hFolder = T.datgui.addFolder("Horizontal Stripes");
    for(var h = 0; h < T.guiData.hStripes.length; h++)
    {
        var hStripeFolder = hFolder.addFolder("H-" + (h+1));
        hStripeFolder.add(T.guiData.hStripes[h],"Width",0.1,20)
                    .onChange(updateObject);
        hStripeFolder.add(T.guiData.hStripes[h],"Color",T.guiData["Color Names"])
                    .onChange(updateObject);
    }
    hFolder.add(T.guiData,"Add Horizontal")
           .onFinishChange(createGui);
    hFolder.add(T.guiData,"Remove Horizontal")
           .onFinishChange(createGui);

    hFolder.open();

    /*
    * Vertical Stripe Menu
    */

    var vFolder = T.datgui.addFolder("Vertical Stripes");
    for(var v = 0; v < T.guiData.vStripes.length; v++)
    {
        var vStripeFolder = vFolder.addFolder("V-" + (v+1));
        vStripeFolder.add(T.guiData.vStripes[v],"Width",0.1,20)
                    .onChange(updateObject);
        vStripeFolder.add(T.guiData.vStripes[v],"Color",T.guiData["Color Names"])
                    .onChange(updateObject);
    }
    vFolder.add(T.guiData,"Add Vertical")
           .onFinishChange(createGui);
    vFolder.add(T.guiData,"Remove Vertical")
           .onFinishChange(createGui);

    vFolder.open();
    // for(var i = 0; i < T.plaid.h.length; i++)
    // {
    //     hFolder.add(T.plaid.h[i],"size", 0, 20).onChange(update);
    // }

    // var vFolder = T.datgui.addFolder('Vertical Stripes');
    // for(var j = 0; j < T.plaid.v.length; j++)
    // {
    //     vFolder.add(T.plaid.v[j],"size", 0, 20).onChange(update);
    // }
}

function randomizeTartan()
{

    T.plaid = T.blank();
    var color1 = T.Color.make(137, 71, 31);
    var color2 = T.Color.make(21, 39, 28);
    // color1 = T.Color.random();
    // color2 = T.Color.random();
    // console.log(color1);
    // console.log(color2);

    // T.plaid = T.blank();
    T.plaid.addHorizontal(10, color1);
    T.plaid.addHorizontal(2, color2);
    // T.plaid.addHorizontal(1, color1);
    // T.plaid.addHorizontal(8, color2);
    // T.plaid.addHorizontal(1, color1);
    // T.plaid.addHorizontal(2, color2);
    T.plaid.addVertical(10, color1);
    T.plaid.addVertical(2, color2);
    // T.plaid.addVertical(1, color1);
    // T.plaid.addVertical(8, color2);
    // T.plaid.addVertical(1, color1);
    // T.plaid.addVertical(2, color2);

    setBackground(T.plaid);

    createGui();
}


/*
* HUD setup:
*/
$("#tartan-random").button().click(function( event ) {
    T.guiData.Generate();
    setCatchphrase();
});

//Background updates:
function setBackground(plaid)
{
    var width = 200;
    var height = 200;

    T.plaid.build({width:width, height:height});
    var dataUrl = plaid.getDataUrl();

    var display = document.getElementById("tartan-display");
    display.style.backgroundImage = "url("+dataUrl+")";

}





//On Load
setCatchphrase();
T.guiData.Generate();

})(Tartanator);
