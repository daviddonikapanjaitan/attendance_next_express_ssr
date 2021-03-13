const Post = (props) => {
  return <p>My Post Link params {props.myParams.id}</p>;
};

Post.getInitialProps = ({ query }) => {
  return { myParams: query };
};

export default Post;
