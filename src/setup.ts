/**
 * Setup module.
 * @module setup
 * @author Ryuu Mitsuki
 */

import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import { clientPaths, serverPaths, lsFiles } from './utils/coreutils';

async function copyFile(src: StringPath,
                        dest: StringPath): Promise<void> {
    try {
        await fs.promises.copyFile(src, dest);
    } catch (error: unknown) {
        // Unsafe type casting
        const nError: NodeJS.ErrnoException = <NodeJS.ErrnoException>error,
              err: Error = new Error(
                  `Error copyFile: ${nError.message}`,
                  // In ECMAScript 2020 and earlier, only the first argument will be used
                  // as the error message, and the rest will be ignored.
                  { cause: nError });
        throw err;
    }
}


export default async function setup(): Promise<void> {
    return new Promise(async function (
        resolve: () => void, reject: (reason?: Error) => void
    ): Promise<void> {
        try {
            // Search for main CSS within 'build' directory
            const mainCSS: StringPath = (await util.promisify(lsFiles)(
                serverPaths.build,    // '<rootDir>/build'
                { match: /\/?main\.css$/, basename: false }
            ))![0];  // The `lsFiles` returns an array, here we just need the first entry
            
            // Throw an error if the main CSS cannot be found
            if (!mainCSS) {
                throw new Error("Cannot found 'main.css' file in " +
                    serverPaths.build + '.\nBuild the CSS file using command: ' +
                    "'npm run build:css'"
                );
            }
            
            const outMainCSS: StringPath = path.join(
                clientPaths.assets.css, path.basename(mainCSS));
            
            // Wait till all promises finished their jobs
            await Promise.all([
                // Check the existence of "main.css" file
                fs.promises.access(
                    mainCSS, fs.constants.F_OK | fs.constants.R_OK),
                // Create the destination directory
                fs.promises.mkdir(
                    path.dirname(outMainCSS), { recursive: true })
            ]);
            
            // Copy the main CSS to client-side
            await copyFile(mainCSS, outMainCSS);
        } catch (e: unknown) {
            if (e instanceof Error) reject(e);
        }
        resolve();  // Done
    });
}
