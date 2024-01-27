import "./authbutton.css";

const AuthButton = ({ className, value }) => {
  return (
    <button className={`auth-button ${className ? className : ""}`}>
      {value}
    </button>
  );
};

export default AuthButton;
