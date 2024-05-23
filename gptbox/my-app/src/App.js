// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [output, setOutput] = useState('');

    const runScript = async () => {
        try {
            const response = await axios.post('http://localhost:5000/run-script');
            setOutput(response.data.output);
        } catch (error) {
            console.error('There was an error running the script!', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Run Python Script</h1>
                <button onClick={runScript}>Run Script</button>
                <pre>{output}</pre>
            </header>
        </div>
    );
}

export default App;
