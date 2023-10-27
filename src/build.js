/**
 * This modules provides several build environments for server-side
 * to build necessary stuff required by the client-side, and
 * enhancing the build process.
 *
 * @module    build
 * @requires  module:utils/config
 * @requires  module:utils/coreutils.serverPaths
 * @requires  module:path
 * @requires  module:os
 * @requires  module:fs
 * @requires  modules:sass
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

"use strict";

const path = require("path"),              // Path module
      os = require("os"),                  // OS module
      fs = require("fs"),                  // File System module
      sass = require("sass"),              // Sass module
      config = require("./utils/config");  // Config module (local)

const {
    serverPaths  // Server-side's working directories paths
} = require("./utils/coreutils");


/**
 * A callback function to handle the errors that could occur
 * during I/O operations or any unexpected errors.
 *
 * @callback module:build~buildSassCallback
 * @param    {!Error} error
 *           An object to stores and pass the errors.
 * @since    0.1.0
 */


/**
 * Asynchronously builds and compiles a specific Sass file
 * and saves the compiled CSS to a specified output file.
 *
 * @param {!string} infile
 *        Path to the input Sass file to be compiled.
 * @param {!string} outfile
 *        Path to save the compiled CSS output.
 * @param {?SassConfig | null} [sassConfig]
 *        Configuration options for Sass compilation.
 * @param {!module:build~buildSassCallback} callback
 *        A callback function to handle errors.
 *
 * @throws {Error} If the input Sass file does not
 *                 exist or if there are I/O issues.
 * @throws {TypeError} If the given callback is not
 *                     a function or not specified.
 *
 * @public
 * @async
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.1
 */
async function buildSass(infile, outfile, sassConfig, callback) {
    if (!callback || typeof callback !== "function") {
        throw new TypeError(
            "Undefined or null callback is not allowed"
        );
    }
    
    // Resolve and fix the configuration, the configuration
    // will be passed to `sass.compile` arguments
    const resolvedSassConfig = config.resolve(
        "sass", sassConfig, !sassConfig
    );
    
    // I/O operations
    try {
        // Reusable variable to test the file permissions
        const mode = fs.constants.F_OK | fs.constants.R_OK;
        
        // Ensure the input Sass file exists
        await fs.access(infile, mode, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    throw new Error(
                        `No such Sass file: '${infile}'`
                    );
                }
                
                throw err;
            }
        });
        
        // Resolve and make the destination directory
        // an absolute path, if it was non-absolute (i.e. relative)
        outfile = path.isAbsolute(outfile)
            ? outfile
            : path.resolve(outfile);
        
        // Compile the input Sass file asynchronously
        const build = await sass.compileAsync(
            path.resolve(infile),  // Input file
            resolvedSassConfig     // Configuration settings
        );
        
        // Asynchronously create the directory recursively
        fs.mkdir(
            path.dirname(outfile),
            { recursive: true },
            (err) => {
                // Throw the errors, if any
                if (err) throw err;
                
                // Write the compiled CSS to the specified
                // output file asynchronously after its parent
                // directory successfully created with no error
                fs.writeFile(
                    outfile,
                    build.css.concat(
                        // If the style is 'compressed',
                        // do not append a new line character at EOF,
                        // will be appended otherwise.
                        sassConfig.style !== "compressed"
                            ? os.EOL  // New line
                            : ""      // No new line
                    ),
                    (err) => { if (err) throw err; }
                );
            }
        );
    } catch (error) {
        // Handle errors by invoking the provided function
        callback(error);
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
 * @throws {Error} Throws an error if there is an issue with
 *                 Sass compilation.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */
function _run_as_main() {
    console.time("build");
    
    // All command line arguments, excluding node command
    // and the script path
    const args = process.argv.slice(2);
    
    // Check for "sass" or "scss" at first argument
    // This is case-insensitive, which means allowing uppercase
    // or lowercase
    if (args.length > 0 && /^s[a|c]ss$/i.test(args[0])) {
        const sassFile = path.join(serverPaths.scss, "main.scss");
        
        // Retrieve and parse the build configuration from 'build.json'
        const buildConfig =
            require(path.join(serverPaths.config, "build.json"));
        const outFile = path.join(
            /* Use destination path from build configuration,
             * if none, use the default destination path instead
             */
            (buildConfig.sass.dest ||
                path.join(serverPaths.build, "css")),
            "main.css"
        );
        
        buildSass(
            sassFile,               // Input
            outFile,                // Output
            buildConfig.sass,       // Configuration
            (err) => {              // Callback
                // Print the errors to the console
                if (err) console.error(err);
            }
        );
    }
    
    console.timeEnd("build");
    console.info("Build successful.");
}


// Using this statement, the exported objects will be unmodifiable
Object.defineProperty(module, "exports", {
    value: {
        buildSass
    },
    writable: false,
    configurable: false
});


// Main driver
// Only run when the module is executed directly,
// not being imported as module
if (require.main === module) {
    _run_as_main();
}
