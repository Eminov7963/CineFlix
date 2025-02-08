import { Route, Routes } from 'react-router-dom';
import './App.css'
import Mainlayout from './layouts/MainLayout';
import Home from './pages/Client/Home';
import Login from './pages/Auth/Login';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Mainlayout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
