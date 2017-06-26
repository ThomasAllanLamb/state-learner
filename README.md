# TODO

- Provide minified version.
- Are declarations in the right place?
- Add source mapping
- Add usage instructions
- Is tsconfig.json necessary?
- Outsource ArrayMap
- Add declaration to published material. Try to build declaration from main.ts using "declaration": true
- Possible solution to problem of passing large clones of arrays is to create a class which, when given an array, just re-indexes it and hides the necessary elements. e.g. x = new ReducedArray([1,2,3]); x.toString() === "2,3"; x.length === 2;