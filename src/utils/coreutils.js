const path = require('path');

// Reference to project root directory
const __rootDir = path.resolve(__dirname, '..', '..');
// Reference to public directory used by client-side relative to project root directory
const __publicDir = path.join(__rootDir, 'public');

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
        css: path.(__publicDir, 'static', 'css')
    }
}

// Server workpaths
const serverPaths = {
    root: path.join(__rootDir, 'src'),
    server: path.join(__rootDir, 'src', 'server'),
    scss: path.join(__rootDir, 'src', 'scss'),
    utils: path.join(__rootDir, 'src', 'utils')
}
