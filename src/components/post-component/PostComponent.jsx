import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSingle from "../post/Post";
import { ServiceAPI } from "../../services/apiHelper/apiService";

function PostComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let response = await ServiceAPI.getPosts();
      if (response) {
        setPosts(response);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
        <h1 className="mb-7 text-4xl font-bold">Posts</h1>
        <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.length ? (
            posts.map((post) => {
              return <PostSingle key={post.id} post={post} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PostComponent;
