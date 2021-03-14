import Header from '../components/Header';

export default function home() {
  return (
    <>
      <Header />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">Login Page</div>
          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
            />
            <input
              type="text"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
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
}
