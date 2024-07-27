
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
