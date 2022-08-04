import { runInContext } from '../../src';

describe('VariableDeclaration', () => {
    test('var', () => {
        const code = `
            var a = 1;
            module.exports = a;
        `;
        const result = runInContext(code);
        expect(result).toBe(1);
    });

    test('duplicate var', () => {
        const code = `
            var a = 1;
            var a = 2;
            module.exports = a;
        `;
        const result = runInContext(code);
        expect(result).toBe(2);
    });

    test('function true block var scope', () => {

        const code = `
function fun() {
    expect(x).toBeUndefined()
    if (true) {
        var x = 1;
    }
    console.log(x)
    {
        var x = 2;    
    }
    console.log(x)
}
fun();
`;
        runInContext(code, {
            expect
        }, {});
    });

    test('function arguments block var scope', () => {

        const code = `
function fun(x) {
    expect(x).toBe("xg")
    var x = x + "1";
    expect(x).toBe("xg1")
}
fun("xg");
`;
        runInContext(code, {
            expect
        }, {});
    });

    test('block var scope', () => {

        const code = `

function f(x) {
    expect(x).toBe("x")
    expect(s).toBeUndefined()
    expect(sa).toBeUndefined()
    expect(sb).toBeUndefined()
    expect(sc).toBeUndefined()
  var s = 1
  for (var a = 0; a < 1; a++) {
    var sa = "sa"
    for (var b = 0; b < 1; b++) {
      var sb = "sb"
      for (var c = 0; c < 2; c++) {
        var sc = "sc"
      }
    }
  }
  
    expect(a).toBe(1)
    expect(b).toBe(1)
    expect(c).toBe(2)
    expect(s).toBe(1)
    expect(sa).toBe("sa")
    expect(sb).toBe("sb")
    expect(sc).toBe("sc")
}

f("x");
`;
        runInContext(code, {
            expect
        }, {});
    });

    test('function name scope', () => {

        const code = `
var s = function e() {
    var a;
    expect(typeof a).toBe("function");
    function a() {
      console.log("a");
    }
    a();
    return a;
}();
`;
        runInContext(code, {
            expect
        }, {});
    });

    test('function block scope', () => {

        const code = `
var s = function e() {
    var a;
    expect(typeof a).toBe("function");
    function a() {
      console.log("a");
    }
    a();
    {
        var a = 1;
    }
    return a;
}();
module.exports = s
`;
        const s = runInContext(code, {
            expect
        }, {});
        expect(s).toBe(1);
    });
});
