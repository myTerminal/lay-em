/* global require */

const $ = require('jquery'),
    layoutMap = {
        horizontal: [],
        vertical: []
    };

function layHorizontally(parentElement, fixedElements, variableElements) {

}

function setWidths(parentElement, fixedElements, variableElements) {

}

function layVertically(parentElement, fixedElements, variableElements) {
    let mappedVariableElements;

    // Assign proportions if not specified
    if (!variableElements[0].parts) {
        mappedVariableElements = variableElements
            .map(e => (
                {
                    element: e,
                    parts: 100 / variableElements.length
                }
            ));
    } else {
        mappedVariableElements = variableElements;
    }

    // Remove entry from map if already exists
    layoutMap.vertical = layoutMap.vertical
        .filter(m => m.parent[0] !== parentElement[0]);

    // Store layout map
    layoutMap.vertical.push({
        parent: parentElement,
        fixedElements,
        mappedVariableElements
    });

    // Set variable elements' heights
    setHeights(parentElement, fixedElements, mappedVariableElements);
}

function setHeights(parentElement, fixedElements, variableElements) {
    const parentHeight = $(parentElement).innerHeight(),
        sumOfFixedElementHeights = fixedElements
            .map(f => $(f).outerHeight(true))
            .reduce((a, c) => a + c, 0),
        totalParts = variableElements
            .map(v => v.parts)
            .reduce((a, c) => a + c, 0),
        remainingHeight = parentHeight - sumOfFixedElementHeights;

    variableElements
        .forEach(
            v => $(v.element)
                .outerHeight(((remainingHeight * v.parts) / totalParts))
        );
}

function showElement(element) {

}

function hideElement(element) {

}

function updateLayoutOnDimensionChange(element) {

}

function refreshLayout() {
    layoutMap.horizontal.forEach(
        m => layHorizontally(
            m.parent,
            m.fixedElements,
            m.mappedVariableElements
        )
    );

    layoutMap.vertical.forEach(
        m => layVertically(
            m.parent,
            m.fixedElements,
            m.mappedVariableElements
        )
    );
}

function destroyLayout() {

}

export {
    layHorizontally,
    layVertically,
    showElement,
    hideElement,
    updateLayoutOnDimensionChange,
    refreshLayout,
    destroyLayout
};
