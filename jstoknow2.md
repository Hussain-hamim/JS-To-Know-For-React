Sure, here is how you can format the provided article into a `README.md` file with proper syntax highlighting for code blocks:

```markdown
# JavaScript Features for Building React Apps

## ESModules

If you're building an app with modern tools, chances are it supports modules. It's a good idea to learn how the syntax works because any application of even trivial size will likely need to make use of modules for code reuse and organization.

```javascript
export default function add(a, b) {
    return a + b;
}

/*
 * import add from './add'
 * console.assert(add(3, 2) === 5)
 */

export const foo = 'bar';

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
```

### Dynamic Imports

```javascript
import('./some-module').then(
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
```

### In React

```javascript
import React, { Suspense, Fragment } from 'react';

// dynamic import of a React component
const BigComponent = React.lazy(() => import('./big-component'));
// big-component.js would need to "export default BigComponent" for this to work
```

### MDN References

- [MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

As another resource, I gave a whole talk about this syntax and you can watch that talk [here](#).

## Ternaries

I love ternaries. They're beautifully declarative. Especially in JSX.

```javascript
const message = bottle.fullOfSoda
    ? 'The bottle has soda!'
    : 'The bottle may not have soda :-(';

// is the same as
let message;
if (bottle.fullOfSoda) {
    message = 'The bottle has soda!';
} else {
    message = 'The bottle may not have soda :-(';
}
```

### In React

```javascript
function TeddyBearList({ teddyBears }) {
    return (
        <React.Fragment>
            {teddyBears.length ? (
                <ul>
                    {teddyBears.map((teddyBear) => (
                        <li key={teddyBear.id}>
                            <span>{teddyBear.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>There are no teddy bears. The sadness.</div>
            )}
        </React.Fragment>
    );
}
```

I realize that ternaries can get a knee-jerk reaction of disgust from some people who had to endure trying to make sense of ternaries before prettier came along and cleaned up our code. If you're not using prettier already, I strongly advise that you do. Prettier will make your ternaries much easier to read.

### MDN Reference

- [MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## Array Methods

Arrays are fantastic and I use array methods all the time! I probably use the following methods the most frequently: `find`, `some`, `every`, `includes`, `map`, `filter`, `reduce`.

Here are some examples:

```javascript
const dogs = [
    {
        id: 'dog-1',
        name: 'Poodle',
        temperament: [
            'Intelligent',
            'Active',
            'Alert',
            'Faithful',
            'Trainable',
            'Instinctual',
        ],
    },
    {
        id: 'dog-2',
        name: 'Bernese Mountain Dog',
        temperament: ['Affectionate', 'Intelligent', 'Loyal', 'Faithful'],
    },
    {
        id: 'dog-3',
        name: 'Labrador Retriever',
        temperament: [
            'Intelligent',
            'Even Tempered',
            'Kind',
            'Agile',
            'Outgoing',
            'Trusting',
            'Gentle',
        ],
    },
];

dogs.find((dog) => dog.name === 'Bernese Mountain Dog');
// {id: 'dog-2', name: 'Bernese Mountain Dog', ...etc}

dogs.some((dog) => dog.temperament.includes('Aggressive'));
// false

dogs.some((dog) => dog.temperament.includes('Trusting'));
// true

dogs.every((dog) => dog.temperament.includes('Trusting'));
// false

dogs.every((dog) => dog.temperament.includes('Intelligent'));
// true

dogs.map((dog) => dog.name);
// ['Poodle', 'Bernese Mountain Dog', 'Labrador Retriever']

dogs.filter((dog) => dog.temperament.includes('Faithful'));
// [{id: 'dog-1', ...}, {id: 'dog-2', ...}]

dogs.reduce((allTemperaments, dog) => {
    return [...allTemperaments, ...dog.temperament];
}, []);
// [ 'Intelligent', 'Active', 'Alert', ...etc ]
```

### In React

```javascript
function RepositoryList({ repositories, owner }) {
    return (
        <ul>
            {repositories
                .filter((repo) => repo.owner === owner)
                .map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
        </ul>
    );
}
```

### MDN Reference

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Nullish Coalescing Operator

If a value is `null` or `undefined`, then you may want to fallback to some default value:

```javascript
// here's what we often did for this:
x = x || 'some default';

// but this was problematic for numbers or booleans where "0" or "false" are valid values

// So, if we wanted to support this:
add(null, 3);

// here's what we had to do before:
function add(a, b) {
    a = a == null ? 0 : a;
    b = b == null ? 0 : b;
    return a + b;
}

// here's what we can do now
function add(a, b) {
    a = a ?? 0;
    b = b ?? 0;
    return a + b;
}

// in React:
function DisplayContactName({ contact }) {
    return <div>{contact.name ?? 'Unknown'}</div>;
}
```

### MDN Reference

- [MDN: Nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

## Optional Chaining

Also known as the "Elvis Operator," this allows you to safely access properties and call functions that may or may not exist. Before optional chaining, we used a hacky-workaround that relied on falsy/truthy-ness.

```javascript
// what we did before optional chaining:
const streetName = user && user.address && user.address.street.name;

// what we can do now:
const streetName = user?.address?.street?.name;

// this will run even if options is undefined (in which case, onSuccess would be undefined as well)
// however, it will still fail if options was never declared,
// since optional chaining cannot be used on a non-existent root object.
// optional chaining does not replace checks like if (typeof options == "undefined")
const onSuccess = options?.onSuccess;

// this will run without error even if onSuccess is undefined (in which case, no function will be called)
onSuccess?.({ data: 'yay' });

// and we can combine those things into a single line:
options?.onSuccess?.({ data: 'yay' });

// and if you are 100% certain that onSuccess is a function if options exists
// then you don't need the extra ?. before calling it. Only use ?. in situations
// where the thing on the left might not exist.
options?.onSuccess({ data: 'yay' });

// in React:
function UserProfile({ user }) {
    return (
        <div>
            <h1>{user.name}</h1>
            <strong>{user.bio?.short ?? 'No bio provided'}</strong>
        </div>
    );
}
```

A word of caution around this is that if you find yourself doing `?.` a lot in your code, you might want to consider the place where those values originate and make sure they consistently return the values they should.

### MDN Reference

- [MDN: Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## Promises and async/await

This one's a big subject and it can take a bit of practice and time working with them to get good at them. Promises are everywhere in the JavaScript ecosystem and thanks to how entrenched React is in that ecosystem, they're everywhere there as well (in fact, React itself uses promises internally).

Promises help you manage asynchronous code and are returned from many DOM APIs as well as third