# tartanator
JavaScript library for Tartan (Plaid) data objects capable of generating tartan coloured image data or html markup.

The Tartanator object created by the tartanator.js script provides the following functionality:
* Tartan Data Object
* Generate blank Tartan and define properties
* Factory Methods to generate a Tartan through randomized procedure
* Parameterized generation algorithm providing user guidance of randomization

A Tartan object provides the following:
* Definition of the plaid pattern (horizontal and vertical stripe pattern with defined widths and colours)
* Image Data generation from pattern
* HTML markup of the patarn using spans or div tags with coloured backgrounds

## tartanator/Demo
The demo folder includes a single page application gui to demonstrate use of the Tartanator. Using it you can design a plaid pattern from scratch or generate a new one using the generation procedure.

Tartans created in the demo can be downloaded as images. Feel free to use this a tool for plaid pattern generation or copy the code to use for your own application.

The demo app is hosted here: [Tartanator Demo](http://joneubank.com/things/tartanator/demo)

## Object Reference
### Tartanator
The object output by tartanator.js

Contains several other object definitions, each described in following sections:
* Color

### Tartanator.Color
Color Object factory with the following functions:

#### Tartanator.Color.make(r, g, b, a)
Returns a Color object with the R, G, B, A values defined in the input.

####Tartanator.Color.random(options)
Returns a Color object with randomly generated R, G, B, A values. By default, A will be 255 and R, G, B will be between 0 and 255

An options object can be provided to change the range for each channel that will be selected. Available settings and their default values are below:
```javascript

options = {

    //min and max values for R channel
    rMin : 0, 
    rMax : 255,

    //min and max values for G channel
    gMin : 0, 
    gMax : 255,
    
    //min and max values for B channel
    bMin : 0, 
    bMax : 255,
    
    //min and max values for A channel
    aMin : 255, 
    aMax : 255,

}
```

### Color Object
Created by Tartanator.Color factory methods (make() and random()).

| Member | Expected Type | Use |
| ------ |:-------------:|:---:|
| r      | Integer (0-255) | Red channel value |
| g      | Integer (0-255) | Green channel value |
| b      | Integer (0-255) | Blue channel value |
| a      | Integer (0-255) | Alpha channel value |
| | |
| dither | function(rRange, bRange, gRange, aRange) | new random color random based on this one |
| shift | function(rMod, bMod, gMod, aMod) | new color defined by this one plus the input parameters |
| | |
| hex | function(options) | returns color as string formatted: #000000 |
| rgba | function(options) | returns color as string formatted: rgba(00, 00, 00, 00) |

#### hex(options)
Function belonging to a generated Color object. Returns the color as a string formatted like: #000000

An object can be passed as options. Options are used to specify a channel's value in the output without modifying the color object's actual value. Leaving an option unspecified will cause the color's actual value to be used.

```javascript

options = {

   r : undefined,
   g : undefined,
   b : undefined,
   a : undefined

}
```

#### rgba(options)
Function belonging to a generated Color object. Returns the color as a string formatted like: rgba(00, 00, 00, 00)

An object can be passed as options. Options are used to specify a channel's value in the output without modifying the color object's actual value. Leaving an option unspecified will cause the color's actual value to be used.

```javascript

options = {

   r : undefined,
   g : undefined,
   b : undefined,
   a : undefined

}
```