import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return <div className="home-container">
        <h1 className="home-center">Welcome to Battleship Game!</h1>
        <div className="home-center link-row"><Link className="link" to={"/game/normal"}>Normal Game</Link></div>
        <div className="home-center link-row"><Link className="link" to={"/game/easy"}>Easy Game</Link></div>
        <div className="home-center link-row"><Link className="link" to={"/rules"}>Rules</Link></div>
        <div className="home-center link-row"><Link className="link" to={"/highscores"}>High Scores</Link></div>
    </div>
}