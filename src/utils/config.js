/**
 * Utility module for handling configurations related to Sass and SassDoc.
 *
 * @module    utils/config
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   1.0
 * @copyright CV. DR2E 2023
 * @license   MIT
 */

/**
 * An object representing configuration data for Sass or SassDoc.
 * @typedef {Object} SassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */

/**
 * An object representing resolved configuration data for Sass or SassDoc.
 * @typedef {Object} ResolvedSassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */

/**
 * A namespace that provides default configurations for Sass and SassDoc.
 *
 * @type     {Object}
 * @property {Object} sass - Default configuration of Sass.
 * @property {Object} sassdoc - Default configuration of SassDoc.
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
     * @type     {SassConfig}
     * @property {boolean} charset - Indicates whether to include charset in the compiled CSS. Default is <code>true</code>.
     * @property {boolean} sourceMap - Enables source maps for the compiled CSS. Default is <code>true</code>
     * @property {boolean} sourceMapIncludeSources - Indicates whether to include sources in the source map. Default is <code>false</code>.
     * @property {string}  style - Style of the compiled CSS (e.g., 'expanded', 'compressed'). Default is <code>'expanded'</code>.
     * @property {boolean} verbose - Enables verbose output during compilation. Default is <code>false</code>.
     *
     * @public
     * @inner
     * @since  0.1.0
     */
    sass: {
        charset: true,
        sourceMap: true,
        sourceMapIncludeSources: false,
        style: 'expanded',
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
 * <p><b>Example:</b>
 * <pre>
 *     // Assume that 'sassConfig' is from JSON file
 *     sass.compile('foo.scss',
 *         config.resolve(sassConfig));
 * </pre>
 *
 * <p><b>Note:</b>
 * Currently this function supports to resolve the configuration data for Sass only.
 *
 * @param {string}  type - The type of configuration to resolve ('sass' or 'sassdoc').
 * @param {Object}  data - User-provided configuration data, this can be from JSON file.
 * @param {boolean} [useDefault] - Whether to use default configuration if specific options are not provided.
 *
 * @return {ResolvedSassConfig} Resolved configuration object for Sass or SassDoc.
 *
 * @function
 * @public
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 1.0
 */
const resolve = (type, data, useDefault = false) => {
    // => Sass
    if (type === 'sass') {
        // Return the default configuration when useDefault is `true`
        if (useDefault) return defaultConfig.sass;
        
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
}

// This statements will make exported objects unmodifiable
Object.defineProperties(module, {
    exports: {
        value: {
            // Objects that want to be exported
            resolve,
            defaultConfig
        },
        writeable: false,
        configurable: false
    }
});
