import { runInContext } from '../../src';

describe('ArrayExpression', () => {
    test('case 1', () => {
        const code = `
            module.exports = [1, 2, 3];
        `;
        const result = runInContext(code);
        expect(result).toEqual([1, 2, 3]);
    });

    test('case 2', () => {
        const code = `
            var arr = [1, 2, 3];
            arr.push(4);
            module.exports = arr;
        `;
        const result = runInContext(code);
        expect(result).toEqual([1, 2, 3, 4]);
    })

    test('es5 empty list item', () => {
        const code = `
var l = [1,2,,3];
expect(l[2]).toBeUndefined()
`;
        runInContext(code, {
            expect
        }, {});
    });

    test('es2015 empty list item', () => {
        const code = `
var l1 = [1,2,,3];
var l2 = [1,2,,3,...l1];
expect(l2[2]).toBeUndefined()
expect(l2[6]).toBeUndefined()
`;
        runInContext(code, {
            expect
        }, { ecmaVersion: 'es2015' });
    });
});
