import React, { useState } from 'react';
function FormExample() {
const [name, setName] = useState("");
function handleSubmit(event) {
  event.preventDefault();
  alert(`Form submitted with name: ${name}`);
}
return (
  <form onSubmit={handleSubmit}>
     <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
     />
     <button type="submit">Submit</button>
  </form>
  );
}
export default FormExample;
