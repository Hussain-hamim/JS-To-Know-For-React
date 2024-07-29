export default function add(a, b) {
  return a + b;
}

/*
 * import add from './add'
 * console.assert(add(3, 2) === 5)
 */

export const foo = "bar";

/*
 * import {foo} from './foo'
 * console.assert(foo === 'bar')
 */

export function subtract(a, b) {
  return a - b;
}

export const now = new Date();

/*
 * import {subtract, now} from './stuff'
 * console.assert(subtract(4, 2) === 2)
 * console.assert(now instanceof Date)
 */

// dynamic imports
import("./some-module").then(
  (allModuleExports) => {
    // the allModuleExports object will be the same object you get if you had
    // used: import * as allModuleExports from './some-module'
    // the only difference is this will be loaded asynchronously which can
    // have performance benefits in some cases
  },
  (error) => {
    // handle the error
    // this will happen if there's an error loading or running the module
  }
);

// in React:
import React, { Suspense, Fragment } from "react";

// dynamic import of a React component
const BigComponent = React.lazy(() => import("./big-component"));
// big-component.js would need to "export default BigComponent" for this to work
