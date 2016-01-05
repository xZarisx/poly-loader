import polyfill from 'polyfill-custom-event';

let polyfills = [],
    loadedPolys = [],
    donePolyfilling = new CustomEvent('donePolyfilling'),
    polyfilled = function (src) {
        loadedPolys.push(src);
        let incomplete = polyfills.filter(function (currentPoly) {
            return !loadedPolys.some(function (currentLoaded) {
                return currentLoaded === currentPoly;
            });
        });
        if (incomplete.length === 0) {
            window.dispatchEvent(donePolyfilling);
        }
    },
    polyfiller = function (testObject) {
        if (!testObject.test) {
            var s = document.createElement('script');
            polyfills.push(testObject.fill);
            s.type = 'text/javascript';
            s.src = testObject.fill;
            s.onload = polyfilled (testObject.fill);
            document.head.appendChild(s);
        }
    };

export default function (tests) {
    tests.map(polyfiller);
    if (polyfills.length === 0) {
        window.dispatchEvent(donePolyfilling);
    }
}
