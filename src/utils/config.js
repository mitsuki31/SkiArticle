/**
 * Utility module for handling configurations related to Sass and SassDoc.
 *
 * @module    utils/config
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1.0
 * @copyright CV. DR2E 2023
 * @license   MIT
 */

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
 * @version   1.0
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
     * @since  0.1.0
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
        style: 'expanded',
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
}

/**
 * Resolves configuration options for Sass and SassDoc based on the provided type and data.
 *
 * <p>Users can provide the configuration data either from extracted JSON file or an user-defined object
 * representing the configuration data of Sass or SassDoc. This function will resolves all known options
 * of Sass or SassDoc and ignoring all unknown options, and then returns an object that can be used directly
 * to <code>sass</code> module.
 *
 * <p><b>Note:</b>
 * Currently this function supports to resolve the configuration data for Sass only.
 *
 * @param {!string} type - The type of configuration to resolve (`sass` or `sassdoc`).
 * @param {!SassConfig} data - User-provided configuration data, can be from JSON file.
 * @param {boolean} [useDefault] - Whether to use default configuration if specific options are not provided.
 *
 * @return {ResolvedSassConfig | SassConfig} Resolved configuration object for Sass or SassDoc or returning
 *                                           back the given data (unresolved) if the provided type is
 *                                           not known by the function to be processed.
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
 * @function
 * @public
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 1.2
 */
function resolve(type, data, useDefault = false) {
    // => Sass
    if (/^s[a|c]ss$/.test(type.toLowerCase())) {
        // Return the default configuration when useDefault is `true`
        if (useDefault || !data) return defaultConfig.sass;
        
        return {
            charset: data.charset || defaultConfig.sass.charset,
            sourceMap: (data.sourceMap
                ? data.sourceMap.generateFile
                : defaultConfig.sass.sourceMap
            ),
            sourceMapIncludeSources: (data.sourceMap
                ? data.sourceMap.includeSources
                : defaultConfig.sass.sourceMapIncludeSources
            ),
            style: data.style || defaultConfig.sass.style,
            verbose: data.verbose || defaultConfig.sass.verbose
        }
    }
    
    // TODO: implement the code to resolve the SassDoc configuration
    
    // Returning back the data if the provided type
    // is not known by the function
    return data;
}

// This statements will make exported objects unmodifiable
Object.defineProperty(module, 'exports', {
    value: {
        // Objects that want to be exported
        resolve,
        defaultConfig
    },
    writable: false,
    configurable: false
});
