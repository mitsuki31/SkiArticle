import * as fs from 'fs';
import * as path from 'path';

import { buildSass } from '../src/build';
import { lsFiles } from '../src/utils/coreutils';
import { defaultConfig } from '../src/utils/config';

describe("Module: 'build'", function (): void {
    describe('#buildSass', function (): void {
        // Here we do not want to use predefined paths from 'coreutils' module to get root path,
        // because they were intended for front-end use.
        const rootDir: StringPath = path.resolve(__dirname, '..'),
              outDir: StringPath = path.join(rootDir, 'tmp', 'build'),  // Actual 'build' directory not for development use
              files: Array<StringPath> = [];
        
        beforeAll(async function (): Promise<void> {
            return new Promise<void>(function (resolve: () => void,
                                               reject: (reason?: Error) => void): void {
                lsFiles(path.join(rootDir, 'src', 'scss'), {
                    match: /.+\.s[ac]ss$/i,      // Search all files with extension both of '.sass' and '.scss'
                    exclude: /\/?_.+\.s[ac]ss/i  // Exclude all files that prefixed with underscore '_'
                }, function (err: NodeJS.ErrnoException | null,
                             entries: Array<StringPath> | null): void {
                    if (err!) reject(err!);
                    
                    files.push(...entries!);  // Append all
                    expect(files.length).toBeGreaterThan(0);  // Check before continue
                    resolve();
                });
            });
        });
        
        test('build all Sass files with default configuration', function (): void {
            files.forEach(function (inFile: StringPath): void {
                // Create the output file name based to input file name
                const outFile: StringPath = path.join(
                    outDir,
                    path.basename(inFile).replace(/\.s[ac]ss$/, '.css')  // Replace extension to CSS
                );
                
                // Note: 'buildSass' function are synchronous
                buildSass(inFile, outFile, {/* use default */});
            });
        });
        
        test('build all Sass files with custom configuration', function (): void {
            files.forEach(function (inFile: StringPath): void {
                const sassConfig: SassConfig = {
                    charset: true,
                    style: 'compressed'
                };
                
                // Create the output file name based to input file name
                const outFile: StringPath = path.join(
                    outDir,
                    path.basename(inFile).replace(/\.s[ac]ss$/, '.css')  // Replace extension to CSS
                );
                
                buildSass(inFile, outFile, sassConfig);
            });
        });
        
        afterAll(async function (): Promise<void> {
            return new Promise<void>(function (resolve: () => void,
                                               reject: (reason?: Error) => void): void {
                // Check the existence of output directory
                fs.stat(outDir, function (err?: NodeJS.ErrnoException | null,
                                          stats?: fs.Stats | null): void {
                    if (err!) reject(err!);
                    // Delete the output directory recursively
                    fs.rm(outDir, { recursive: true, force: true },
                            function (errRm?: NodeJS.ErrnoException | null): void {
                        if (errRm!) reject(errRm!);
                    });
                });
                resolve();
            });
        });
    });
});
