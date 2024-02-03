import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthImage from "../../assets/auth.png";
import Brand from "../../components/Brand/Brand";
import AuthButton from "../../components/AuthButton/AuthButton";
import MainButton from "../../components/MainButton/MainButton";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import CustomToaster from "../../components/CustomToaster/CustomToaster";
import capitalizeName from "../../utils/capitalizeName";
import dataURItoBlob from "../../utils/dataURItoBlob";
import Profile from "../../assets/profile.png";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.auth);

  // To prevent logged in user from accessing below page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({
          dataURL: reader.result,
          name: file.name, 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return null;
    }

    data.name = capitalizeName(data.name);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (selectedImage) {
        formData.append(
          "image",
          dataURItoBlob(selectedImage.dataURL),
          selectedImage.name
        );
      }
      const res = await register(formData).unwrap();
      dispatch(setCredentials(res));
      toast.success(`Welcome to TweetX ${res?.name}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  };

  return (
    <div className="container">
      <CustomToaster />
      <div className="register-section">
        <div className="register-form-section">
          <div className="brand-div">
            <Brand />
          </div>
          <h2 className="form-heading--regitser">Create Account</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="profile" className="form-image--label">
              <img
                src={selectedImage?.dataURL || Profile}
                alt="profile-image"
              />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="image"
              id="profile"
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={onChangeData}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={onChangeData}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={onChangeData}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={onChangeData}
            />
            <div className="register-link-section">
            <Link className="login-link" to="/login">Already have an account?<span> Sign in</span></Link>
            <MainButton value="Sign up" className="custom-main-button-class" />
            </div>
          </form>
        </div>
        <img src={AuthImage} alt="auth-image" className="form-image" />
      </div>
    </div>
  );
};

export default SignUp;
