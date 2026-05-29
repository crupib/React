import logo from './logo.svg';
import './App.css';
import React from 'react';
import Welcome from './components/Welcome.js';
import UserCard from './components/UserCard.js';
import Button from './components/Button.js';
import Counter from './components/Counter.js';
import NameForm from './components/NameForm.js';
function App() {
  return (
    <div>
	<h1>Main App Component</h1>
	<Welcome />
        <UserCard name="Alice" />
        <UserCard name="Bob" />
        <Button label="Submit" onClick={() => console.log('Submitted')} />
        <br/>
        <Button label="Cancel" onClick={() => console.log('Cancelled')} />
        <Counter />
        <NameForm />
    </div>
  );
}

export default App;
