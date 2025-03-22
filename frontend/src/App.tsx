import { Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Groups from "./pages/groups.tsx"
import ProfilePage from "./pages/profile.tsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
