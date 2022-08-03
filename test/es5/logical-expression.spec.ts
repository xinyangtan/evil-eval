import { runInContext } from '../../src';

describe('LogicalExpression', () => {
    test('||', () => {
        const code = `
            expect(true || true).toBe(true);
            expect(true || false).toBe(true);
            expect(false || true).toBe(true);
            expect(false || false).toBe(false);
        `;
        runInContext(code, { expect });
    });

    test('&&', () => {
        const code = `
        expect(true && true).toBe(true);
        expect(true && false).toBe(false);
        expect(false && true).toBe(false);
        expect(false && false).toBe(false);
        `;
        runInContext(code, { expect });
    });


    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation
     */
    test('Logical AND (&&) Short-circuit evaluation', () => {
        function A() { console.log('called A'); return false; }
        function B() { console.log('called B'); return true; }

        var fA = jest.fn(A)
        var fB = jest.fn(B)

        console.log(fA() && fB());
// logs "called A" to the console due to the call for function A,
// && evaluates to false (function A returns false), then false is logged to the console;
// the AND operator short-circuits here and ignores function B

        expect(fA).toBeCalled()
        expect(fB).not.toBeCalled()

        const code = `
function A() { console.log('called A'); return false; }
function B() { console.log('called B'); return true; }

var fA = jest.fn(A)
var fB = jest.fn(B)

console.log(fA() && fB());
// logs "called A" to the console due to the call for function A,
// && evaluates to false (function A returns false), then false is logged to the console;
// the AND operator short-circuits here and ignores function B

expect(fA).toBeCalled()
expect(fB).not.toBeCalled()
`;
        runInContext(code, {
            jest,
            expect
        });
    });

    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR#short-circuit_evaluation
     */
    test('Logical OR (||) Short-circuit evaluation', () => {
        function A(){ console.log('called A'); return false; }
        function B(){ console.log('called B'); return true; }

        var fA = jest.fn(A)
        var fB = jest.fn(B)

        console.log(fB() || fA());
// logs "called B" due to the function call,
// then logs true (which is the resulting value of the operator)

        expect(fA).not.toBeCalled()
        expect(fB).toBeCalled()

        const code = `
function A(){ console.log('called A'); return false; }
function B(){ console.log('called B'); return true; }

var fA = jest.fn(A)
var fB = jest.fn(B)

console.log(fB() || fA());
// logs "called B" due to the function call,
// then logs true (which is the resulting value of the operator)

expect(fA).not.toBeCalled()
expect(fB).toBeCalled()
`;
        runInContext(code, {
            jest,
            expect
        });
    });
});
