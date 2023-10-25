/**
 * Utility module for handling configurations related to Sass and SassDoc.
 *
 * @module    utils/config
 * @requires  module:util
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

"use strict";

const util = require("util");

/**
 * An object representing configuration data for Sass or SassDoc.
 * @global
 * @typedef {Object} SassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */

/**
 * An object representing resolved configuration data for Sass or SassDoc.
 * @global
 * @typedef {Object} ResolvedSassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */

/**
 * Callback function to handle the result of the type check.
 *
 * @callback module:utils/config~typeCheckerAsyncCallback
 * @param {!Object} response
 *        An object representing the result response containing
 *        the check result and additional information.
 * @param {!boolean} resultObj.result
 *        Boolean indicating whether the object matches the
 *        expected type.
 * @param {?Error | null} resultObj.error
 *        Error object if the object does not match the expected
 *        type, null otherwise.
 * @param {!any} resultObj.value
 *        The original object being checked.
 * @param {!string} resultObj.type
 *        The expected data type.
 * @since 0.1.0
 */

/**
 * A namespace that provides default configurations for Sass and SassDoc.
 *
 * @namespace
 * @memberof module:utils/config
 * @property {!SassConfig} sass - Default configuration of Sass.
 * @property {!SassConfig} sassdoc - Default configuration of SassDoc.
 *
 * @constant
 * @namespace
 * @public
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 */
const defaultConfig = {
    /**
     * Default configuration of Sass.
     *
     * @namespace
     * @inner
     * @property {!boolean} charset - Indicates whether to include charset in
     *                                the compiled CSS. Default is <code>true</code>.
     * @property {!boolean} sourceMap - Enables source maps for the compiled CSS.
     *                                  Default is <code>true</code>
     * @property {!boolean} sourceMapIncludeSources - Indicates whether to include
     *                                                sources in the source map.
     *                                                Default is <code>false</code>.
     * @property {!string}  style - Style of the compiled CSS (e.g., `expanded`,
     *                              `compressed`). Default is <code>expanded</code>.
     * @property {!boolean} verbose - Enables verbose output during compilation.
     *                                Default is <code>false</code>.
     *
     * @public
     * @inner
     * @since   0.1.0
     * @version 0.1
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
 * Asynchronously checks if the given object matches the specified
 * data type. Invokes the callback with the result, error,
 * original value, and expected type.
 *
 * @param {!any} obj
 *        The object to be checked.
 * @param {!string} type
 *        The expected data type (e.g., 'string', 'number', 'object',
 *        'function', etc.).
 * @param {!module:utils/config~typeCheckerAsyncCallback} callback
 *        The callback function to handle the result response.
 *
 * @throws {Error} Throws an error if the given object is `null` or
 *                 undefined.
 * @throws {TypeError} Throws a type error if the 'type' argument is
 *                     not a string or if the 'callback' argument
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
 * @version  0.1
 */
function typeCheckerAsync(obj, type, callback) {
    if (util.isNullOrUndefined(obj)) {
        throw new Error("Undefined or null given object");
    } else if (!type || typeof type !== "string") {
        throw new TypeError(
            `Unexpected type of 'type': ${typeof type}. ` +
            "Expected string"
        );
    } else if (!callback || typeof callback !== "function") {
        throw new TypeError(
            `Unexpected type of 'callback': ${typeof callback}. ` +
            "Expected function"
        );
    }
    
    // Create new type error
    const typeErr = new TypeError(
        `Given object are not type of ${type}: ` +
        `${typeof obj} != ${type}`
    );
    
    let res;  // Store the result from various checks
    if (/^object$/i.test(type)) {
        res = obj instanceof Object;
    } else if (/^(string|number|boolean|function)?$/.test(type)) {
        res = typeof obj === type;
    }
    
    callback({
        result: res,
        error: !res ? typeErr : null,
        value: obj,
        type: type
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
 * @param {!SassConfig | Object} data
 *        User-provided configuration data, can be from JSON file.
 * @param {boolean} [useDefault]
 *        Whether to use default configuration if specific options
 *        are not provided.
 *
 * @return {ResolvedSassConfig | SassConfig | Object}
 *         Resolved configuration object for Sass or returning
 *         back the given data (unresolved) if the provided type
 *         is not known by the function to be processed.
 *
 * @example
 * const config = require('./utils/config');
 *
 * // Retrieve configurations from JSON file
 * const sassConfig = require('./path/to/sass.json');
 *
 * // Resolve and fix the configurations
 * sassConfig = config.resolve('sass', sassConfig);
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.1
 */
function resolve(type, data, useDefault = false) {
    // => Sass
    if (/^s[a|c]ss$/i.test(type)) {
        // Return the default configuration when useDefault is `true`
        if (useDefault || !data) return defaultConfig.sass;
        
        return {
            charset: data.charset || defaultConfig.sass.charset,
            sourceMap: data.sourceMap.generateFile ||
                defaultConfig.sass.sourceMap,
            sourceMapIncludeSources: data.sourceMap.includeSources ||
                defaultConfig.sass.sourceMapIncludeSources,
            style: data.style || defaultConfig.sass.style,
            verbose: data.verbose || defaultConfig.sass.verbose
        };
    }
    
    // Returning back the data if the provided type
    // is not known by the function
    return data;
}

// This statements will make exported objects unmodifiable
Object.defineProperty(module, "exports", {
    value: {
        // Objects that want to be exported
        resolve,
        defaultConfig
    },
    writable: false,
    configurable: false
});
