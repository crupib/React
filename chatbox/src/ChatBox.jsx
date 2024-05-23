import React, {useState} from "react";
function myFunction(myprompt) {
    console.log(myprompt);
    gptbox.value = myprompt + "\n------------------------------------"
    gptbox.value = gptbox.value +"\nGermany"

    
}
function ChatBox(){
    return(
    <div className="chatbox">
        <h1>MANTLE NTS CHATBOX</h1>
        <h4>Enter question?</h4>
        <textarea id="gptbox" name="gptbox" cols="50" rows="20"> 
        </textarea>   
        <div></div>
        <button onClick={() => myFunction(gptbox.value)} className="submit-button">Submit! </button> 
    </div>
    
    );
}
export default ChatBox