import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Groups from "./pages/groups.tsx";
import ProfilePage from "./pages/profile.tsx";
import EventDetailPage from "./pages/eventDetails.tsx";
import GroupChat from "./pages/groupChat.tsx"
import EventsPage from "./pages/events.tsx";
import CreateGroupPage from "./pages/createGroup.tsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groupchat" element={<GroupChat />} />
      <Route path="/creategroupchat" element={<CreateGroupPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/eventDetail" element={<EventDetailPage />} />
    </Routes>
  );
}

export default App;
