import { useRef, useState } from "react";
import MainButton from "../MainButton/MainButton";
import "./createpostmodal.css";
import { GrClose } from "react-icons/gr";

import toast from "react-hot-toast";
import { useCreatePostMutation } from "../../redux/api/postApiSlice";
import Loader from "../Loader/Loader";

import CustomToaster from "../CustomToaster/CustomToaster";

const CreatePostModal = ({ onCloseModal, setPosts }) => {
  const outerRef = useRef(null);
  const [content, setContent] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createPost({ content });
      toast.success("Your post has been published!");
      onCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.data);
    }
  };

  const handleOuterClose = (e) => {
    if (outerRef.current === e.target) {
      onCloseModal();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      ref={outerRef}
      className="modal-container flex-row-center scale-up-center"
      onClick={handleOuterClose}
    >
      <CustomToaster />
      <div className="modal-section">
        <GrClose className="close-icon" onClick={onCloseModal} />
        <h2>Share Your Thoughts!</h2>
        <form
          onSubmit={handleFormSubmit}
          className="post-form flex-column-center"
        >
          <textarea
            name="content"
            id=""
            placeholder="Enter your content here..."
            className="post-area"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <MainButton value="Post" className="custom-main-button-class" />
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
