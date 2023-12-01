/**
 * Setup module.
 * @module   setup
 * @requires module:utils/coreutils.clientPaths
 * @requires module:utils/coreutils.serverPaths
 * @requires module:utils/coreutils.lsFiles
 * @requires module:utils/coreutils.copyFile
 * @requires module:utils/coreutils.exists
 * @author    Ryuu Mitsuki
 * @since     0.1.0
 * @version   0.1
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import {
    clientPaths,
    serverPaths,
    lsFiles,
    copyFile,
    exists
} from './utils/coreutils';


/**
 * Sets up necessary configurations for the client-side to ensure the website runs as expected.
 *
 * Currently, this function copies the built main CSS file from the server-side to the client-side.
 *
 * @public
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the setup is complete or rejects with an error.
 * @throws {Error} Throws an error if the main CSS file is not found or if there's an issue during the setup process.
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */
export default async function setup(): Promise<void> {
    return new Promise(function (
        resolve: () => void, reject: (reason?: Error) => void
    ): void {
        // Search for main CSS within 'build' directory
        (util.promisify(lsFiles))(serverPaths.build,  // '<rootDir>/build'
            { match: /\/?main\.css$/, basename: false }
        )
            .then(async function (res: Array<StringPath> | null): Promise<void> {
                // The `lsFiles` returns an array, here we just need the first entry
                const mainCSS: StringPath = res![0];
                
                // Throw an error if the main CSS cannot be found
                if (!mainCSS && !res?.length) {
                    reject(new Error(`Cannot find 'main.css' file in ${serverPaths.build}.` +
                        "\nBuild the CSS file using command: 'npm run build:css'"
                    ));
                    return;  // Exit the function
                }
                
                // Set the destination path for the main CSS file on the client-side
                const outMainCSS: StringPath = path.join(
                    clientPaths.assets.css, path.basename(mainCSS));
                
                try {
                    await Promise.all([
                        // Check the existence of "main.css" file
                        exists(mainCSS),
                        // Create the destination directory
                        fs.promises.mkdir(
                            path.dirname(outMainCSS), { recursive: true })
                    ]);
                    
                    // Copy the main CSS file to client-side
                    await copyFile(mainCSS, outMainCSS);
                    resolve();  // Done
                } catch (e: unknown) {
                    reject(<Error>e);
                }
            })
            .catch(function (err: Error): void {
                if (err) reject(err);
            });
    });
}
