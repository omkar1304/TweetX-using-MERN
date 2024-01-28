import './followingtab.css'
import { useParams } from "react-router-dom";
import { useGetProfileFollowingQuery } from "../../redux/api/userApiSlice";

import FollowCard from "../FollowCard/FollowCard";
import Loader from "../Loader/Loader";

const FollowingTab = () => {

  const { profileId } = useParams();
  const { data: following, isLoading } = useGetProfileFollowingQuery(profileId);

  return (
    <div className="followers-tab--section">
      {isLoading ? (
        <Loader />
      ) : (
        following?.map((singleFollowing) => {
          return <FollowCard key={singleFollowing._id} user={singleFollowing} isTab={true}/>;
        })
      )}
    </div>
  )
}

export default FollowingTab