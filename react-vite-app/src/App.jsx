import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/index';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CreateProfilePage from './pages/CreateProfile';
import NotFoundPage from './pages/NotFound';
import AccountPage from './pages/Account';
import InspirationPage from './pages/Inspiration';
import JournalPage from './pages/Journal';
import Classroom from './pages/Classroom';

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/create-profile" element={<CreateProfilePage/>}/>
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/inspiration" element={<InspirationPage/>}/>
            <Route path="/journal" element={<JournalPage/>}/>
            <Route path="/classroom" element={<Classroom/>}/>
            <Route path="" element={<NotFoundPage/>}/>
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
