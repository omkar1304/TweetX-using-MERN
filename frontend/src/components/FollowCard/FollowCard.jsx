import "./followcard.css";
import Profile from "../../assets/profile.png";
import toast from "react-hot-toast";
import {
  useUserFollowMutation,
  useUserUnfollowMutation,
  useGetUserByIdQuery,
} from "../../redux/api/userApiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const FollowCard = ({ user, isTab }) => {
  const [isFollowing, SetIsFollowing] = useState(true);
  const { userInfo } = useSelector((store) => store.auth);
  const { data: loggedinUser } = useGetUserByIdQuery(userInfo?._id);
  const navigate = useNavigate();

  useEffect(() => {
    SetIsFollowing(loggedinUser?.following?.includes(user._id));
  }, [loggedinUser]);

  const [follow] = useUserFollowMutation();
  const [unfollow] = useUserUnfollowMutation();

  const handleFollowActivity = async () => {
    try {
      let res;
      if (isFollowing) {
        res = await unfollow(user._id).unwrap();
      } else {
        res = await follow(user._id).unwrap();
      }
      toast.success(res.message);
      SetIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  };

  return (
    <div className={`follow-card ${isTab ? "tab-custom" : ""}`}>
      <div className="user-details--section">
        <img src={Profile} alt="profile" className="profile-image" />
        <div className="user-details">
          <h3 className="user-details--username" onClick={() => navigate(`/profile/${user?._id}`)}>{user.name}</h3>
          <div className="follow-section">
            <p className="user-details--following">
              Following: {user.following.length}
            </p>
            <p className="user-details--followers">
              Followers: {user.followers.length}
            </p>
          </div>
        </div>
      </div>
      {user._id !== loggedinUser?._id && (
        <button
          className={`toggle-button ${
            isFollowing ? "unfollow-button" : "follow-button"
          } flex-row-center`}
          onClick={handleFollowActivity}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowCard;
