import PropTypes from "prop-types";
function PostSingle({ post }) {
  PostSingle.propTypes = {
    post: PropTypes.shape({
      avatar: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      image: PropTypes.string,
      writeup: PropTypes.string,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  const { avatar, firstName, lastName, image, writeup, id } = post;

  return (
    <>
      <div className="rounded-lg bg-white p-7 shadow-lg">
        <div className="mb-4 flex items-center">
          <img src={avatar} alt="Author" className="mr-2 h-8 w-8 rounded-full" />
          <div>
            <p className="text-sm text-gray-600">
              {firstName} {lastName}
            </p>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
        </div>
        {image && <img src={image} alt="Post" className="mb-4 w-full rounded-lg" />}
        <h2 className="mb-2 text-2xl font-bold">Description</h2>
        <p className="text-gray-700">{writeup}</p>
      </div>
    </>
  );
}

export default PostSingle;
