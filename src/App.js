import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Friends from './pages/Friends/Friends';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import './styles/style.scss';
import MyProfile from './pages/MyProfile/MyProfile';
import './utils/i18n';

function App() {
  return (
    <Suspense fallback={'...loading'} className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='friends' element={<Friends/>}/>
          <Route path='myprofile' element={<MyProfile/>}/>


            
        </Route>
      </Routes>
      
    </Suspense>
  );
}

export default App;
