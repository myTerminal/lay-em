/* global require */

const $ = require('jquery'),
    layoutMap = {
        horizontal: [],
        vertical: []
    },
    directions = {
        horizontal: 'horizontal',
        vertical: 'vertical'
    };

function layHorizontally(parentElement, fixedElements, variableElements) {
    const mappedVariableElements = getMappedVariableElements(variableElements);

    storeLayout(parentElement, fixedElements, mappedVariableElements, directions.horizontal);
    setWidths(parentElement, fixedElements, mappedVariableElements);
}

function setWidths(parentElement, fixedElements, variableElements) {
    const parentWidth = $(parentElement).innerWidth(),
        sumOfFixedElementWidths = fixedElements
            .map(f => $(f).outerWidth(true))
            .reduce((a, c) => a + c, 0),
        totalParts = variableElements
            .map(v => ($(v.element).is(':visible') ? v.parts : 0))
            .reduce((a, c) => a + c, 0),
        remainingWidth = parentWidth - sumOfFixedElementWidths;

    variableElements
        .forEach(
            v => $(v.element)
                .outerWidth(((remainingWidth * v.parts) / totalParts))
        );
}

function layVertically(parentElement, fixedElements, variableElements) {
    const mappedVariableElements = getMappedVariableElements(variableElements);

    storeLayout(parentElement, fixedElements, mappedVariableElements, directions.vertical);
    setHeights(parentElement, fixedElements, mappedVariableElements);
}

function setHeights(parentElement, fixedElements, variableElements) {
    const parentHeight = $(parentElement).innerHeight(),
        sumOfFixedElementHeights = fixedElements
            .map(f => $(f).outerHeight(true))
            .reduce((a, c) => a + c, 0),
        totalParts = variableElements
            .map(v => ($(v.element).is(':visible') ? v.parts : 0))
            .reduce((a, c) => a + c, 0),
        remainingHeight = parentHeight - sumOfFixedElementHeights;

    variableElements
        .forEach(
            v => $(v.element)
                .outerHeight(((remainingHeight * v.parts) / totalParts))
        );
}

function getMappedVariableElements(variableElements) {
    return variableElements[0].parts
        ? variableElements
        : variableElements
            .map(e => (
                {
                    element: e,
                    parts: 100 / variableElements.length
                }
            ));
}

function storeLayout(parentElement, fixedElements, mappedVariableElements, direction) {
    // Remove entry from map if already exists
    layoutMap[direction] = layoutMap[direction]
        .filter(m => m.parent !== parentElement);

    // Store layout map
    layoutMap[direction].push({
        parent: parentElement,
        fixedElements,
        variableElements: mappedVariableElements
    });
}

function showElement(element) {
    element.style.display = '';
    refreshLayoutForToggleOnChildElements(element);
}

function hideElement(element) {
    element.style.display = 'none';
    refreshLayoutForToggleOnChildElements(element);
}

function refreshLayoutForToggleOnChildElements(element) {
    layoutMap.horizontal.forEach(
        hl => {
            const matchesFixedElement = hl.fixedElements
                    .filter(fe => fe === element).length,
                matchesVariableElement = hl.variableElements
                    .filter(ve => ve.element === element).length;

            if (matchesFixedElement || matchesVariableElement) {
                setWidths(hl.parent, hl.fixedElements, hl.variableElements);
            }
        }
    );

    layoutMap.vertical.forEach(
        vl => {
            const matchesFixedElement = vl.fixedElements
                    .filter(fe => fe === element).length,
                matchesVariableElement = vl.variableElements
                    .filter(ve => ve.element === element).length;

            if (matchesFixedElement || matchesVariableElement) {
                setHeights(vl.parent, vl.fixedElements, vl.variableElements);
            }
        }
    );
}

function updateLayoutOnDimensionChange(element) {
    layoutMap.horizontal.forEach(
        hl => {
            const matchesFixedElement = hl.fixedElements
                    .filter(fe => fe === element).length,
                matchesParentElement = hl.parent === element;

            if (matchesFixedElement || matchesParentElement) {
                setWidths(hl.parent, hl.fixedElements, hl.variableElements);
            }
        }
    );

    layoutMap.vertical.forEach(
        vl => {
            const matchesFixedElement = vl.fixedElements
                    .filter(fe => fe === element).length,
                matchesParentElement = vl.parent === element;

            if (matchesFixedElement || matchesParentElement) {
                setHeights(vl.parent, vl.fixedElements, vl.variableElements);
            }
        }
    );
}

function refreshLayout() {
    layoutMap.horizontal.forEach(
        m => setWidths(
            m.parent,
            m.fixedElements,
            m.variableElements
        )
    );

    layoutMap.vertical.forEach(
        m => setHeights(
            m.parent,
            m.fixedElements,
            m.variableElements
        )
    );
}

function destroyLayout() {
    layoutMap.horizontal.forEach(
        hl => hl.variableElements.forEach(
            v => {
                v.element.style.width = '';
            }
        )
    );

    layoutMap.vertical.forEach(
        vl => vl.variableElements.forEach(
            v => {
                v.element.style.height = '';
            }
        )
    );
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
