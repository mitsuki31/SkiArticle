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
 * @version   0.2
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

import * as path from 'path';              // Path module
import * as os from 'os';                  // OS module
import * as fs from 'fs';                  // File System module
import * as sass from 'sass';              // Sass module

import * as config from './utils/config';  // Config module (local)
import {
    serverPaths  // Server-side's working directories paths
} from './utils/coreutils';
import {
    StringPath,
    SassConfig,
    ResolvedSassConfig
} from './core/types';


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
 * @param {SassConfig | null} sassConfig
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
 * @version  0.2
 */
async function buildSass(
    infile: StringPath,
    outfile: StringPath,
    sassConfig: SassConfig | null,
    callback: (error?: Error | null) => void
): Promise<void> {
    // Resolve and fix the configuration, the configuration
    // will be passed to `sass.compile` arguments
    const resolvedSassConfig: any =
        config.resolve('sass', sassConfig, !sassConfig);
    
    // I/O operations
    try {
        // Reusable variable to test the file permissions
        const mode: number = fs.constants.F_OK | fs.constants.R_OK;
        
        // Ensure the input Sass file exists
        await fs.access(infile, mode,
                        function (err?: any | null): void {
            if (err!) {
                if (err!.code === 'ENOENT') {
                    throw new Error(`No such Sass file: '${infile}'`);
                }
                
                throw err!;
            }
        });
        
        // Resolve and make the destination directory
        // an absolute path, if it was non-absolute (i.e. relative)
        outfile = path.isAbsolute(outfile)
            ? outfile
            : path.resolve(outfile);
        
        // Compile the input Sass file asynchronously
        // Use 'any' type because the type of 'CompileResult' is
        // kind of a private member in `sass` module
        const build: any = await sass.compileAsync(
            path.resolve(infile),  // Input file
            resolvedSassConfig     // Configuration settings
        );
        
        // Asynchronously create the directory recursively
        await fs.mkdir(
            path.dirname(outfile),
            { recursive: true },
            async function (err?: Error | null): Promise<void> {
                // Throw the errors, if any
                if (err!) throw err!;
                
                // Write the compiled CSS to the specified
                // output file asynchronously after its parent
                // directory successfully created with no error
                await fs.writeFile(
                    outfile,
                    build.css.concat(
                        // If the style is 'compressed',
                        // do not append a new line character at EOF,
                        // will be appended otherwise.
                        sassConfig.style !== 'compressed'
                            ? os.EOL  // New line
                            : ''      // No new line
                    ),
                    function (errWrite?: Error | null): void {
                        if (errWrite!) throw errWrite!;
                    }
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
 * @version 0.2
 */
async function _run_as_main(): Promise<void> {
    // Retrieve and parse the build configuration from 'build.json'
    const buildConfig: any =
        require(path.join(serverPaths.config, 'build.json'));
    
    console.time('build');
    
    // All command line arguments, excluding node command
    // and the script path
    const args: Array<string> = process.argv.slice(2);
    
    // Check for "sass" or "scss" at first argument
    // This is case-insensitive, which means allowing uppercase
    // or lowercase
    if (args.length > 0 && /^s[a|c]ss$/i.test(args[0])) {
        
        const sassFile: StringPath = path.join(serverPaths.scss, 'main.scss');
        const outFile: StringPath = path.join(
            /* Use destination path from build configuration,
             * if none, use the default destination path instead
             */
            (buildConfig.sass?.dest ||
                path.join(serverPaths.build, 'css')),
            'main.css'
        );
        
        await buildSass(
            sassFile,                              // Input
            outFile,                               // Output
            buildConfig.sass || null,              // Configuration
            function (err?: Error | null): void {  // Callback
                // Print the errors to the console
                if (err!) throw err!;
            }
        );
    }
    
    console.timeEnd('build');
    console.info('Build successful.');
}


// Main driver
// Only run when the module is executed directly,
// not being imported as module
if (require.main === module) {
    _run_as_main().catch(function (err?: Error | null): void {
        console.error(err!);
    });
}
