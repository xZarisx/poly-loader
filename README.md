# Poly Loader
An event driven polyfill loader

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
