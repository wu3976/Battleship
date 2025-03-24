import "./HighScores.css";

const scoredata = [
    { username: "Jason", score: 212 },
    { username: "Anthony", score: 198 },
    { username: "Stephen", score: 172},
    { username: "Ameya", score: 167 },
    { username: "Hayden", score: 165 },
    { username: "Max", score: 154 },
    { username: "Ramanuja", score: 101 },
    { username: "Anirudh", score: 66 },
    { username: "Elliott", score: 35 },
];

export default function HighScores() {
    return <div className="hscore-container">
        <div className="row titlerow">
            <div className="item">User Name</div>
            <div className="item">Scores</div>
        </div>
        {scoredata.map((ele, idx) => <div className="row" key={idx}>
            <div className="item">{ele.username}</div>
            <div className="item">{ele.score}</div>
        </div>)}
    </div>
}