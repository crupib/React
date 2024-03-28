import profilePic from './assets/download.jpeg'
function Card(){
    return (
        <div className="card">
            <img src={profilePic} alt="profile pic"></img>
            <h2 className="card-title">Bill</h2>
            <p className="card-text">Devops and coder</p>
        </div>
    );
}
export default Card;