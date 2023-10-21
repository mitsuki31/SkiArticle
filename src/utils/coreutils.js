/**
 * This core utility module brings several utilities to the project
 * that aim to increase project reliability and easier to maintain.
 *
 * @module    utils/coreutils
 * @requires  path
 * @requires  fs
 * @requires  node-dir
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

"use strict";

const path = require("path"),     // Path module
      fs = require("fs"),         // File System module
      dir = require("node-dir");  // Node-dir module

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


function lsFiles(path, options, callback) {
    // Throw error immediately if the callback not being specified
    if (!callback) {
        throw new Error(
            "Callback must be specified to pass the error and array of files"
        );
    }
    // This will create a new object storing user-defined options,
    // and fixing some undefined or null options with their default values.
    options = (options ? options : {});  // Prevent null or undefined variable
    const opts = {
        match: options.match || /.*/,
        exclude: options.exclude || /(^|\/)+\./
    };
    
    try {
        /* Given path should pass these checks, including:
         *   - Existence check
         *   - isDirectory check
         */
        fs.stat(path, (err, stats) => {
            // If the given path not exist, the error will be thrown
            if (err) {
                if (err.code === "ENOENT") {
                    throw new Error(
                        "${err.code}: No such file or directory: " +
                        `'${err.path}'`);
                }
                
                throw err;
            }
            
            // Check if the given path is a directory
            if (!stats.isDirectory()) {
                throw new Error("The given path is not a directory");
            }
        });
        
        dir.files(path, (err, entries) => {
            if (err) throw err;
            
            // Filter the entries with several checks from options
            entries = entries.filter((entry) => {
                return opts.match.test(entry) &&
                       !opts.exclude.test(entry);
            });
            
            // Pass the entries to callback
            callback(null, entries);
        });
    } catch (error) {
        // Pass the errors to callback
        callback(error, null);
    }
}


// Export necessary objects
Object.defineProperty(module, "exports", {
    value: {
        rootDir,
        clientPaths,
        serverPaths,
        lsFiles
    },
    writable: false,
    configurable: false
});
