import "./poststab.css";
import { useGetAllUserPostsQuery } from "../../redux/api/postApiSlice";
import PostCard from "../PostCard/PostCard";
import Loader from "../../components/Loader/Loader";

const PostsTab = () => {
  const { data: posts, isLoading } = useGetAllUserPostsQuery();

  return (
    <div className="post-tab--section">
      {isLoading ? (
        <Loader />
      ) : (
        posts?.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })
      )}
    </div>
  );
};

export default PostsTab;
