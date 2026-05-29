import React, { useState } from 'react';
function ClickExample() {
const [message, setMessage] = useState("Nothing clicked yet");
function handleClick() {
  setMessage("Button was clicked!");
}
return (
  <div>
     <p>{message}</p>
     <button onClick={handleClick}>Click Me</button>
  </div>
 );
}
export default ClickExample;
