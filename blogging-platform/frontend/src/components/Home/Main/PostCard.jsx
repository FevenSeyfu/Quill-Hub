import React from 'react';

const PostCard = ({ post }) => {
  const { title, author, date, votes, description, imageUrl, tag } = post;

  return (
    <div className="post-card">
      <img src={imageUrl} alt={title} className="post-image" />
      <div className="post-content">
        <h3 className="post-title">{title}</h3>
        <div className="post-meta">
          <p className="meta-item">{`By: ${author}`}</p>
          <p className="meta-item">{`Date: ${date}`}</p>
          <p className="meta-item">{`Votes: ${votes}`}</p>
        </div>
        <p className="post-description">{description}</p>
        <a href="#" className="read-more-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default PostCard;
