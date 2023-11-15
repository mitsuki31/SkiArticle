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
    resolve
} from '../src/utils/config';
import { lsFiles } from '../src/utils/coreutils';
import {
    StringPath,
    SassConfig,
    ResolvedSassConfig,
    LsFilesOptions
} from '../src/typings';

// TODO: move this interface to typings module
interface TypeCheckerResponse {
    result: boolean,
    error: Error | TypeError | null,
    value: unknown,
    type: string
}

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
    });
});

describe("Module: 'utils/coreutils'", function (): void {
    describe('#lsFiles', function (): void {
        test(`search for '${path.basename(__filename)}' in ${path.basename(__dirname)} directory`,
                function (done: jest.DoneCallback): void {
            const dirpath: StringPath = path.resolve(__filename);
            const expectedFile: string = path.basename(__filename);
            const options: LsFilesOptions = {
                match: new RegExp(expectedFile),
                exclude: /(^|\/)+\./,
                baseName: false
            };
            lsFiles(dirpath, options,
                    function (err?: Error | null, entries?: Array<string> | null): void {
                if (err!) {
                    done(err!);
                    return;
                }
                
                
                try {
                    // Get the base file names
                    entries = entries!.map(function (entry: string): string {
                        return path.basename(entry);
                    });
                    
                    expect(err!).toBeNull();
                    expect(entries!).not.toBeNull();
                    expect(Array.isArray(entries!)).toBeTruthy();
                    expect(entries!).toContain(expectedFile);
                    done();
                } catch (e: unknown) {
                    done(<Error>e);
                }
            });
        });
    });
});
