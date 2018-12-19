/* global describe it */

import sinon from 'sinon';
import * as layEm from '../src/scripts/lay-em.js';

// Mock jQuery
const $ = sinon.fake(function (el) {
    return {
        is: () => el.isVisible,
        innerWidth: () => el.innerWidth,
        outerWidth: (value) => {
            if (value && value !== true) {
                el.outerWidth = value;

                return el;
            } else {
                return el.outerWidth;
            }
        }
    };
});

// Helper to create a mocked DOM element
const createDomElement = function (props) {
    return {
        is: props.isVisible,
        innerWidth: props.innerWidth,
        outerWidth: props.outerWidth,
        css: props.css
    };
};

describe('layHorizontally', function () {
    // it('sizes all variable elements equally when ratios are not specified', function () {
    //     const parentElement = createDomElement({
    //             innerWidth: 800
    //         }),
    //         fixedElements = [
    //             createDomElement({
    //                 outerWidth: 100
    //             }),
    //             createDomElement({
    //                 outerWidth: 100
    //             })
    //         ],
    //         variableElements = [
    //             createDomElement({
    //                 isVisible: true
    //             }),
    //             createDomElement({
    //                 isVisible: true
    //             }),
    //             createDomElement({
    //                 isVisible: true
    //             })
    //         ];

    //     layEm.layHorizontally(
    //         parentElement,
    //         fixedElements,
    //         variableElements
    //     );

    //     variableElements[0].outerWidth().should.equal(200);
    // });

    it('dummy test', function () {
        true.should.equal(true);
    });
});

describe('layVertically', function () {
    // Pending
});

describe('showElement', function () {
    // Pending
});

describe('hideElement', function () {
    // Pending
});

describe('updateLayoutOnDimensionChange', function () {
    // Pending
});

describe('refreshLayout', function () {
    // Pending
});

describe('destroyLayout', function () {
    // Pending
});
