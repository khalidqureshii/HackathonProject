import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
<<<<<<< HEAD
import HomePage from './HomePage'

=======
import PreHome from './pages/PreHome'
import Header from './components/Header'
import DummyHeader from './components/DummyHeader'
>>>>>>> 38b19fa369e391082f3a109e7d9b34c7fff5535d

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<><Home /></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/homepage' element={<HomePage />} />
=======
          <Route path='/' element={<><Header /><PreHome /></>} />
          <Route path='/home' element={<><Header /><Home /></>} />
          <Route path='/login' element={<><DummyHeader /><Login /></>} />
          <Route path='/register' element={<><DummyHeader /><Register /></>} />
          <Route path='/logout' element={<><Header /><Logout /></>} />

          {/* New Addition */}
          {/* <Route path='/connect' element={<><Header /><Connect /></>} /> */}
>>>>>>> 38b19fa369e391082f3a109e7d9b34c7fff5535d
        </Routes>
      </BrowserRouter>
    </>
  );
}

<<<<<<< HEAD
export default App


=======
export default App;
>>>>>>> 38b19fa369e391082f3a109e7d9b34c7fff5535d
