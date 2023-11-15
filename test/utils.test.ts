/**
 * A module that tests all APIs on submodules of `utils` subpackage.
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */

import { typeChecker, typeCheckerAsync } from '../src/utils/config';

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
                                | Array<string | number
                                    | Array<string | Record<string, string>>>> = {
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
});
