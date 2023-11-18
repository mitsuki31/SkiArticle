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

import * as path from 'path';         // Path module
import * as os from 'os';             // OS module
import * as fs from 'fs';             // File System module
import * as sass from 'sass';         // Sass module
import {
    Options as SassOptions,
    CompileResult as SassCompileResult
} from 'sass/types';  // Sass types

import * as config from './utils/config';         // Config module (local)
import { serverPaths } from './utils/coreutils';  // Coreutils module (local)

// Build Configuration
import buildConfig = require('../config/build.json');


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
 * @param {!StringPath} infile
 *        Path to the input Sass file to be compiled.
 * @param {!StringPath} outfile
 *        Path to save the compiled CSS output.
 * @param {SassConfig | null} sassConfig
 *        Configuration options for Sass compilation.
 *
 * @throws {Error} If the input Sass file does not
 *                 exist or if there are I/O issues.
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.3
 */
function buildSass(infile: StringPath,
                   outfile: StringPath,
                   sassConfig?: SassConfig | null): void {
    // Resolve and fix the configuration, the configuration
    // will be passed to `sass.compile` arguments
    const resolvedSassConfig: SassOptions<'sync'> =
        config.resolve('sass', sassConfig!, !sassConfig!);
    
    // Ensure the input Sass file exists
    fs.accessSync(infile, fs.constants.F_OK | fs.constants.R_OK);
    
    // Resolve and make the destination directory
    // an absolute path, if it was non-absolute (i.e. relative)
    outfile = path.isAbsolute(outfile)
        ? outfile
        : path.resolve(outfile);
    
    // Compile the input Sass file synchronously
    const build: SassCompileResult = sass.compile(
        path.resolve(infile),  // Input file
        resolvedSassConfig
    );
    
    // Synchronously create the directory recursively
    fs.mkdirSync(path.dirname(outfile), { recursive: true });
    
    // Write the compiled CSS to the specified
    // output file synchronously after its parent
    // directory successfully created with no error
    fs.writeFileSync(outfile, build.css.toString().concat(
        // If the style is 'compressed',
        // do not append a new line character at EOF,
        // will be appended otherwise.
        sassConfig!.style !== 'compressed'
            ? os.EOL  // New line
            : ''      // No new line
    ));
}


/**
 * Private function that runs asynchronously as the main entry
 * point of the module.
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
function _run_as_main(): void {
    console.time('build');
    
    // All command line arguments, excluding node command
    // and the script path
    const args: Array<string> = process.argv.slice(2);
    
    // Check for "sass" or "scss" at first argument
    // This is case-insensitive, which means allowing uppercase
    // or lowercase
    if (args.length > 0 && /^s[a|c]ss$/i.test(args[0])) {
        const sassFile: StringPath = path.join(serverPaths.scss, 'main.scss'),
              outFile: StringPath = path.join(
            /* Use destination path from build configuration,
             * if none, use the default destination path instead
             */
            (buildConfig.sass?.dest || path.join(serverPaths.build, 'css')),
            'main.css'
        );
        
        buildSass(
            sassFile,                  // Input
            outFile,                   // Output
            buildConfig.sass! || null,  // Configuration
        );
    }
    
    console.timeEnd('build');
    console.info('Build successful.');
}

export { buildSass };


// Main driver
// Only run when the module is executed directly,
// not being imported as module
if (require.main === module) {
    _run_as_main();
}
