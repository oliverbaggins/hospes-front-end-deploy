import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import axiosInstance from "../../axiosInstance";
import Logo from '../../assets/logo2.png'
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "loginStart" });
    try {
      const res = await axiosInstance.post("/auths/login", credentials);
      dispatch({ type: "loginSuccess", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "loginFailure", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="log">
        <Link to="/">
        <img src={Logo} alt="" className="logo_img2" />
        </Link>
      </div>
      <div className="lContainer">
        <span className="lLogin">Login</span>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <Link to="/register">
        <span className="noAcc">Not have an account yet? Register now!</span>
        </Link>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;