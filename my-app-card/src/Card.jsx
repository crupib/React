import profilePic from './assets/download.jpeg'
function Card(){
    return (
        <div className="card">
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            <h2 className="card-title">Bill</h2>
            <p className="card-text">Devops and coder</p>
        </div>
    );
}
export default Card;