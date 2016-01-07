import polyfill from 'polyfill-custom-event';

let remainingPolyfills = [],
    donePolyfilling = new CustomEvent('donePolyfilling'),
    polyfilled = function (src) {
        remainingPolyfills = remainingPolyfills.filter(polyfill => polyfill !== src);
        if (remainingPolyfills.length) {
            window.dispatchEvent(donePolyfilling);
        }
    },
    polyfiller = function (testObject) {
        if (!testObject.test) {
            var s = document.createElement('script');
            remainingPolyfills.push(testObject.fill);
            s.src = testObject.fill;
            s.onload = polyfilled(testObject.fill);
            s.onerror = function () {
                window.dispatchEvent(new CustomEvent('polyfillError', {
                    detail: {
                        polyfillSrc: testObject.fill
                    }
                }));
            };
            document.head.appendChild(s);
        }
    };

export default function (tests=[]) {
    tests.map(polyfiller);
    if (remainingPolyfills.length) {
        window.dispatchEvent(donePolyfilling);
    }
}
