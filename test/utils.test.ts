/**
 * A module that tests all APIs on submodules of `utils` subpackage.
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */

import * as path from 'path';
import { Options as SassOptions } from 'sass/types';
import {
    typeChecker,
    typeCheckerAsync,
    resolve,
    defaultConfig
} from '../src/utils/config';
import { lsFiles } from '../src/utils/coreutils';

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
    describe('#lsFiles', function (): void {
        const expectedFile: StringPath = path.basename(__filename),
              dirpath: StringPath = path.resolve(__dirname),
              curdirBase: StringPath = path.basename(__dirname);
        
        let options: LsFilesOptions = {
            baseName: true
        };
        
        test(`search for '${expectedFile}' in ${curdirBase} directory with \`match\` search`,
                function (done: jest.DoneCallback): void {
            
            // Add match option
            Object.defineProperty(options, 'match', {
                value: new RegExp(expectedFile)
            });
            
            lsFiles(dirpath, options, function (err?: Error | null,
                                                entries?: Array<string> | null): void {
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
            lsFiles(path.join(dirpath, expectedFile), null, function (err?: Error | null,
                                                                      entries?: Array<string> | null): void {
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
        
        // FIXME
        test.skip('error no such file test', function (done: jest.DoneCallback) {
            lsFiles(path.join(__dirname, `unknown-${Math.random() * 4300}.jsx`), null,
                    function (err?: Error | null, entries?: Array<string> | null): void {
                expect(err!).not.toBeNull();
                expect(err!).toBeInstanceOf(Error);
                expect(entries!).toBeNull();
                done(err!);
            });
        });
    });
});
