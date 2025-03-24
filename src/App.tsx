import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ErrorPage from './ErrorPage'
import Home from './Home'
import NormalGame from './NormalGame'
import EasyGame from './EasyGame'
import Rules from './Rules'
import HighScores from './HighScores'

function App() {
  return (
    <BrowserRouter>
      <div className='navigation-bar'>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/game/normal">Normal Game</Link>
        <Link className="nav-link" to="/game/easy">Easy Game</Link>
        <Link className="nav-link" to="/rules">Rules</Link>
        <Link className="nav-link" to="/highscores">High Scores</Link>
      </div>
      <div className='route-content-container'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/game/normal' element={<NormalGame />}></Route>
          <Route path='/game/easy' element={<EasyGame />}></Route>
          <Route path='/rules' element={<Rules />}></Route>
          <Route path='/highscores' element={<HighScores />}></Route>
          <Route path='*' element={<ErrorPage errCode={404} message='The page does not exist'/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
