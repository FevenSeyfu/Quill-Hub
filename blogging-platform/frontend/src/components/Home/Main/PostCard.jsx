import React from 'react';

const PostCard = ({ post }) => {
  const { title, author, date, votes, description, imageUrl, tag } = post;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl  relative">
      <div className="absolute top-0 left-0 bg-soft-orange text-white px-2 py-1 m-2 rounded-lg">
        {post.tag}
      </div>
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 py-4">
        <div className="post-meta flex flex-col sm:flex-row">
          <p className="text-gray-500 text-sm mr-2">
            By: {author}
          </p>
          <p className="text-gray-500 text-sm mr-2">
            Date: {date}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="mr-1">❤️</span>
            {votes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
