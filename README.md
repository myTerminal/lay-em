# lay-em

[![npm version](https://badge.fury.io/js/lay-em.svg)](https://badge.fury.io/js/lay-em)
[![npm downloads](https://img.shields.io/npm/dt/lay-em.svg)](https://www.npmjs.com/package/lay-em)  
[![Build Status](https://travis-ci.org/myTerminal/lay-em.svg?branch=master)](https://travis-ci.org/myTerminal/lay-em)
[![Code Climate](https://codeclimate.com/github/myTerminal/lay-em.png)](https://codeclimate.com/github/myTerminal/lay-em)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/lay-em.svg)](https://coveralls.io/r/myTerminal/lay-em?branch=master)  
[![Dependency Status](https://david-dm.org/myTerminal/lay-em.svg)](https://david-dm.org/myTerminal/lay-em)
[![devDependency Status](https://david-dm.org/myTerminal/lay-em/dev-status.svg)](https://david-dm.org/myTerminal/lay-em#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/lay-em/peer-status.svg)](https://david-dm.org/myTerminal/lay-em#info=peerDependencies)  
[![License](https://img.shields.io/github/license/myTerminal/lay-em.svg)](https://opensource.org/licenses/MIT)  
[![NPM](https://nodei.co/npm/lay-em.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/lay-em/)

A library to create cross-browser, self-adjusting HTML layouts

## Features

* Creates perfectly fitting layouts on request
* A simple abstraction over DOM manipulations

## How to Use

### Directly from a web page

One can use *lay-em* directly from a web-page by attaching the *lay-em.js* to the DOM.

    <!-- Attaching the lay-em script -->
    <script type="text/javascript" src="path/to/library/lay-em.js"></script>

    <!-- Usage -->
    <script type="text/javascript">
        layEm.refreshLayout();
    </script>

### With [Webpack](https://webpack.js.org), [Browserify](http://browserify.org) or [RequireJS](http://requirejs.org)

Install *lay-em* from NPM

    npm install lay-em --save-dev

Consume as an ES6 module

    import * as layEm from 'lay-em';

or

    import { layHorizontally, layVertically } from 'lay-em';

Consume as a CommonJS module

    var layEm = require('lay-em');

Consume as an AMD

    require(['lay-em'], function (layEm) {
        // Consume layEm
    }

Note: You may have to use [Babel](https://babeljs.io) for ES6 transpilation.

### Layout Functions

#### `layHorizontally`

Aligns the specified set of elements within an element, accounting for widths of a few fixed elements.

    layEm.layHorizontally(
        document.getElementById('well'),
        [
            document.getElementById('left-clamp'),
            document.getElementById('right-clamp')
        ],
        [
            {
                element: document.getElementById('column-1'),
                parts: 2
            },
            {
                element: document.getElementById('column-2'),
                parts: 3
            }
        ]
    )

The above example accounts for the horizontal space required by `#left-clamp` and `#right-clamp` and divides the remaining width between the two specified elements in a 40:60 ratio to fit exactly within `#well`.

Optionally, you can skip specifying the ratio and just provide the elements itself. The width is then equally divided between the supplied elements.

    layEm.layHorizontally(
        document.getElementById('well'),
        [
            document.getElementById('left-clamp'),
            document.getElementById('right-clamp')
        ],
        [
            document.getElementById('column-1'),
            document.getElementById('column-2')
        ]
    )

#### `layVertically`

Aligns the specified set of elements within an element, accounting for heights of a few fixed elements.

    layEm.layVertically(
        document.getElementById('application-container'),
        [
            document.getElementById('titlebar'),
            document.getElementById('toolbar'),
            document.getElementById('statusbar')
        ],
        [
            {
                element: document.getElementById('navigator'),
                parts: 2
            },
            {
                element: document.getElementById('stage'),
                parts: 3
            }
        ]
    )

The above example accounts for the vertical space required by `#titlebar`, `#toolbar` and `#statusbar` and divides the remaining height between the two specified elements in a 40:60 ratio to fit exactly within `#application-container`.

Optionally, you can skip specifying the ratio and just provide the elements itself. The height is then equally divided between the supplied elements.

    layEm.layVertically(
        document.getElementById('application-container'),
        [
            document.getElementById('titlebar'),
            document.getElementById('toolbar'),
            document.getElementById('statusbar')
        ],
        [
            document.getElementById('navigator'),
            document.getElementById('stage')
        ]
    )

#### `showElement`

Shows the supplied element in the DOM and refreshes the created layout.

    layEm.showElement(document.getElementById('toolbar'))

#### `hideElement`

Hides the supplied element in the DOM and refreshes the created layout.

    layEm.hideElement(document.getElementById('toolbar'))

#### `updateLayoutOnDimensionChange`

To any change in the dimensions made for a particular element, makes the necessary re-alignment in the layout.

    layEm.updateLayoutOnDimensionChange(document.getElementById('toolbar'))

#### `refreshLayout`

Re-aligns the entire layout.

    layEm.refreshLayout()

#### `destroyLayout`

Removes the alignment made since the last `destroyLayout` call.

    layEm.destroyLayout()

#### `clearLayout`

Clears the layout information from memory.

    layEm.clearLayoutMap()

## Demo

You can view a demo [here](https://myterminal.github.io/lay-em/examples).

## To-do

* Write unit-tests
