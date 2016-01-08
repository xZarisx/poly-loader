# Poly Loader
An event driven lazy polyfill loader.

## How to use

    import polyLoader from 'poly-loader';

    const polyfillTests = [
        {
            test: typeof fetch === 'function',
            fill: './url/to/polyfills/fetch.min.js'
        }
    ];

    window.addEventListener('donePolyfilling', bootStrapYouApp);

    polyLoader(polyfillTests);


If there are errors loading the polyfill a `polyfillError` event will be emitted

    window.addEventListener('polyfillError', function (e) {
        console.log('Polyfill failed to load: ', e.detail.polyfillSrc)
    });
