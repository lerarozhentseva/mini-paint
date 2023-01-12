import React, {FC} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import PaintPage from './pages/paint/PaintPage';
import ProfilePage from './pages/profile-page/ProfilePage';

const App: FC = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegistrationPage/>}/>
                <Route path='/paint' element={<PaintPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
