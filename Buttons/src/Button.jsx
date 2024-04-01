function Button() {
    const styles = {
            backgroundColor: "hsl(200,100%,50%)",
            padding: "10px 20px",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
        } 
    return(<button className={styles}>Click me</button>)
}
export default Button
