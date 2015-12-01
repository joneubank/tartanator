/*
* Tartanator
* Author: Jon Eubank
* Version: 0.1.2
* Date: 30-11-2015
*/
var Tartanator = (function()
{
    "use strict";

    /*
    * Color Factory
    *   Color.make - Return Color Object defined by rgba with values from 0 to 255
    *   Color.random - Return Color Object with random rgba.
    */
    var Color = (function()
    {
        var make = function(r, g, b, a)
        {
            r = r !== undefined ? r|0 : 0;
            g = g !== undefined ? g|0 : 0;
            b = b !== undefined ? b|0 : 0;
            a = a !== undefined ? a|0 : 255;

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
            * Returns a new color based off this color, with a random shift across each of r, g, b, a
            *
            *   Sure maybe this isn't what dither really means but it gives you the randomly varied color
            *   you might use while dithering...
            */
            color.dither = function(rRange, gRange, bRange, aRange)
            {
                rRange = rRange !== undefined ? rRange : 0;
                gRange = gRange !== undefined ? gRange : 0;
                bRange = bRange !== undefined ? bRange : 0;
                aRange = aRange !== undefined ? aRange : 0;

                var r = (Math.random()*(rRange)|0)-rRange/2 + color.r;
                var g = (Math.random()*(gRange)|0)-gRange/2 + color.g;
                var b = (Math.random()*(bRange)|0)-bRange/2 + color.b;
                var a = (Math.random()*(aRange)|0)-aRange/2 + color.a;

                return make(r, g, b, a);
            };

            /* shift
            * Returns a new color based off this color, with each color channel shifted a defined amount
            */
            color.shift = function(rMod, gMod, bMod, aMod)
            {
                rRange = rRange !== undefined ? rRange : 0;
                gRange = gRange !== undefined ? gRange : 0;
                bRange = bRange !== undefined ? bRange : 0;
                aRange = aRange !== undefined ? aRange : 0;

                var r = (Math.random()*(rRange)|0)-rRange/2 + color.r;
                var g = (Math.random()*(gRange)|0)-gRange/2 + color.g;
                var b = (Math.random()*(bRange)|0)-bRange/2 + color.b;
                var a = (Math.random()*(aRange)|0)-aRange/2 + color.a;

                return make(r, g, b, a);
            };

            /*
            * returns the color as a string formatted as: #000000
            * Note: no alpha value is returned, for that, use color.rgba
            *
            * options:
            *   The options allow replacement of a parameter of the color with a
            *   specific value without modifying the color itself
            *   r: 0-255, replacement r value to use
            *   g: 0-255, replacement g value to use
            *   b: 0-255, replacement b value to use
            *   a: 0-255, replacement a value to use
            */
            color.hex = function(options)
            {
                options = options !== undefined ? options : {};
                options.r = options.r !== undefined ? options.r : color.r;
                options.g = options.g !== undefined ? options.g : color.g;
                options.b = options.b !== undefined ? options.b : color.b;
                options.a = options.a !== undefined ? options.a : color.a;

                return    "#" + ("00"+options.r.toString(16)).substr(-2) + ("00"+options.g.toString(16)).substr(-2) + ("00"+options.b.toString(16)).substr(-2);
            };

            /*
            * returns the color as a string formatted as: rgba(0,0,0,0)
            *
            * options:
            *   The options allow replacement of a parameter of the color with a
            *    specific value without modifying the color itself
            *   r: 0-255, replacement r value to use
            *   g: 0-255, replacement g value to use
            *   b: 0-255, replacement b value to use
            *   a: 0-255, replacement a value to use
            */
            color.rgba = function(options)
            {
                options = options !== undefined ? options : {};
                options.r = options.r !== undefined ? options.r : color.r;
                options.g = options.g !== undefined ? options.g : color.g;
                options.b = options.b !== undefined ? options.b : color.b;
                options.a = options.a !== undefined ? options.a : color.a;

                return "rgba(" + options.r + "," + options.g + "," + options.b + "," + options.a + ")";
            };

            return color;
        };

        /** Color.random
        * Return a Color object created using the make(r, g, b, a) function
        *
        * By default, the color will have a = 255, and r, g, b each between 0 and 255
        *
        * Using options you can set min and max values to restrict the set of colors this will generate.
        * options:
        *   rMin, gMin, bMin, aMin : the minimum possible value for each channel (default 0, aMin default 255)
        *   rMax, gMax, bMax, aMax : the maximum possible value for each channel (default 255)
        */
        var random = function(options)
        {
            options = options !== undefined ? options : {};

            var rMin = options.rMin !== undefined ? options.rMin : 0;
            var gMin = options.gMin !== undefined ? options.gMin : 0;
            var bMin = options.bMin !== undefined ? options.bMin : 0;
            //aMin is intentionally 255 to keep the default a value exactly 255
            var aMin = options.aMin !== undefined ? options.aMin : 255;

            var rMax = options.rMax !== undefined ? options.rMax : 255;
            var gMax = options.gMax !== undefined ? options.gMax : 255;
            var bMax = options.bMax !== undefined ? options.bMax : 255;
            var aMax = options.aMax !== undefined ? options.aMax : 255;

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
        };

        return {
            make : make,
            random : random
        };
    })();



    /** Tartanator.blank
    * The main Tartan factory method. Returns a Tartan object without any stripes defined.
    */
    var blank = function() {
        var buildBlend = function(tartan, options){
            context.fillStyle = "#ffffff";
            context.fillRect(0,0,canvas.width, canvas.height);

            var ypos = 0;
            for(var i = 0; i < tartan.h.length; i++)
            {
                var ybandwidth = canvas.height/tartan.getHeight()*tartan.h[i].size;
                if(i == tartan.h.length-1)
                {
                    ybandwidth = canvas.height-ypos;
                }

                context.fillStyle = tartan.h[i].color.hex();
                context.fillRect(0,ypos,canvas.width, ybandwidth);
                ypos += ybandwidth;
            }

            var xpos = 0;
            for(var j = 0; j < tartan.v.length; j++){


                var xbandwidth = canvas.width/tartan.getWidth()*tartan.v[j].size;
                if(j == tartan.v.length-1)
                {
                    xbandwidth = canvas.width-xpos;
                }

                context.fillStyle = tartan.v[j].color.rgba({a:0.5});
                context.fillRect(xpos, 0, xbandwidth, canvas.height);
                xpos += xbandwidth;
            }
        };


        var Strip = function(size, color)
        {
            return {
                size: size,
                color: color
            };
        };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        return {
            h: [],
            v: [],
            getWidth: function()
            {
                var width = 0;
                for(var i = 0; i < this.v.length; i++)
                {
                    width += this.v[i].size;
                }
                return width;
            },
            getHeight: function()
            {
                var height = 0;
                for(var i = 0; i < this.h.length; i++)
                {
                    height += this.h[i].size;
                }
                return height;
            },

            addHorizontal: function(width, color)
            {
                this.h.push(new Strip(width, color));
            },
            addVertical: function(width, color)
            {
                this.v.push(new Strip(width, color));
            },
            getImageData: function(){ return context.getImageData();},
            getDataUrl: function(){ return canvas.toDataURL();},

            build: function(options)
            {
                options = options !== undefined ? options : {};
                options.style = options.style !== undefined ? options.style : "blend";

                //If a dimension isn't provided, use a 1:1 scaling based on
                //their ratios defined originally
                options.width = isNaN(options.width) ? this.getWidth() : options.width;
                options.height = isNaN(options.height) ? this.getHeight() : options.height;

                canvas.width = options.width;
                canvas.height = options.height;

                buildBlend(this, options);
            }
        };
    };

    var random = function(options)
    {
        return blank();
    };

    var T = {
        Color : Color,
        blank: blank,
        random: random
    };

    return T;
})();
