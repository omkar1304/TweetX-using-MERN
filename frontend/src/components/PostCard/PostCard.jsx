import React, { useEffect, useState } from "react";
import "./postcard.css";

import Profile from "../../assets/profile.png";

const PostCard = ({ post }) => {
  const { content, updatedAt, user } = post;
  const [timeAgo, setTimeAgo] = useState("");

  // To update post timing in every 5 seconds
  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const postDate = new Date(updatedAt);

      const timeDifferenceInSeconds = Math.floor(
        (currentDate - postDate) / 1000
      );

      const timeAgoString =
        timeDifferenceInSeconds < 60
          ? `${timeDifferenceInSeconds} seconds ago`
          : timeDifferenceInSeconds < 3600
          ? `${Math.floor(timeDifferenceInSeconds / 60)} minute${
              timeDifferenceInSeconds / 60 === 1 ? "" : "s"
            } ago`
          : timeDifferenceInSeconds < 86400
          ? `${Math.floor(timeDifferenceInSeconds / 3600)} hour${
              timeDifferenceInSeconds / 3600 === 1 ? "" : "s"
            } ago`
          : `${Math.floor(timeDifferenceInSeconds / 86400)} day${
              timeDifferenceInSeconds / 86400 === 1 ? "" : "s"
            } ago`;

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();

    const intervalId = setInterval(calculateTimeAgo, 5000);

    return () => clearInterval(intervalId);
  }, [updatedAt]);

  return (
    <div className="post-card--section scale-up-center">
      <figure>
        <img src={Profile} alt="profile-image" className="post-card--image" />
      </figure>
      <div className="post-card-detail">
        <h3>{user.name}</h3>
        <h5>{timeAgo}</h5>
        <p className="post-card--content">{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
