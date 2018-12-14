/* global layEm $ setTimeout */

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
            parts: 5
        }
    ]
);

layEm.layHorizontally(
    document.getElementById('stage'),
    [],
    $('.canvas').toArray()
);

setTimeout(function () {
    layEm.hideElement(document.getElementById('navigator'));

    setTimeout(function () {
        layEm.hideElement(document.getElementsByClassName('canvas')[1]);

        setTimeout(function () {
            layEm.showElement(document.getElementById('navigator'));

            setTimeout(function () {
                document.getElementById('application-container').style.height = "50%";

                layEm.updateLayoutOnDimensionChange(document.getElementById('application-container'));
            }, 1000);
        }, 1000);
    }, 1000);
}, 2000);
