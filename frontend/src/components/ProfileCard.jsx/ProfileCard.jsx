import "./profilecard.css";
import Profile from "../../assets/profile.png";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery, useLogoutMutation } from "../../redux/api/userApiSlice";
import { unSetCredentials } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoIosLogOut } from "react-icons/io";

const ProfileCard = () => {

  const { profileId } = useParams();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { data: userProfile } = useGetUserByIdQuery(profileId);
  const { userInfo } = useSelector((store) => store.auth);
  const [ logout ] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      disptach(unSetCredentials());
      navigate("/login");

    } catch (error) {
      console.error(error)
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className="profile-card">
      <img src={Profile} alt="profile-image" className="profle-image" />
      <div className="profile-details">
       {userInfo?._id === userProfile?._id && (
         <IoIosLogOut className="logout-icon" onClick={handleLogout}/>
       )}
        <h3 className="profile-details--username">{userProfile?.name}</h3>
        <ul className="profile-details--activity">
          <li>Posts: {userProfile?.posts.length}</li>
          <li>Followers: {userProfile?.followers.length}</li>
          <li>Following: {userProfile?.following.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
