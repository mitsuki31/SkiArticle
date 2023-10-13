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

const defaultConfig = {
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
