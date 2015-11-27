var Color = 
{
    random: function() 
    {
        return "#"+("000000" + ((1<<24)*Math.random()|0).toString(16)).substr(-6);
    },

    /*
    * Invert takes an input of the form '#xxx' or '#xxxxxx' where x is a hex digit
    * Returns the inverted color from the value entered in the same format, 
    *   or '#fff' if the input format was wrong or an error occurs
    */
    invert: function(color) {
        var output = "#fff";

        if(color.length == 7) {
            var temp = color.substr(-6);
            var r = parseInt(temp.substr(0,2), 16);
            var g = parseInt(temp.substr(2,2), 16);
            var b = parseInt(temp.substr(4,2), 16);

            var invR = 255-r;
            var invG = 255-g;
            var invB = 255-b;

            output = "#" + ("00"+invR.toString(16)).substr(-2) + ("00"+invG.toString(16)).substr(-2) + ("00"+invB.toString(16)).substr(-2);
        } else if (color.length == 4) {
            var temp = color.substr(-3);
            var r = parseInt(temp.substr(0,1), 16);
            var g = parseInt(temp.substr(1,1), 16);
            var b = parseInt(temp.substr(2,1), 16);

            var invR = 15-r;
            var invG = 15-g;
            var invB = 15-b;

            output = "#" + invR.toString(16) + invG.toString(16) + invB.toString(16);
        }

        return output;
    },


    toRgb: function(hex)
    {
        var output = {};
        output.bigint = parseInt(hex, 16);
        output.r = (output.bigint >> 16) & 255;
        output.g = (output.bigint >> 8) & 255;
        output.b = output.bigint & 255;

        return output;
    }
}

var Shapes = {

    circle : function (radius, posx, posy, fill)
    {
        var circle = {};
        circle.radius = radius;
        circle.x = posx;
        circle.y = posy;
        circle.fill = fill;
        circle.draw = function (context, canvas, camera) 
        {
            camera = camera != undefined ? camera : {};
            camera.x = camera.x !== undefined ? camera.x : 0;
            camera.y = camera.y !== undefined ? camera.y : 0;
            camera.zoom = camera.zoom !== undefined ? camera.zoom : 1;

            var xoff = (circle.x+camera.x)*camera.zoom;
            var yoff = (circle.y + camera.y)*camera.zoom;

            
            context.save();
            context.beginPath();
            context.translate(xoff, yoff);
            context.arc(0, 0, circle.radius*camera.zoom, 0, 2 * Math.PI, false);
            context.fillStyle = circle.fill;
            context.fill();
            context.restore();
        }
        return circle;
    },

    square : function(width, posx, posy, fill) 
    {
        var square = {};
        square.width = width;
        square.x = posx;
        square.y = posy;
        square.fill = fill;
        
        square.draw = function(context, canvas, camera)
        {
            camera = camera != undefined ? camera : {};
            camera.x = camera.x !== undefined ? camera.x : 0;
            camera.y = camera.y !== undefined ? camera.y : 0;
            camera.zoom = camera.zoom !== undefined ? camera.zoom : 1;

            var halfWidth = square.width/2;
            context.fillStyle = square.fill;
            context.fillRect( (square.x+camera.x-halfWidth)*camera.zoom, (square.y + camera.y-halfWidth)*camera.zoom, halfWidth*camera.zoom, halfWidth*camera.zoom);
        }
    }
}

var Util = {
    "circToCart" : function (radians, radius) 
    {
        return {
            "x" : radius * Math.cos(radians),
            "y" : radius * Math.sin(radians)
        };
    },

    "cleanList" : function(originalList)
    {
        var output = [];
        for(var i = 0; i < originalList.length; i++)
        {
            if(originalList[i])
            {
                output.push(originalList[i]);
            }
        }
        return output;
    },

    "drawList" : function(list, context, canvas, camera)
    {
        for (var i = 0; i < list.length; i++)
        {
            var object = list[i];
            if (object)
            {
                object.draw(context, canvas, camera);
            }
        }
    },

    "updateList" : function(list, canvas, loop, aliveCheck, clearDead)
    {
        aliveCheck = aliveCheck != undefined ? aliveCheck : true;
        clearDead = clearDead != undefined ? clearDead : true;

        for(var i = 0; i < list.length; i++)
        {
            var item = list[i];
            if(item)
            {
                if (item.alive || !aliveCheck)
                {
                    item.update(canvas, loop);
                } else {
                    if(clearDead) { list[i] = undefined; }
                }    
            }
            
        }
    },

    "addToList" : function(list, obj)
    {
        var i = list.indexOf(undefined);
        if(i < 0) {list.push(obj);}
        else {list[i]=obj;}
    },

    "randomInt" : function(min, max)
    {
        return Math.random()*(max-min)+min;
    },

    "relativeCoords" :  function (event, elem)
    {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;

        do{
            totalOffsetX += elem.offsetLeft - elem.scrollLeft;
            totalOffsetY += elem.offsetTop - elem.scrollTop;
        }
        while(elem = elem.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        return {x:canvasX, y:canvasY}
    }

}

/* ========================
 * Camera Definition
 * ===================== */
function Camera() {}
Camera.prototype.x = 0;
Camera.prototype.y = 0;
Camera.prototype.zoom = 1;

Camera.prototype.multZoom = function(multiplier) 
{
    this.zoom *= multiplier;
}

Camera.prototype.move = function(x, y, relativeToZoom)
{
    relativeToZoom = relativeToZoom == undefined ? true : false;
    
    this.x = relativeToZoom
                ? this.x + x/zoom
                : this.x + x;
    this.y = relativeToZoom
                ? this.y + y/zoom
                : this.y + y;
}

var Canvas = function(canvasId, resizeListenerOn) {
    resizeListenerOn = resizeListenerOn !== undefined ? resizeListenerOn : true;

    var canvas = {};

    canvas.data = {};
    canvas._elem  = null;
    canvas._context = null;

    canvas._resizeListener = resizeListenerOn;

    canvas.camera = new Camera();

    canvas.draw = function(context, canvas, camera) { }

    canvas.redraw = function() 
    {
        canvas._context.clearRect(0,0,canvas._elem.width,canvas._elem.height);
        canvas.draw(canvas._context, canvas, canvas.camera);
    }

    canvas.resize = function() 
    {
        canvas._elem.width = canvas._elem.parentElement.offsetWidth;
        canvas._elem.height = canvas._elem.parentElement.offsetHeight;
        canvas.redraw();
    }


    //TODO: hud interactions (keystrokes to show/hide, make collapsable)
    canvas._setupHud = function() {
        // document.getElementById("hud").getElementsByClass("");
    }

    /***************
        Init Code 
     **************/
    canvas._elem = document.getElementById(canvasId);
    canvas._context = canvas._elem.getContext('2d');

    //Register resize event listener
    window.addEventListener('resize', function() 
    {
        if(canvas._resizeListener) 
        {
            canvas.resize();
        }
    },
    false);
    canvas.resize();
    
    // _setupHud();
    
    return canvas;
};




// document.addEventListener(
//         'DOMContentLoaded', 
//         function() {
//             Canvas.init('canvas');
//         }, 
//         false
//     );