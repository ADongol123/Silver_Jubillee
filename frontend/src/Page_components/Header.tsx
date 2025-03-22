import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          {/* <Link
            to="/events"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Events
          </Link> */}
          <Link
            to="/groups"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Groups
          </Link>
          <Link to="/profile" className="text-lg font-medium text-primary">
            My Profile
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
