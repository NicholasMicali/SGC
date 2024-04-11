import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/index';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CreateProfilePage from './pages/CreateProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/create-profile" element={<CreateProfilePage/>}/>
            <Route component={NotFound} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
