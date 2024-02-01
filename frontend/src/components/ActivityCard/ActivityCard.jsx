import { useState, useEffect } from "react";
import FollowersTab from "../FollowersTab/FollowersTab";
import FollowingTab from "../FollowingTab/FollowingTab";
import PostsTab from "../PostsTab/PostsTab";
import "./activitycard.css";
import Follow from "../../assets/follow.png";
import { FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useGetUserByIdQuery } from "../../redux/api/userApiSlice";
import { useUserFollowMutation } from "../../redux/api/userApiSlice";

const ActivityCard = () => {
  const [setlectedTab, setSelectedTab] = useState(1);
  const { profileId } = useParams();
  const { userInfo } = useSelector((store) => store.auth);
  const { data: profile } = useGetUserByIdQuery(profileId);
  const [follow] = useUserFollowMutation();

  const handleFollowActivity = async () => {
    try {
      const res = await follow(profileId).unwrap();
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  };

  return (
    <div className="activity-card">
      {/* if logged in user is following profile user or it its own profile then show else don't */}
      {profile?.followers.includes(userInfo._id) || userInfo?._id === profileId ? (
        <>
          <div className="activity-card--tabs">
            <span
              className={`${setlectedTab === 1 ? "active-tab" : ""}`}
              onClick={() => setSelectedTab(1)}
            >
              Post
            </span>
            <span
              className={`${setlectedTab === 2 ? "active-tab" : ""}`}
              onClick={() => setSelectedTab(2)}
            >
              Followers
            </span>
            <span
              className={`${setlectedTab === 3 ? "active-tab" : ""}`}
              onClick={() => setSelectedTab(3)}
            >
              Following
            </span>
          </div>
          <div className="tab-section">
            {setlectedTab === 1 && <PostsTab />}
            {setlectedTab === 2 && <FollowersTab />}
            {setlectedTab === 3 && <FollowingTab />}
          </div>
        </>
      ) : (
        <div className="not-following--section flex-column-center">
          <div className="not-following--detail ">
            <h3 className="flex-row-center">Follow this account to see their posts! </h3>
            <button
              className="toggle-button follow-button flex-row-center"
              onClick={handleFollowActivity}
            >
              Follow
            </button>
          </div>
          <img src={Follow} alt="follow-image" className="not-following--image"/>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
