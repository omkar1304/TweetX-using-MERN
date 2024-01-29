import "./followerstab.css";
import { useParams } from "react-router-dom";
import { useGetProfileFollowersQuery } from "../../redux/api/userApiSlice";

import FollowCard from "../FollowCard/FollowCard";
import Loader from "../Loader/Loader";

const FollowersTab = () => {
  const { profileId } = useParams();
  const { data: followers, isLoading } = useGetProfileFollowersQuery(profileId);

  return (
    <div className="followers-tab--section">
      {isLoading ? (
        <Loader />
      ) : (
        followers?.map((follower) => {
          return <FollowCard key={follower._id} user={follower} isTab={true} />;
        })
      )}
    </div>
  );
};

export default FollowersTab;
