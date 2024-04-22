import React, {useState, useEffect} from 'react';
function MyComponent()   {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("green");
    useEffect(() => {
        document.title = `Count: ${count} ${color}`;
        //document.title = "My Counter Program";
        return () => {
            //some cleanup code
        }
    },[count,color]);
    function addcount() {
        setCount(c => c + 1);
    }
    function changeColor() {
        setColor(c => c==="green" ? "red" :"green");
    }
    function subtractCount() {
        setCount(c => c - 1);
    }
    return (<>
        <p style={{color:color}}>Count: {count} </p>
        <button onClick={addcount}>Add</button>
        <button onClick={subtractCount}>Subtract</button><br/>
        <button onClick={changeColor}>Change Color</button>
    </>);
}
export default MyComponent;