import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
