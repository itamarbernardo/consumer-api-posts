import './styles.css';

import P from 'prop-types';

export const PostCard = ({ post }) => {
  return (
    <div className="post" key={post.id}>
      <img src={post.cover} alt={post.title} />

      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: P.array.isRequired,
};
