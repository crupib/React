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
      <div className="main-content">
        <h1>Main App Component</h1>
        <Welcome />
        <UserCard name="Alice" />
        <UserCard name="Bob" />
        <Button label="Submit" onClick={() => console.log('Submitted')} />
        <br />
        <br />
        <Button label="Cancel" onClick={() => console.log('Cancelled')} />
      </div>

      <Counter />

      <div className="main-content">
        <br />
        <br />
        <NameForm />
        <br />
        <br />
        <ClickExample />
        <br />
        <br />
        <FormExample />
      </div>
    </div>
  );
}
export default App;
