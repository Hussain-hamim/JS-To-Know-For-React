const getFive = () => 5;
const addFive = (a) => a + 5;
const divide = (a, b) => a / b;

// this is the same as:
function getFive() {
  return 5;
}
function addFive(a) {
  return a + 5;
}
function divide(a, b) {
  return a / b;
}

// in React:
export default function TeddyBearList({ teddyBears }) {
  return (
    <ul>
      {teddyBears.map((teddyBear) => (
        <li key={teddyBear.id}>
          <span>{teddyBear.name}</span>
        </li>
      ))}
    </ul>
  );
}
