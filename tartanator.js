"use strict";

var Tartanator = function()
{
    var Strip = function(size, color) 
    {
        var strip = {
            size: size,
            color: color
        }
        return strip;
    }

    var buildDither = function(plaid, options)
    {
        context.fillStyle = "#ffffff";
        context.fillRect(0,0,canvas.width, canvas.height);

        var data = context.getImageData9(0, 0, 10, 10);

        for(var i = 0; i < data.length; i++)
        {

        }

        
    }

    var buildBlend = function(plaid, options)
    {   
        context.fillStyle = "#ffffff";
        context.fillRect(0,0,canvas.width, canvas.height);
        var ypos = 0;
        for(var i = 0; i < plaid.h.length; i++)
        {
            var bandwidth = canvas.height/plaid.getHeight()*plaid.h[i].size;
            if(i == plaid.h.length-1) 
            {
                bandwidth = canvas.height-ypos;
            }

            context.fillStyle = plaid.h[i].color;
            context.fillRect(0,ypos,canvas.width, bandwidth);
            ypos += bandwidth;
        }

        var xpos = 0;
        for(var i = 0; i < plaid.v.length; i++){
            var hex = plaid.v[i].color.substring(1);
            var rgb = Color.toRgb(hex);

            var bandwidth = canvas.width/plaid.getWidth()*plaid.v[i].size;
            if(i == plaid.v.length-1) 
            {
                bandwidth = canvas.width-xpos;
            }

            context.fillStyle = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + 0.5 + ")";
            context.fillRect(xpos, 0, bandwidth, canvas.height);
            xpos += bandwidth;
        }
        // context.fillStyle = Color.random();
        // context.fillRect(0,canvas.height/2,canvas.width, canvas.height/2);
    }

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var plaid = {

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
            this.h.push(Strip(width, color));
        },
        addVertical: function(width, color)
        {
            this.v.push(Strip(width, color));
        },
        createStrip: Strip,

        /* Generate the plaid pattern on its stored canvas that will be used as a fill pattern.
         * 
         * input options = {
         *   style:   "dither"|"blend",
         *   width:   100, //value in pixels
         *   height:  100  //value in pixels 
         * }
         */
        build: function (options) {
            options = options != undefined ? options : {};
            options.style = options.style != undefined ? options.style : "blend";
            //If a dimension isn't provided, use a 1:1 scaling based on their ratios defined originally
            options.width = isNaN(options.width) ? this.getWidth() : options.width;
            options.height = isNaN(options.height) ? this.getHeight() : options.height;

            canvas.width = options.width;
            canvas.height = options.height;

            switch(options.style) {
                case "dither":
                    buildDither(this);
                    break;
                default:
                    buildBlend(this);
                    break;
            }
        },

        getPattern: function (context) 
        {
            return context.createPattern(canvas,"repeat");
        }

    };

    return plaid;
};