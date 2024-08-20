import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/index";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CreateProfilePage from "./pages/CreateProfile";
import NotFoundPage from "./pages/NotFound";
import AccountPage from "./pages/Account";
import InspirationPage from "./pages/Inspiration";
import JournalPage from "./pages/Journal";
import Classroom from "./pages/Classroom";
import MainLayout from "./MainLayout";
import TestAuth from "./pages/TestAuth";

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              }
            />
            <Route path="/create-profile" element={<CreateProfilePage />} />
            <Route
              path="/account"
              element={
                <MainLayout>
                  <AccountPage />
                </MainLayout>
              }
            />
            <Route
              path="/inspiration"
              element={
                <MainLayout>
                  <InspirationPage />
                </MainLayout>
              }
            />
            <Route
              path="/journal"
              element={
                <MainLayout>
                  <JournalPage />
                </MainLayout>
              }
            />
            <Route
              path="/classroom"
              element={
                <MainLayout>
                  <Classroom />
                </MainLayout>
              }
            />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
