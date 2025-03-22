import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Groups from "./pages/groups.tsx";
import ProfilePage from "./pages/profile.tsx";
import EventDetailPage from "./pages/eventDetails.tsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/eventDetail" element={<EventDetailPage />} />
    </Routes>
  );
}

export default App;
