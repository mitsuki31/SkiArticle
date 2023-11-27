/**
 * This core utility module brings several utilities to the project
 * that aim to increase project reliability and easier to maintain.
 *
 * @module    utils/coreutils
 * @requires  module:path
 * @requires  module:fs
 * @requires  module:node-dir
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.2
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

import * as path from 'path';     // Path module
import * as fs from 'fs';         // File System module
import * as dir from 'node-dir';  // Node-dir module
import * as util from 'util';     // Util module

/**
 * Path that references to the project's root directory.
 *
 * @constant
 * @public
 * @type     {!StringPath}
 * @since    0.1.0
 */
const rootDir: StringPath = path.resolve(__dirname, '..', '..', '..');

/**
 * Path that references to the public directory used by the client-side,
 * relative to the project's root directory.
 *
 * @constant
 * @private
 * @type     {!StringPath}
 * @since    0.1.0
 * @see      {@link rootDir}
 */
const __publicDir: StringPath = path.join(rootDir, 'public');

/**
 * A namespace containing working directories used by client-side.
 *
 * @memberof  module:utils/coreutils
 * @property  {!StringPath} root - Root path for client-side assets.
 * @property  {!Object} assets - Paths for asset directories (css, js, images).
 * @property  {!StringPath} assets._this - Path to the root of the assets directory.
 * @property  {!StringPath} assets.css - Path to the css directory within assets.
 * @property  {!StringPath} assets.js - Path to the js directory within assets.
 * @property  {!StringPath} assets.images - Path to the images directory within assets.
 * @property  {!Object} _static - Paths for static files (css).
 * @property  {!StringPath} _static._this - Path to the root of the static directory.
 * @property  {!StringPath} _static.css - Path to the css directory within static.
 *
 * @example <caption>ES Module</caption>
 * import { clientPaths } from './utils/coreutils.js';
 *
 * @example <caption>CommonJS</caption>
 * const { clientPaths } = require('./utils/coreutils');
 *
 * @public
 * @namespace
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.2
 */
const clientPaths: ClientPaths = {
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
};

/**
 * A namespace containing working directories used by server-side.
 *
 * @public
 * @namespace
 * @memberof  module:utils/coreutils
 * @property  {!StringPath} root - Root path for server-side directories.
 * @property  {!StringPath} server - Path to the server directory.
 * @property  {!StringPath} scss - Path to the SCSS directory.
 * @property  {!StringPath} utils - Path to the utils directory.
 * @property  {!StringPath} config - Path to the configuration base.
 * @property  {!StringPath} build - Path to the built environments
 *                                  like compiled CSS files.
 *
 * @example <caption>ES Module</caption>
 * import { serverPaths } from './utils/coreutils.js';
 *
 * @example <caption>CommonJS</caption>
 * const { serverPaths } = require('./utils/coreutils');
 *
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.2
 */
const serverPaths: ServerPaths = {
    root: path.join(rootDir, 'src'),
    server: path.join(rootDir, 'src', 'server'),
    scss: path.join(rootDir, 'src', 'scss'),
    utils: path.join(rootDir, 'src', 'utils'),
    config: path.join(rootDir, 'config'),
    build: path.join(rootDir, 'build')
};


/**
 * Asynchronously lists files in a directory based on specified
 * options and passes the result to a completion callback function.
 *
 * @param {!StringPath} path
 *        The path of the directory to list files from.
 * @param {LsFilesOptions | null} options
 *        Optional configuration options.
 * @param {RegExp} [options.match]
 *        A regular expression to filter files. Default is
 *        to match all files.
 * @param {RegExp} [options.exclude]
 *        A regular expression to exclude files based on
 *        their paths. Default excludes hidden files
 *        (excludes directory that startswith `.`).
 * @param {boolean} [options.basename]
 *        Option to include only base filenames without their paths.
 *        Default is `false`.
 * @param {!Function} callback
 *        Callback function required to store the error
 *        and an array of files.
 *
 * @throws {Error} If the specified path does not exist,
 *                 is not a directory, or other unexpected errors occur.
 *
 * @example <caption>Use Default Options</caption>
 * lsFiles('/path/to/directory', null,
 *   function(err, files) {
 *     if (err) {
 *       console.error(err);
 *     } else {
 *       console.log(files);
 *     }
 *   }
 * );
 *
 * @example <caption>Use Custom Options</caption>
 * lsFiles('/path/to/directory', {
 *     match: /\.txt$/,
 *     exclude: /temp/
 *   }, function(err, files) {
 *     if (err) {
 *       console.error('Error:', err);
 *     } else {
 *       console.log(files);
 *     }
 *   }
 * );
 *
 * @public
 * @async
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.3
 */
function lsFiles(dirpath: StringPath,
                 options: LsFilesOptions | null,
                 callback: LsFilesCallback): void {
    // This will create a new object storing user-defined options,
    // and fixing some undefined or null options with their default values.
    const opts: Omit<LsFilesOptions, 'baseName'> = {
        match: options?.match || /.*/,
        exclude: options?.exclude || /(^|\/)+\./,
        basename: options?.baseName || options?.basename || false
    };
    
    dir.files(dirpath, function (err?: NodeJS.ErrnoException,
                                 entries?: Array<string> | null): void {
        let isNotDir: boolean = false;
        if (err!) {
            if (err!.code === 'ENOTDIR') {
                isNotDir = true;
            } else {
                callback(err!, null);
                return;
            }
        }
        
        // These expression will take care the error of 'ENOTDIR'
        // (no such a directory, but this can be a regular file)
        // by checking whether the given path is refer to a regular file.
        if (isNotDir) {
            // Check whether the given path is a regular file
            fs.stat(dirpath, function (errStat?: NodeJS.ErrnoException | null,
                                       stats?: fs.Stats | null): void {
                // Immediately return the given input path as an array,
                // if the path is refer to a regular file.
                if (!stats!.isDirectory()) {
                    if (opts.basename!) dirpath = path.basename(dirpath);
                    callback(errStat! ? errStat! : null, !errStat! ? [ dirpath ] : null);
                    return;
                }
            });
        } else {
            // Filter the entries with several checks from options
            entries = entries!.filter(function (entry: string): boolean {
                return opts.match!.test(entry) &&
                       !opts.exclude!.test(entry);
            });
            
            // Trim the paths, if the basename option is true
            if (opts.basename) {
                entries = entries!.map(function (entry: string): string {
                    return path.basename(entry)
                });
            }
            
            // Pass the entries to callback
            callback(null, entries);
        }
    });
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(value: any): value is Record<string, any> | object {
    return value && typeof value === 'object' && !Array.isArray(value)
        && util.types.isRegExp(value);
}


async function copyFile(src: StringPath,
                        dest: StringPath): Promise<void> {
    return new Promise(function (
        resolve: () => void, reject: (reason?: Error) => void
    ): void {
        fs.promises.copyFile(src, dest)
            .then(() => resolve())
            .catch(function (errCopy: NodeJS.ErrnoException) {
                const err: Error = new Error(
                    `Error copyFile: ${errCopy.message}`,
                    // In ECMAScript 2020 and earlier, only the first argument will be used
                    // as the error message, and the rest will be ignored.
                    { cause: errCopy });
                reject(err);
            });
    });
}


export {
    rootDir, clientPaths, serverPaths,
    lsFiles, isObject, copyFile
};
