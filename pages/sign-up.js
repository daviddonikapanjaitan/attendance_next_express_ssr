import Header from '../components/Header';

const SignUp = (props) => {
  return (
    <>
      <Header />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Sign-Up Page</div>
          <form method="POST" action="/api/user-role">
            <input
              type="text"
              id="name"
              className="fadeIn second"
              name="name"
              placeholder="Full Name"
            />
            <input
              type="email"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="Email"
            />
            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="username"
              placeholder="Username"
            />
            <input
              type="password"
              id="password"
              className="fadeIn second"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              id="password2"
              className="fadeIn second"
              name="password2"
              placeholder="Confirm Password"
            />
            <input
              type="number"
              id="phone_number"
              className="fadeIn second"
              name="phone_number"
              placeholder="Phone Number"
            />
            <p>
              <div>{props.myParams.msg}</div>
            </p>
            <input type="submit" className="fadeIn fourth" value="Sing Up" />
          </form>
        </div>
      </div>
    </>
  );
};

SignUp.getInitialProps = ({ query }) => {
  return { myParams: query };
};

export default SignUp;
