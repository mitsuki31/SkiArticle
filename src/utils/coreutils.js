
const path = require('path');  // Path module

/**
 * Path that references to the project's root directory.
 *
 * @constant
 * @public
 * @type     {!string}
 * @since    0.1.0
 */
const rootDir = path.resolve(__dirname, '..', '..');

/**
 * Path that references to the public directory used by the client-side,
 * relative to the project's root directory.
 *
 * @constant
 * @private
 * @type     {!string}
 * @since    0.1.0
 * @see      {@link rootDir}
 */
const __publicDir = path.join(rootDir, 'public');

// Client workpaths
const clientPaths = {
    root: __publicDir,
    assets: {
        _this: path.join(__publicDir, 'assets'),
        css: path.join(__publicDir, 'assets', 'css'),
        js: path.join(__publicDir, 'assets', 'js'),
        images: path.join(__publicDir, 'assets', 'images')
    },
    _static: {
        _this: path.join(__publicDir, 'static'),
        css: path.join(__publicDir, 'static', 'css')
    }
}

// Server workpaths
const serverPaths = {
    root: path.join(rootDir, 'src'),
    server: path.join(rootDir, 'src', 'server'),
    scss: path.join(rootDir, 'src', 'scss'),
    utils: path.join(rootDir, 'src', 'utils'),
    config: path.join(rootDir, 'config')
}

// Export necessary objects
Object.defineProperties(module, {
    exports: {
        value: {
            rootDir,
            clientPaths,
            serverPaths
        },
        writeable: false,
        configurable: false
    }
});
