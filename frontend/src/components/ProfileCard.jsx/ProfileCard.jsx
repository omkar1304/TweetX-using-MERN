import "./profilecard.css";
import Profile from "../../assets/profile.png";

import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../redux/api/userApiSlice";

const ProfileCard = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const { data: currentUser } = useGetUserByIdQuery(userInfo?._id);

  return (
    <div className="profile-card">
      <img src={Profile} alt="profile-image" className="profle-image" />
      <div className="profile-details">
        <h3 className="profile-details--username">{currentUser?.name}</h3>
        <ul className="profile-details--activity">
          <li>Posts: {currentUser?.posts.length}</li>
          <li>Followers: {currentUser?.followers.length}</li>
          <li>Following: {currentUser?.following.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
