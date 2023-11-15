/**
 * Utility module for handling configurations related to Sass and SassDoc.
 *
 * @module    utils/config
 * @requires  module:util
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.2
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

import * as util from 'util';                         // Built-in Util module
import { Options as SassOptions } from 'sass/types';  // Sass types

import {
    DefaultConfig,
    SassDefaultConfig,
    SassConfig,
    TypeCheckerCallback
} from '../typings';


/**
 * Callback function to handle the result of the type check.
 *
 * @callback module:utils/config~typeCheckerAsyncCallback
 * @param {!Object} response
 *        An object representing the response results containing
 *        the check result and additional information.
 * @param {!boolean} response.result
 *        Boolean indicating whether the object matches the
 *        expected type.
 * @param {?Error | null} response.error
 *        Error object if the object does not match the expected
 *        type, null otherwise.
 * @param {!any} response.value
 *        The original object being checked.
 * @param {!string} response.type
 *        The expected data type.
 * @since 0.1.0
 */

/**
 * A namespace that provides default configurations for Sass and SassDoc.
 *
 * @property {!SassConfig} sass - Default configuration of Sass.
 * @property {!SassConfig} sassdoc - Default configuration of SassDoc.
 *
 * @public
 * @constant
 * @namespace
 * @memberof  module:utils/config
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.2
 */
const defaultConfig: DefaultConfig = {
    /**
     * Default configuration of Sass.
     *
     * @property {!boolean} charset - Indicates whether to include charset in
     *                                the compiled CSS. Default is `true`.
     * @property {!boolean} sourceMap - Enables source maps for the compiled CSS.
     *                                  Default is `true`
     * @property {!boolean} sourceMapIncludeSources - Indicates whether to include
     *                                                sources in the source map.
     *                                                Default is `false`.
     * @property {!string}  style - Style of the compiled CSS (e.g., `expanded`,
     *                              `compressed`). Default is `expanded`.
     * @property {!boolean} verbose - Enables verbose output during compilation.
     *                                Default is `false`.
     *
     * @public
     * @namespace
     * @since   0.1.0
     * @version 0.2
     */
    sass: {
        /**
         * @inner
         * @default
         * @type {!boolean}
         */
        charset: true,
        /**
         * @inner
         * @default
         * @type {!boolean}
         */
        sourceMap: true,
        /**
         * @inner
         * @default
         * @type {!boolean}
         */
        sourceMapIncludeSources: false,
        /**
         * @inner
         * @default
         * @type {!string}
         */
        style: "expanded",
        /**
         * @inner
         * @default
         * @type {!boolean}
         */
        verbose: false
    },
    
    // SassDoc
    // TODO: implement the default configuration of SassDoc
    sassdoc: {}
};


/**
 * Synchronously checks if the given object matches the specified
 * data type. This function throws errors for invalid inputs and
 * returns a boolean indicating whether the object matches the
 * expected type.
 *
 * @param {!any} obj
 *        The object to be checked.
 * @param {!string} type
 *        The expected data type (e.g., `'string'`, `'number'`,
 *        `'object'`, `'function'`, etc.).
 *
 * @returns {boolean} Returns `true` if the object matches
 *                    the expected type, `false` otherwise.
 *
 * @throws {Error} Throws an error if the given object is
 *                 null or undefined.
 * @throws {TypeError} Throws a type error if the `type`
 *                     argument is not a string or if the
 *                     input type is unknown.
 *
 * @example
 * const result = typeChecker('Hello', 'string');
 * console.log(result);  // Outputs: true
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.2
 * @see      {@link module:utils/config~typeCheckerAsync}
 */
function typeChecker(obj: unknown, type: string): boolean {
    let res = false;
    if (/^(object|array)$/i.test(type)) {
        res = obj instanceof Object;
    } else if (/^(string|number|boolean|function)$/i.test(type)) {
        res = typeof obj === type;
    } else {
        throw new TypeError(`Unknown input type: ${type}`);
    }
    
    return res;
}


/**
 * Asynchronously checks if the given object matches the specified
 * data type. Invokes the callback with the result, error,
 * original value, and expected type.
 *
 * @param {!any} obj
 *        The object to be checked.
 * @param {!string} type
 *        The expected data type (e.g., `'string'`, `'number'`,
 *        `'object'`, `'function'`, etc.).
 * @param {!module:utils/config~typeCheckerAsyncCallback} callback
 *        The callback function to handle the result response.
 *
 * @throws {Error} Throws an error if the given object is `null` or
 *                 undefined.
 * @throws {TypeError} Throws a type error if the `type` argument is
 *                     not a string or if the `callback` argument
 *                     is not a function.
 *
 * @example
 * const obj = "this is foo";
 * typeCheckerAsync(obj, "string",
 *   function(resp) {
 *     if (resp.error) console.error(resp.error);
 *     else console.log(resp.result);  // true
 *   }
 * );
 *
 * @public
 * @async
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.2
 */
function typeCheckerAsync(obj: unknown,
                          type: string,
                          callback: TypeCheckerCallback): void {
    // Create new type error
    let typeErr: TypeError = new TypeError(
        `Given object are not type of ${type}: ` +
        `${typeof obj} != ${type}`
    );
    
    let err: Error | TypeError | null = null;  // Used to store any error
    if (util.isNullOrUndefined(obj)) {
        err = new Error("Undefined or null given object");
    } else if (!type || typeof type !== "string") {
        err = new TypeError(
            `Unexpected type of 'type': ${typeof type}. ` +
            "Expected string"
        );
    }
    
    // Invoke the callback returning the error, if any
    if (err) {
        callback({
            result: false,
            error: err!,
            value: obj,
            type: type
        });
        return;  // Break and return
    }
    
    let res: boolean = false;  // Store the result from various checks
    if (/^(object|array)$/i.test(type)) {
        res = obj instanceof Object;
    } else if (/^(string|number|boolean|function)$/i.test(type)) {
        res = typeof obj === type;
    } else {
        typeErr = new TypeError(`Unknown input type: ${type}`);
    }
    
    callback({
        result: res,                     // Result
        error: (!res ? typeErr : null),  // Error
        value: obj,                      // Original value
        type: type                       // Expected type
    });
}


/**
 * Resolves configuration options based on the provided type and data.
 *
 * <p>Users can provide the configuration data either from extracted
 * JSON file or an user-defined object representing the configuration data.
 * This function will resolves all known options of specific data type
 * and ignoring all unknown options, and then returns an object that
 * representing the resolved configuration data.
 *
 * <p><b>Note:</b>
 * Currently this function supports to resolve the configuration data
 * for Sass only.
 *
 * @param {!string} type
 *        The type of configuration to resolve (only supports `sass`).
 * @param {!SassConfig} data
 *        User-provided configuration data, can be from JSON file.
 * @param {boolean} [useDefault]
 *        Whether to use default configuration if specific options
 *        are not provided.
 *
 * @return {SassOptions<'sync'>}
 *         Resolved configuration object for Sass or returning
 *         back the given data (unresolved) if the provided type
 *         is not known by the function to be processed.
 *
 * @example
 * const sassConfig = {
 *   dest: './build',
 *   charset: false,
 *   sourceMap: false
 * };
 *
 * // Resolve and fix the configurations
 * sassConfig = resolve('sass', sassConfig);
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.2
 */
function resolve(type: string,
                 data: SassConfig,
                 useDefault?: boolean
): SassOptions<'sync'> {
    // => Sass
    if (/^s[a|c]ss$/i.test(type)) {
        // Return the default configuration if useDefault is `true`
        // or user not specified the data (e.g. null or undefined)
        if (useDefault! || !data) return <SassOptions<'sync'>>defaultConfig.sass;
        
        const sassConfig: SassDefaultConfig = defaultConfig.sass;
        let charset: boolean = sassConfig.charset,
            sourceMap: boolean = sassConfig.sourceMap,
            includeSources: boolean = sassConfig.sourceMapIncludeSources,
            verbose: boolean = sassConfig.verbose;
        
        // Check for "charset" property in user-provided data
        if ("charset" in data) {
            charset = typeChecker(data.charset, 'boolean')
                ? data.charset! : charset;
        }
        
        if (data.sourceMap) {
            // Check whether the data.sourceMap has property
            // called "generateFile"
            if ("generateFile" in data.sourceMap) {
                sourceMap = typeChecker(data.sourceMap.generateFile, 'boolean')                                      // Expected type
                    ? data.sourceMap.generateFile! : sourceMap;
            }
            
            // Check whether the data.sourceMap has property
            // called "includeSources"
            if ("includeSources" in data.sourceMap) {
                includeSources = typeChecker(data.sourceMap.includeSources, 'boolean')                                      // Expected type
                    ? data.sourceMap.includeSources! : includeSources;
            }
        }
        
        // Fix and resolve the verbose option
        if ("verbose" in data) {
            verbose = typeChecker(data.verbose, 'boolean')
                ? data.verbose! : verbose;
        }
        
        return <SassOptions<'sync'>>{
            charset,
            sourceMap,
            sourceMapIncludeSources: includeSources,
            style: data.style! || sassConfig.style,
            verbose
        };
    }
    
    // Returning back the data if the provided type
    // is not known by the function
    return <SassOptions<'sync'>>data;
}

export { resolve, defaultConfig, typeChecker, typeCheckerAsync };
