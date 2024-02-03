import React, { useEffect, useState } from "react";
import "./postcard.css";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { BsThreeDots } from "react-icons/bs";
import Profile from "../../assets/profile.png";
import { useSelector } from "react-redux";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../redux/api/postApiSlice";

const PostCard = ({ post }) => {
  const { content, updatedAt, createdAt, user } = post;
  const [timeAgo, setTimeAgo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [contentData, setContentData] = useState(content);
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);
  const [ deletePost ] = useDeletePostMutation();
  const [ updatePost ] = useUpdatePostMutation();
  const imageURL = `${BACKEND_URL}/uploads/${user?.image}`;

  // To update post timing in every 5 seconds
  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const postDate = new Date(createdAt);

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
  }, [createdAt]);

  const handleEditing = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handlePostDelete = async () => {
    try {
      await deletePost(post._id).unwrap();
      toast.success("Post has been deleted!");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  };

  
  const handlePostUpdate = async () => {
    
    try {
      await updatePost({postId: post?._id, content:contentData}).unwrap();
      setIsEditing(false)
      toast.success("Post has been updated!");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  }

  return (
    <div className="post-card--section scale-up-center">
      <figure>
        <img
          src={user?.image ? imageURL : Profile}
          alt="profile-image"
          className="post-card--image"
        />
      </figure>
      <div className="post-card-detail">
        {user?._id === userInfo?._id && (
          <div className="options-icon">
            {createdAt !== updatedAt && (<p className="edit-text">Edited</p>)}
            <MdOutlineModeEditOutline
              className="options-icons--edit"
              onClick={handleEditing}
            />
            <FiTrash
              className="options-icons--delete"
              onClick={handlePostDelete}
            />
          </div>
        )}
        <h3 onClick={() => navigate(`/profile/${user._id}`)}>{user.name}</h3>
        <h5>{timeAgo}</h5>
        {isEditing ? (
          <div className="update-section">
            <textarea
              value={contentData}
              onChange={(e) => setContentData(e.target.value)}
              className="update-content"
            />
            <button className="update-button" onClick={handlePostUpdate}>Update</button>
          </div>
        ) : (
          <p className="post-card--content">{content}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
