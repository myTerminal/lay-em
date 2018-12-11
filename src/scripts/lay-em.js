/* global document */

const layoutMap = {
    horizontal: [],
    vertical: []
};

function layHorizontally(parentElement, fixedElements, variableElements) {

}

function layVertically(parentElement, fixedElements, variableElements) {
    let mappedVariableElements;

    // Assign proportions if not specified
    if (!variableElements[0].height) {
        mappedVariableElements = variableElements.map(e => (
            {
                element: e,
                height: 100 / variableElements.length
            }
        ));
    } else {
        mappedVariableElements = variableElements;
    }

    // Remove entry from map if already exists
    layoutMap.vertical = layoutMap.vertical.filter(m => m.parent !== parentElement);

    // Store layout map
    layoutMap.vertical.push({
        parent: parentElement,
        fixedElements,
        mappedVariableElements
    });

    // Set variable elements' heights
    setHeights(parentElement, fixedElements, mappedVariableElements);
}

function setWidths(parentElement, fixedElements, variableElements) {

}

function setHeights(parentElement, fixedElements, variableElements) {

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

export {
    layHorizontally,
    layVertically,
    showElement,
    hideElement,
    updateLayoutOnDimensionChange,
    refreshLayout
};
