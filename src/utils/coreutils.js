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


/**
 * Asynchronously lists files in a directory based on
 * specified options and passes the result to a callback function.
 *
 * @param {!string} path - The path of the directory to list
 *                         files from.
 * @param {?Object} [options] - Optional configuration options.
 * @param {RegExp} [options.match] - A regular expression to
 *                                   filter files. Default is
 *                                   to match all files.
 * @param {RegExp} [options.exclude] - A regular expression to
 *                                     exclude files based on
 *                                     their paths. Default excludes
 *                                     hidden files (`.`).
 * @param {boolean} [options.baseName] - Option to include only
 *                                       base filenames without their paths.
 *                                       Default is `false`.
 * @param {!Object} callback - Callback function required to store the error
 *                             and an array of files.
 * @param {!Error} err - An error object if any error occurs during
 *                       the process, otherwise `null`.
 * @param {!string[]} files - An array of file paths that match the
 *                           specified criteria.
 *
 * @throws {Error} If the specified path does not exist,
 *                 is not a directory, or other unexpected errors occur.
 * @throws {TypeError} If any option does not match with the expected type.
 *
 * @example
 * lsFiles('/path/to/directory',
 *   {
 *     match: /\.txt$/,
 *     exclude: /temp/
 *   }, function(err, files) {
 *     if (err) {
 *       console.error('Error:', err);
 *     } else {
 *       console.log(files);
 *     }
 * });
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.1
 */
function lsFiles(dirpath, options, callback) {
    // Throw error immediately if the callback not being specified
    if (!callback) {
        throw new Error(
            "Callback function must be specified to pass the error " +
            "and an array of files"
        );
    }
    
    // This will create a new object storing user-defined options,
    // and fixing some undefined or null options with their default values.
    options = (options ? options : {});  // Prevent null or undefined variable
    const opts = {
        match: options.match || /.*/,
        exclude: options.exclude || /(^|\/)+\./,
        baseName: options.baseName || false
    };
    
    // Options checker
    if (opts.match &&
            !(opts.match instanceof RegExp)) {
        throw new TypeError(
            "Unexpected type of 'match' option: " +
            `'${typeof opts.match}'. Expected is 'RegExp'`
        );
    } else if (opts.exclude &&
            !(opts.exclude instanceof RegExp)) {
        throw new TypeError(
            "Unexpected type of 'exclude' option: " + 
            `'${typeof opts.exclude}'. Expected is 'RegExp'`
        );
    } else if (opts.baseName &&
            typeof opts.baseName !== "boolean") {
        throw new TypeError(
            "Unexpected type of 'baseName' option: " +
            `'${typeof opts.baseName}'. Expected is 'boolean'`
        );
    }
    
    try {
        /* Given path should pass these checks, including:
         *   - Existence check
         *   - isDirectory check
         */
        fs.stat(dirpath, (err, stats) => {
            if (err) {
                // If the given path does not exist, the error will be thrown
                if (err.code === "ENOENT") {
                    throw new Error(
                        "${err.code}: No such file or directory: " +
                        `'${err.path}'`);
                }
                
                throw err;  // Throw all type errors
            }
            
            // Check if the given path is a directory
            if (!stats.isDirectory()) {
                throw new Error("The given path is not a directory");
            }
        });
        
        dir.files(dirpath, (err, entries) => {
            if (err) throw err;
            
            // Filter the entries with several checks from options
            entries = entries.filter((entry) => {
                return opts.match.test(entry) &&
                       !opts.exclude.test(entry);
            });
            
            // Trim the file names only, if the baseName option is provided
            if (opts.baseName) {
                entries =
                    entries.map((entry) => path.basename(entry));
            }
            
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
