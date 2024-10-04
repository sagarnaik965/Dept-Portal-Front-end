import { Button } from '@material-tailwind/react';
import React, { useState ,Component} from 'react';



export default function A() {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }

  return (
    <>
      {/* <h1>Hello</h1> */}
      <Component key={seed} /><Button onClick={reset}>Reset</Button>
    </>
  );
}

