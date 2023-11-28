import "./navbar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react"; // Import useState
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control modal visibility

  const handleLogout = () => {
    // Dispatch the logout action to update the state
    dispatch({ type: "logout" });
    setShowLogoutModal(false); // Close the modal after logout
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <img src={Logo} alt="" className="logo_img" />
        </Link>
        {user ? (
          <div className="navItems">
            <span
              className="navUsername"
              onClick={() => setShowLogoutModal(true)}
            >
             {user.username}
            </span>
            {showLogoutModal && (
              <div className="logoutModal">
                <p>Are you sure you want to logout?</p>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
