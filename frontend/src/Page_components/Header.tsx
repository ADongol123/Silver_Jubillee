import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-2xl font-bold text-primary">AgeTogether</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/home"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Events
          </Link>
          <Link
            to="/groups"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Groups
          </Link>
          <Link to="/profile" className="text-lg font-medium text-primary">
            My Profile
          </Link>
          {isLoggedIn ? (
            <Button onClick={handleLogout} type="button">
              Logout
            </Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
