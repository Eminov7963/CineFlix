import { Route, Routes } from 'react-router-dom';
import './App.css'
import Mainlayout from './layouts/MainLayout';
import Home from './pages/Client/Home';

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Mainlayout/>}>
            <Route index element={<Home/>}/>

          </Route>
        </Routes>
    </>
  )
}

export default App
