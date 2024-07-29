// add(1)
// add(1, 2)
function add(a, b = 0) {
  return a + b;
}

// is the same as
const add = (a, b = 0) => a + b;

// is the same as
function add(a, b) {
  b = b === undefined ? 0 : b;
  return a + b;
}

// in React:
function useLocalStorageState({
  key,
  initialValue,
  serialize = (v) => v,
  deserialize = (v) => v,
}) {
  const [state, setState] = React.useState(
    () => deserialize(window.localStorage.getItem(key)) || initialValue
  );

  const serializedState = serialize(state);
  React.useEffect(() => {
    window.localStorage.setItem(key, serializedState);
  }, [key, serializedState]);

  return [state, setState];
}
