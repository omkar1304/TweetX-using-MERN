import "./signin.css";

import { Link, useNavigate } from "react-router-dom";

import AuthImage from "../../assets/auth.png";
import Brand from "../../components/Brand/Brand";
import AuthButton from "../../components/AuthButton/AuthButton";
import MainButton from "../../components/MainButton/MainButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import CustomToaster from "../../components/CustomToaster/CustomToaster";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isOpened, setIsOpened] = useState(false);
  const passwordRef = useRef(null);
  const [ login ] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth);

  // To prevent logged in user from accessing below page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);


  const handlePasswordClick = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";

    setIsOpened(!isOpened);
  };

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      toast.success(`Welcome back! ${res?.name}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }

  };

  return (
    <div className="container">
      <CustomToaster />
      <div className="brand-div">
            <Brand />
          </div>
      <div className="login-section">
        <div className="form-section">
          <h2 className="form-heading--login">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={onChangeData}
            />
            <div className="input-password">
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                name="password"
                value={data.password}
                onChange={onChangeData}
              />
              {isOpened ? (
                <FaEyeSlash
                  color="#AAABAB"
                  className="icon-eye"
                  onClick={handlePasswordClick}
                />
              ) : (
                <FaEye
                  color="#AAABAB"
                  className="icon-eye"
                  onClick={handlePasswordClick}
                />
              )}
            </div>
            <div className="login-link-section">
              <Link className="register-link" to="/register">Don't have an account?<span> Sign up</span></Link>
              <MainButton value="Sign up" className="custom-main-button-class" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
