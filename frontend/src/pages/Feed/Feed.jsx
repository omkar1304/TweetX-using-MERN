import "./feed.css";
import MainButton from "../../components/MainButton/MainButton";
import Empty from "../../assets/empty.png";
import { BiSolidEdit } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import PostCard from "../../components/PostCard/PostCard";

import { useGetAllPostsFromFollowingQuery } from "../../redux/api/postApiSlice";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import CustomToaster from "../../components/CustomToaster/CustomToaster";

const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: posts,
    isLoading,
    refetch,
  } = useGetAllPostsFromFollowingQuery();


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className="container">
      <CustomToaster />
      {isModalOpen && <CreatePostModal onCloseModal={handleCloseModal} />}
      <div className="feed-section">
        <div className="create-post--button" onClick={handleOpenModal}>
          <MainButton value="Write" className="custom-main-button-class">
            <BiSolidEdit size={15} />
          </MainButton>
        </div>
        {isLoading ? (
          <Loader />
        ) : posts?.length === 0 ? (
          <div className="no-post-section flex-column-center">
            <img src={Empty} alt="no-posts" className="no-post--img" />
            <p className="no-post--text flex-row-center">
              Ready to Share? Make Your Post!{" "}
              <FaTwitter className="no-post--icon" />{" "}
            </p>
          </div>
        ) : (
          posts.map((post, index) => {
            return <PostCard key={index} post={post} />;
          })
        )}
      </div>
    </section>
  );
};

export default Feed;
