/**
 * Setup module.
 * @module setup
 * @author Ryuu Mitsuki
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
                    reject(new Error("Cannot found 'main.css' file in " +
                        serverPaths.build + '.\nBuild the CSS file using command: ' +
                        "'npm run build:css'"
                    ));
                    return;  // Exit the function
                }
                
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
