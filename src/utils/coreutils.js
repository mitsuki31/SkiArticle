/**
 * This core utility module brings several utilities to the project
 * that aim to increase project reliability and are easier to maintain.
 *
 * @module    utils/coreutils
 * @requires  path
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

"use strict";

const path = require("path");  // Path module

/**
 * Path that references to the project's root directory.
 *
 * @constant
 * @public
 * @type     {!string}
 * @since    0.1.0
 */
const rootDir = path.resolve(__dirname, "..", "..");

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
const __publicDir = path.join(rootDir, "public");

/**
 * A namespace containing working directories used by client-side.
 *
 * @public
 * @namespace
 * @memberof  module:utils/coreutils
 * @property  {!string} root - Root path for client-side assets.
 * @property  {!Object} assets - Paths for asset directories (css, js, images).
 * @property  {!string} assets._this - Path to the root of the assets directory.
 * @property  {!string} assets.css - Path to the css directory within assets.
 * @property  {!string} assets.js - Path to the js directory within assets.
 * @property  {!string} assets.images - Path to the images directory within assets.
 * @property  {!Object} _static - Paths for static files (css).
 * @property  {!string} _static._this - Path to the root of the static directory.
 * @property  {!string} _static.css - Path to the css directory within static.
 *
 * @example <caption>ES Modules</caption>
 * import { clientPaths } from './utils/coreutils.js';
 *
 * @example <caption>CommonJS</caption>
 * const { clientPaths } = require('./utils/coreutils');
 *
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 */
const clientPaths = {
    root: __publicDir,
    assets: {
        _this: path.join(__publicDir, "assets"),
        css: path.join(__publicDir, "assets", "css"),
        js: path.join(__publicDir, "assets", "js"),
        images: path.join(__publicDir, "assets", "images")
    },
    _static: {
        _this: path.join(__publicDir, "static"),
        css: path.join(__publicDir, "static", "css")
    }
};

/**
 * A namespace containing working directories used by server-side.
 *
 * @public
 * @namespace
 * @memberof  module:utils/coreutils
 * @property  {!string} root - Root path for server-side directories.
 * @property  {!string} server - Path to the server directory.
 * @property  {!string} scss - Path to the SCSS directory.
 * @property  {!string} utils - Path to the utils directory.
 *
 * @example <caption>ES Modules</caption>
 * import { serverPaths } from './utils/coreutils.js';
 *
 * @example <caption>CommonJS</caption>
 * const { serverPaths } = require('./utils/coreutils');
 *
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 */
const serverPaths = {
    root: path.join(rootDir, "src"),
    server: path.join(rootDir, "src", "server"),
    scss: path.join(rootDir, "src", "scss"),
    utils: path.join(rootDir, "src", "utils"),
    config: path.join(rootDir, "config")
};

// Export necessary objects
Object.defineProperty(module, "exports", {
    value: {
        rootDir,
        clientPaths,
        serverPaths
    },
    writable: false,
    configurable: false
});
