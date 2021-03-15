import Header from '../../components/Header';

const Login = (props) => {
  // return <p>Login Page {props.myParams.id}</p>;
  return (
    <>
      <Header />
      {/* <p>Value: {props.message.msg}</p> */}
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Login Page</div>
          <form method="POST" action="/api/user-validation">
            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="username"
              placeholder="username"
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
            <p className="text-success">{props.message.msg}</p>
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
            <br />
            <a className="underlineHover" href="/sign-up">
              Don't have account ? Please sign up.
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

Login.getInitialProps = ({ query }) => {
  return { message: query };
};

export default Login;
