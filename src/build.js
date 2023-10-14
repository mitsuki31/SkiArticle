const path = require('path'),              // Path module
      os = require('os'),                  // OS module
      fs = require('fs'),                  // File System module
      sass = require('sass'),              // Sass module
      config = require('./utils/config');  // Config module (local)

const { rootDir, serverPaths, clientPaths } = require('./utils/coreutils');

/**
 * Builds and compiles a specific Sass file and saves it to a specified
 * output file.
 *
 * <p><b>Note:</b>
 * This function runs synchronously and may block certain processes.
 *
 * @function
 * @param {!string} infile - Path to the input Sass file to be compiled.
 * @param {!string} outfile - Path to save the compiled CSS output.
 * @param {Object} [sassConfig] - Configuration options for Sass compilation.
 * @param {Function} [callback] - A callback function to handle errors, if any.
 *
 * @throws {Error} Throws an error if the input Sass file does not exist
 *                  or if there are I/O issues.
 *
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  1.2
 */
function buildSass(infile, outfile, sassConfig, callback) {
    // Resolve and fix the configuration, the configuration will be passed
    // to `sass.compile` arguments
    const resolvedSassConfig = config.resolve(
        "sass", sassConfig, (sassConfig === undefined)
    );
    
    // I/O operations
    try {
        // Ensure the input Sass file exists
        if (!fs.existsSync(infile)) {
            throw new Error(
                `Given Sass file does not exist: '${infile}'`);
        }
        
        // Compile the input Sass file
        const build = sass.compile(
            path.resolve(infile),  // Input file
            resolvedSassConfig     // Configuration settings
        );
        
        // Check for existence of parent directories, create if not present
        const parentDir = path.dirname(outfile);
        if (!fs.existsSync(parentDir)) {
            // Create the directory recursively
            fs.mkdirSync(parentDir, { recursive: true });
        }
        
        // Write the compiled CSS to the specified output file synchronously
        fs.writeFileSync(path.resolve(outfile), build.css.concat(os.EOL));
    } catch (error) {
        // Handle errors by invoking the provided function, if present,
        // otherwise throw the errors to outside
        if (callback && typeof callback === 'function') {
            callback(error);
        } else {
            throw error;
        }
    }
}


/**
 * Private function that runs as the main entry point of the module.
 *
 * <p>Parses command line arguments and processes the appropriate tasks.
 * Specifically, this function compiles Sass files if the first argument
 * is `sass` or `scss`. If triggered, it will searches for main Sass file
 * in "src/scss" directory, compile it, and then saves it as a CSS file
 * used by client-side in "public/assets/css" directory.
 * 
 * <p><b>Warning:</b>
 * This function is intended for internal use and should not be
 * called directly.
 *
 * @private
 * @function
 * @throws {Error} Throws an error if there is an issue with Sass compilation.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 1.2
 */
function _run_as_main() {
    // All command line arguments, excluding node command and the script path
    const args = process.argv.slice(2);
    
    // Check for "sass" or "scss" at first argument
    // This is case-insensitive, which means allowing uppercase or lowercase
    if (args.length > 0 && /^s[a|c]ss$/.test(args[0].toLowerCase())) {
        const sassFile = path.join(serverPaths.scss, 'main.scss'),
              outfile = path.join(clientPaths.assets.css, 'main.css');
        
        // Retrieve and parse the build configuration from 'build.json'
        const buildConfig = require(path.join(serverPaths.config, 'build.json'));
        
        buildSass(sassFile, outfile, buildConfig.sass, (err) => {
            // Print the errors to the console
            if (err) console.error(err);
        });
    }
}


// Using this statement, the exported objects will be unmodifiable
Object.defineProperty(module, 'exports', {
    value: {
        buildSass
    },
    writable: false,
    configurable: false
});


// Main driver
// Only run when the module is executed directly, not being imported as module
if (require.main === module) {
    _run_as_main();
}
