// Template literal:
const greeting = "Hello";
const subject = "World";
console.log(`${greeting} ${subject}!`); // Hello World!

// this is the same as:
console.log(greeting + " " + subject + "!");

// in React:
function Box({ className, ...props }) {
  return <div className={`box ${className}`} {...props} />;
}
// Template literals are like regular strings with super-powers:
