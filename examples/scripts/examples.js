/* global layEm */

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
