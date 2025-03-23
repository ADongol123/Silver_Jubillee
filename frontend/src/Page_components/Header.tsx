import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    console.log(isLoggedIn);
    console.log("At handle logout");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-2xl font-bold text-primary">Gather</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/"
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
            <Link to="/login" onSubmit={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
