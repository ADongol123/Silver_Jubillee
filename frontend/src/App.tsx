import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Groups from "./pages/groups";
import ProfilePage from "./pages/profile";
import EventDetailPage from "./pages/eventDetails";
import GroupChat from "./pages/groupChat";
import EventsPage from "./pages/events";
import CreateGroupPage from "./pages/createGroup";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";
import LandingPage from "./pages/landing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Check if the authToken exists in localStorage
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, [authToken]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/groups"
        element={isAuthenticated ? <Groups /> : <Navigate to="/login" />}
      />
      <Route
        path="/groupchat/:id"
        element={isAuthenticated ? <GroupChat /> : <Navigate to="/login" />}
      />
      <Route
        path="/creategroupchat"
        element={
          isAuthenticated ? <CreateGroupPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/events"
        element={isAuthenticated ? <EventsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/eventDetail/:id"
        element={
          isAuthenticated ? <EventDetailPage /> : <Navigate to="/login" />
        }
      />

      {/* Redirect any unknown route to the home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
