import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      Count: {count}
      <div>welcome to our site</div>
      <button onClick={() => setCount(count + 1)}>Count +</button>
    </>
  );
};

export default App;
