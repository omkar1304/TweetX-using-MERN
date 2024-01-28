import { useState } from "react";
import FollowersTab from "../FollowersTab/FollowersTab";
import FollowingTab from "../FollowingTab/FollowingTab";
import PostsTab from "../PostsTab/PostsTab";
import "./activitycard.css";

const ActivityCard = () => {
  const [setlectedTab, setSelectedTab] = useState(1);

  return (
    <div className="activity-card">
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
    </div>
  );
};

export default ActivityCard;
