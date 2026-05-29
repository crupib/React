import logo from './logo.svg';
import './App.css';
import React from 'react';
import Welcome from './components/Welcome.js';
import UserCard from './components/UserCard.js';
import Button from './components/Button.js';
import Counter from './components/Counter.js';
import NameForm from './components/NameForm.js';
import ClickExample from './components/ClickExample.js';
import FormExample from './components/FormExample.js';
function App() {
  return (
    <div>
	<h1>Main App Component</h1>
	<Welcome />
        <UserCard name="Alice" />
        <UserCard name="Bob" />
        <Button label="Submit" onClick={() => console.log('Submitted')} />
        <br/>
        <br/>
        <Button label="Cancel" onClick={() => console.log('Cancelled')} />
        <br/>
        <Counter />
        <br/>
        <br/>
        <NameForm />
        <br/>
        <br/>
        <ClickExample />
        <br/>
        <br/>
        <FormExample />
    </div>
  );
}

export default App;
