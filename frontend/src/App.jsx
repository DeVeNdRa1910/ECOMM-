
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Forgot from './pages/Forgot';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main className='min-h-[130vh] mt-[16vh]'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/forgotpassword' element={<Forgot/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
