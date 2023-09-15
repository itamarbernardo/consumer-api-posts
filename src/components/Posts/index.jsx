import './styles.css';

import { PostCard } from '../PostCard';

import P from 'prop-types';

export const Posts = ({ posts = [] }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

//Não precisa passar, pois ja estamos passando como default la em cima
// Posts.defaultProps = {
//   posts: [],
// };

Posts.propTypes = {
  posts: P.array,
};

// Posts.propTypes = {
//   posts: P.arrayOf(
//     P.shape({
//       title: P.string.isRequired,
//       cover: P.string.isRequired,
//       body: P.string.isRequired,
//       id: P.id.isRequired,
//     }),
//   ),
// };
