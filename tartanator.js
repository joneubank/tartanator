"use strict";

/*
* Tartanator
* Author: Jon Eubank
* Version: 0.1
* Date: 27-11-2015
*/
var Tartanator = (function()
{

    /*
    * Color Factory
    *   Color.make - Return Color Object defined by rgba with values from 0 to 255
    *   Color.random - Return Color Object with random rgba. 
    */
    var Color = (function()
    {
        var make = function(r, g, b, a)
        {   
            r = r != undefined ? r : 0;
            g = g != undefined ? g : 0;
            b = b != undefined ? b : 0;
            a = a != undefined ? a : 255;

            if(r < 0) { r = 0;}
            if(g < 0) { g = 0;}
            if(b < 0) { b = 0;}
            if(a < 0) { a = 0;}

            if(r > 255) { r = 255;}
            if(g > 255) { g = 255;}
            if(b > 255) { b = 255;}
            if(a > 255) { a = 255;}

            var color = {
                r : r,
                g : g,
                b : b,
                a : a
            };

            /* dither
            * A random shift applied to the 
            */
            color.dither = function(rRange, gRange, bRange, aRange)
            {
                rRange = rRange != undefined ? rRange : 0;
                gRange = gRange != undefined ? gRange : 0;
                bRange = bRange != undefined ? bRange : 0;
                aRange = aRange != undefined ? aRange : 0;

                var r = (Math.random()*(rRange)|0)-rRange/2 + color.r;
                var g = (Math.random()*(gRange)|0)-gRange/2 + color.g;
                var b = (Math.random()*(bRange)|0)-bRange/2 + color.b;
                var a = (Math.random()*(aRange)|0)-aRange/2 + color.a;

                return make(r, g, b, a);
            }

            /*
            * returns the color as a string formatted as: #000000 
            * Note: no alpha value is returned, for that, use color.rgba
            *
            * options:
            *   The options allow replacement of a parameter of the color with a specific value
            *       without modifying the color itself
            *   r: 0-255, replacement r value to use
            *   g: 0-255, replacement g value to use
            *   b: 0-255, replacement b value to use
            *   a: 0-255, replacement a value to use
            */
            color.hex = function(options)
            {
                options = options != undefined ? options : {};
                options.r = options.r != undefined ? options.r : color.r;
                options.g = options.g != undefined ? options.g : color.g;
                options.b = options.b != undefined ? options.b : color.b;
                options.a = options.a != undefined ? options.a : color.a;

                return "#" + options.r.toString(16) + options.g.toString(16) + options.b.toString(16);
            }

            /*
            * returns the color as a string formatted as: rgba(0,0,0,0) 
            *
            * options:
            *   The options allow replacement of a parameter of the color with a specific value
            *       without modifying the color itself
            *   r: 0-255, replacement r value to use
            *   g: 0-255, replacement g value to use
            *   b: 0-255, replacement b value to use
            *   a: 0-255, replacement a value to use
            */
            color.rgba = function(options)
            {
                options = options != undefined ? options : {};
                options.r = options.r != undefined ? options.r : color.r;
                options.g = options.g != undefined ? options.g : color.g;
                options.b = options.b != undefined ? options.b : color.b;
                options.a = options.a != undefined ? options.a : color.a;

                return "rgba(" + options.r + "," + options.g + "," + options.b + "," + options.a + ")";
            }

            return color;
        }

        /** Color.random
        * Return a Color object created using the make(r, g, b, a) function
        * 
        * By default, the color will have a = 255, and r, g, b each between 0 and 255
        *
        * Using options you can set min and max values to restrict
        */
        var random = function(options) {
            var options = options != undefined ? options : {};

            var rMin = options.rMin != undefined ? options.rMin : 0;
            var gMin = options.gMin != undefined ? options.gMin : 0;
            var bMin = options.bMin != undefined ? options.bMin : 0;
            //aMin is intentionally 255 to keep the default a value exactly 255
            var aMin = options.aMin != undefined ? options.aMin : 255;

            var rMax = options.rMax != undefined ? options.rMax : 255;
            var gMax = options.gMax != undefined ? options.gMax : 255;
            var bMax = options.bMax != undefined ? options.bMax : 255;
            var aMax = options.aMax != undefined ? options.aMax : 255;

            if(rMax < rMin) {
                rMax = rMin;
            }
            if(gMax < gMin) {
                gMax = gMin;
            }
            if(bMax < bMin) {
                bMax = bMin;
            }
            if(aMax < aMin) {
                aMax = aMin;
            }

            var r = (Math.random()*(rMax-rMin)+rMin)|0;
            var g = (Math.random()*(gMax-gMin)+gMin)|0;
            var b = (Math.random()*(bMax-bMin)+bMin)|0;
            var a = (Math.random()*(aMax-aMin)+aMin)|0;

            return make(r, g, b, a);
        }


        return {
            make : make,
            random : random
        }

    })();


    var T = {
        Color : Color
    };

    // var Strip = function(size, color) 
    // {
    //     color = color != undefined ? color : "#000000";
    //     var strip = {
    //         size: size,
    //         color: color
    //     }
    //     return strip;
    // }

    // var buildDither = function(plaid, options)
    // {
    //     context.fillStyle = "#ffffff";
    //     context.fillRect(0,0,canvas.width, canvas.height);

    //     var data = context.getImageData9(0, 0, 10, 10);

    //     for(var i = 0; i < data.length; i++)
    //     {

    //     }

        
    // }

    // var buildBlend = function(plaid, options)
    // {   
    //     context.fillStyle = "#ffffff";
    //     context.fillRect(0,0,canvas.width, canvas.height);
    //     var ypos = 0;
    //     for(var i = 0; i < plaid.h.length; i++)
    //     {
    //         var bandwidth = canvas.height/plaid.getHeight()*plaid.h[i].size;
    //         if(i == plaid.h.length-1) 
    //         {
    //             bandwidth = canvas.height-ypos;
    //         }

    //         context.fillStyle = plaid.h[i].color;
    //         context.fillRect(0,ypos,canvas.width, bandwidth);
    //         ypos += bandwidth;
    //     }

    //     var xpos = 0;
    //     for(var i = 0; i < plaid.v.length; i++){
    //         var hex = plaid.v[i].color.substring(1);
    //         var rgb = Color.toRgb(hex);

    //         var bandwidth = canvas.width/plaid.getWidth()*plaid.v[i].size;
    //         if(i == plaid.v.length-1) 
    //         {
    //             bandwidth = canvas.width-xpos;
    //         }

    //         context.fillStyle = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + 0.5 + ")";
    //         context.fillRect(xpos, 0, bandwidth, canvas.height);
    //         xpos += bandwidth;
    //     }
    //     // context.fillStyle = Color.random();
    //     // context.fillRect(0,canvas.height/2,canvas.width, canvas.height/2);
    // }

    // var canvas = document.createElement('canvas');
    // var context = canvas.getContext('2d');

    // var plaid = {

    //     h: [],
    //     v: [],
    //     getWidth: function()
    //     {
    //         var width = 0;
    //         for(var i = 0; i < this.v.length; i++)
    //         {
    //             width += this.v[i].size;
    //         }
    //         return width;
    //     },
    //     getHeight: function()
    //     {
    //         var height = 0;
    //         for(var i = 0; i < this.h.length; i++)
    //         {
    //             height += this.h[i].size;
    //         }
    //         return height;
    //     },

    //     addHorizontal: function(width, color) 
    //     {
    //         this.h.push(Strip(width, color));
    //     },
    //     addVertical: function(width, color)
    //     {
    //         this.v.push(Strip(width, color));
    //     },
    //     createStrip: Strip,

    //     /* Generate the plaid pattern on its stored canvas that will be used as a fill pattern.
    //      * 
    //      * input options = {
    //      *   style:   "dither"|"blend",
    //      *   width:   100, //value in pixels
    //      *   height:  100  //value in pixels 
    //      * }
    //      */
    //     build: function (options) {
    //         options = options != undefined ? options : {};
    //         options.style = options.style != undefined ? options.style : "blend";
    //         //If a dimension isn't provided, use a 1:1 scaling based on their ratios defined originally
    //         options.width = isNaN(options.width) ? this.getWidth() : options.width;
    //         options.height = isNaN(options.height) ? this.getHeight() : options.height;

    //         canvas.width = options.width;
    //         canvas.height = options.height;

    //         switch(options.style) {
    //             case "dither":
    //                 buildDither(this);
    //                 break;
    //             default:
    //                 buildBlend(this);
    //                 break;
    //         }
    //     },

    //     getPattern: function (context) 
    //     {
    //         return context.createPattern(canvas,"repeat");
    //     }

    // };

    return T;
})();