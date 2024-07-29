const message = bottle.fullOfSoda
  ? "The bottle has soda!"
  : "The bottle may not have soda :-(";

// is the same as
let message;
if (bottle.fullOfSoda) {
  message = "The bottle has soda!";
} else {
  message = "The bottle may not have soda :-(";
}

// in React:
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
