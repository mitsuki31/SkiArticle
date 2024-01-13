/**
 * A module that tests all APIs on submodules of `utils` subpackage.
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */

import * as fs from 'fs';
import * as path from 'path';
import { Options as SassOptions } from 'sass/types';
import {
    typeChecker,
    typeCheckerAsync,
    resolve,
    defaultConfig
} from '../src/utils/config';
import {
    lsFiles,
    isObject,
    copyFile,
    exists
} from '../src/utils/coreutils';

describe("Module: 'utils/config'", function (): void {
    const testString: string = 'This is a string, you know';
    const testNumber: number = 7000;
    const testBoolean: boolean = true;
    const testArray: Array<string> = [ 'a', 'r', 'r', 'a', 'y' ];
    const testObject: Record<string, string | number
                                | Array<string | Record<string, string>>> = {
        o: 1,
        b: '2',
        j: [ { a: 'false', b: 'bar' }, 'foo' ]
    };
    const testRegex: RegExp = /^hello\sworld$/i;
    function testFunction(): number { return 0; }
    
    // config#typeChecker function
    describe('#typeChecker', function (): void {
        test('string test', function (): void {
            expect(typeChecker(testString, 'string')).toBeTruthy();
        });
        
        test('number test', function (): void {
            expect(typeChecker(testNumber, 'number')).toBeTruthy();
        });
        
        test('boolean test', function (): void {
            expect(typeChecker(testBoolean, 'boolean')).toBeTruthy();
        });
        
        test('array test', function (): void {
            expect(typeChecker(testArray, 'array')).toBeTruthy();
        });
        
        test('object test', function (): void {
            expect(typeChecker(testObject, 'object')).toBeTruthy();
        });
        
        test('function test', function (): void {
            expect(typeChecker(testFunction, 'function')).toBeTruthy();
        });
        
        test('regular expression test', function (): void {
            expect(typeChecker(testRegex, 'regexp')).toBeTruthy();
        });
        
        test.failing('give an ambiguous string as expected type then throws `TypeError`',
                function (): void {
            expect(typeChecker(testObject, 'fooType')).toThrowError(TypeError);
        });
    });
    
    // config#typeCheckerAsync function
    describe('#typeCheckerAsync', function (): void {
        test('string test', function (): void {
            typeCheckerAsync(testString, 'string', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testString);
                expect(response.type).toEqual('string');
            });
        });
        
        test('number test', function (): void {
            typeCheckerAsync(testNumber, 'number', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testNumber);
                expect(response.type).toEqual('number');
            });
        });
        
        test('boolean test', function (): void {
            typeCheckerAsync(testBoolean, 'boolean', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testBoolean);
                expect(response.type).toEqual('boolean');
            });
        });
        
        test('array test', function (): void {
            typeCheckerAsync(testArray, 'array', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testArray);
                expect(response.type).toEqual('array');
            });
        });
        
        test('object test', function (): void {
            typeCheckerAsync(testObject, 'object', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testObject);
                expect(response.type).toEqual('object');
            });
        });
        
        test('function test', function (): void {
            typeCheckerAsync(testFunction, 'function', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testFunction);
                expect(response.type).toEqual('function');
            });
        });
        
        test('regular expression test', function (): void {
            typeCheckerAsync(testRegex, 'regexp', function (response: TypeCheckerResponse): void {
                expect(response.error).toBeNull();
                expect(response.result).toBeTruthy();
                expect(response.value).toEqual(testRegex);
                expect(response.type).toEqual('regexp');
            });
        });
        
        test.failing('give an ambiguous string as expected type then throws `TypeError`',
                function (): void {
            typeCheckerAsync(testObject, 'fooType', function (response: TypeCheckerResponse): void {
                expect(response.error).toThrowError(TypeError);
                expect(response.result).toBeTruthy();
            });
        });
    });
    
    // config#resolve function
    describe('#resolve', function (): void {
        test('result test', function (): void {
            const otherConfig: SassConfig = {
                dest: 'tmp/build/',
                charset: true,
                sourceMap: {
                    generateFile: false,
                    includeSources: false
                },
                style: 'expanded',
                verbose: true
            };
            const expectedResult: ResolvedSassConfig = {
                charset: true,
                sourceMap: false,
                sourceMapIncludeSources: false,
                style: 'expanded',
                verbose: true
            };
            const result: SassOptions<'sync'> = resolve('sass', otherConfig);
            
            expect(result).not.toBeNull();
            expect(result).toStrictEqual(expectedResult);
        });
        
        test('give unknown type then returns back the given configuration', function (): void {
            const config: SassConfig = {
                charset: false,
                style: 'compressed',
                verbose: true
            };
            
            const result: SassOptions<'sync'> = resolve('css', config);
            expect(result).not.toBeNull();
            expect(result).toStrictEqual(config);
        });
        
        test('give an empty configuration then returns the default configuration', function (): void {
            const result: SassOptions<'sync'> = resolve('sass', {});
            expect(result).not.toBeNull();
            expect(result).toStrictEqual(defaultConfig.sass);
        });
    });
});

describe("Module: 'utils/coreutils'", function (): void {
    // coreutils#lsFiles function
    describe('#lsFiles', function (): void {
        const expectedFile: StringPath = path.basename(__filename),
              dirpath: StringPath = path.resolve(__dirname),
              curdirBase: StringPath = path.basename(__dirname);
        
        let options: LsFilesOptions = {
            basename: true
        };
        
        test(`search for '${expectedFile}' in ${curdirBase} directory with \`match\` search`,
                function (done: jest.DoneCallback): void {
            
            // Add match option
            Object.defineProperty(options, 'match', {
                value: new RegExp(expectedFile)
            });
            
            lsFiles(dirpath, options, function (err: NodeJS.ErrnoException | null,
                                                entries: Array<string> | null): void {
                if (err!) {
                    done(err!);
                    return;
                }
                
                try {
                    expect(err!).toBeNull();
                    expect(entries!).not.toBeNull();
                    expect(Array.isArray(entries!)).toBeTruthy();
                    expect(entries!).toHaveLength(1);
                    expect(entries!).toContain(expectedFile);
                    done();
                } catch (e: unknown) {
                    done(<Error>e);
                }
            });
        });
        
        test(`search for '${expectedFile}' in ${curdirBase} directory without \`match\` search`,
                function (done: jest.DoneCallback): void {
            lsFiles(path.join(dirpath, expectedFile), null, function (err: NodeJS.ErrnoException | null,
                                                                      entries: Array<string> | null): void {
                if (err!) {
                    done(err!);
                    return;
                }
                
                try {
                    expect(err!).toBeNull();
                    expect(entries!).not.toBeNull();
                    expect(Array.isArray(entries!)).toBeTruthy();
                    expect(entries!).toHaveLength(1);
                    expect(entries!).toContain(path.resolve(__filename));
                    done();
                } catch (e: unknown) {
                    done(<Error>e);
                }
            });
        });
        
        test('give non-existing file path then throws `Error`', function (done: jest.DoneCallback) {
            lsFiles(path.join(__dirname, `unknown-${Math.random() * 4300}.jsx`), null,
                    function (err: NodeJS.ErrnoException | null, entries: Array<string> | null): void {
                expect(err!).not.toBeNull();
                expect(err!.code).toEqual('ENOENT');
                expect(entries!).toBeNull();
                done();
            });
        });
    });
    
    // coreutils#isObject function
    describe('#isObject', function (): void {
        test('functionality test', function (): void {
            // Actual object test
            expect(isObject({ foo: 'this is an object' })).toBeTruthy();
            // String test
            expect(isObject('this is a string')).toBeFalsy();
            // Number test
            expect(isObject(12345)).toBeFalsy();
            // Array test
            expect(isObject([ 'a string inside an array' ])).toBeFalsy();
            // RegExp test
            expect(isObject(/this is a regex/)).toBeFalsy();
        });
    });
    
    // coreutils#copyFile function
    describe('#copyFile', function (): void {
        test('copy file test', function (done: jest.DoneCallback): void {
            const outfile: StringPath = path.resolve(__dirname, '..', 'tmp', 'copyFileTest.tmp');
            const copyDest: StringPath = path.join(path.dirname(outfile), 'copyFileTest.copied.tmp');
            
            // Create an empty file and save with the specified name
            fs.mkdirSync(path.dirname(outfile), { recursive: true });  // Create the directory, if not exists
            fs.writeFile(outfile, '', function (err: NodeJS.ErrnoException | null): void {
                if (err!) {
                    done(err!);
                    return;
                }
            });
            
            // Test the copyFile function
            copyFile(outfile, copyDest)
                .then(function (): void {
                    // Delete the created and copied file
                    const files: Array<string> = [outfile, copyDest];
                    for (const file of files) {
                        fs.unlink(file, function (err: NodeJS.ErrnoException | null): void {
                            if (err!) {
                                done(err!);
                                return;
                            }
                        });
                    }
                    done();  // Success
                })
                .catch(function (err?: NodeJS.ErrnoException): void {
                    if (err!) done(err!);
                });
        });
    });
    
    // coreutils#exists function
    describe('#exists', function (): void {
        const rootDir: StringPath = path.resolve(__dirname, '..');
        
        test('check the existence of this file', function (done: jest.DoneCallback): void {
            exists(path.resolve(__filename))
                .then((): void => done())
                .catch((err: NodeJS.ErrnoException): void => done(err));
        });
        
        test("check the existence of 'package.json' in project's root directory",
                function (done: jest.DoneCallback): void {
            exists(path.join(rootDir, 'package.json'))
                .then((): void => done())
                .catch((err: NodeJS.ErrnoException): void => done(err));
        });
        
        test.failing('throws an error if file does not exist',
                function (done: jest.DoneCallback): void {
            exists(path.join(rootDir, 'random string representing non-existing file'))
                .catch((err: NodeJS.ErrnoException): void => done(err));
        });
    });
});
