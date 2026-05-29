import React, { useState } from 'react';
function NameForm() {
 const [name, setName] = useState('');
 const [age, setAge] = useState('');
 return (
   <div>
    <input
     type="text"
     value={name}
     onChange={(e) => setName(e.target.value)}
     />
    <br/>
    <br/>
    <input
     type="text"
     value={age}
     onChange={(e) => setAge(e.target.value)}
     />
     <p>Hello, {name}! Your age is {age}</p>
   </div>
  );
}
export default NameForm
