function Button() {
    // const handleClick2 = (name) => console.log(`${name} stop clicking me`);
    //let count = 0;
    /*const handleClick = (name) => {
        if (count < 3) {
            count++;
            console.log(`${name} you clicked me ${count} times`);
        }
        else {
            console.log(`${name} stop clicking me asswipe`)
        }
    }
   */
    const handleClick = (e) => e.target.textContent = "Fucking 😱";
    return( 
        <button onDoubleClick={(e) => handleClick(e)}>Click Me 🤬</button>
    );
}
export default Button;