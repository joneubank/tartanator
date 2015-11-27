"use strict";

var canvas = Canvas('canvas');

var plaid = Plaid();

var formAction_randomize = function()
{
    plaid = Plaid();
    plaid.addHorizontal(2, Color.random());
    plaid.addHorizontal(1, "#ffffff");
    plaid.addHorizontal(2, Color.random());
    plaid.addHorizontal(1, "#ffffff");
    plaid.addVertical(  2, Color.random());
    plaid.addVertical(  1, "#ffffff");
    plaid.addVertical(  2, Color.random());
    plaid.addVertical(  1, "#ffffff");
    plaid.build({width:150,height:150});
    canvas.redraw();
}

formAction_randomize();

canvas.draw = function(context, canvas, camera) 
{
    context.fillStyle = plaid.getPattern(context);
    context.fillRect(0, 0, canvas._elem.width, canvas._elem.height);
}
canvas.resize();