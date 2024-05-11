import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect , useState} from 'react';
import { getJWTToken } from './utils/utils';
import AddMessage from './pages/AddMessage';

function App() {
  const [tokenState, setTokenState] = useState(null);

  useEffect(() => {
    const jwtToken = getJWTToken();

    if(!jwtToken) {
      setTokenState(null)
    }

    setTokenState(jwtToken);
  }, [])

  return (
    <BrowserRouter>
    {tokenState && <Header/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-message' element={<AddMessage/>} />
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
