import React, { useState } from "react";
import "./login.css";
import { Redirect, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { authActions } from "../../redux/actions/auth.actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
//LoginPage (statefull component)
const LoginPage = () => {
  //Call action to redux store
  const dispatch = useDispatch();

  //Global states: get from redux (with attribute auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  //Local state: store user's input information (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Local state: store errors of email and password
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //Update local state (formData and errors) when user is typing
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };
  //Login with Facebook
  const loginWithFacebook = (response) => {
    console.log(response);
    dispatch(authActions.loginFace(response.accessToken));
  };
  //Login with Google
  const loginWithGoogle = (response) => {
    console.log("mi", response);
    console.log("ahihi", response.accessToken);
    dispatch(authActions.loginGoogle(response.accessToken));
  };
  //Call Middleware and then send action to redux reducer when user clicks submit
  const handleSubmit = (event) => {
    //Prevent the page from reloading
    event.preventDefault();

    //Get the email and password from local state formData
    const { email, password } = formData;

    //Set errors if user leaves any input blank
    if (!email) {
      setErrors({ ...errors, email: "Please fill out email" });
      return;
    }
    if (!password) {
      setErrors({ ...errors, password: "Please fill out password" });
      return;
    }

    //Call Middleware and then send action to redux reducer
    dispatch(authActions.loginRequest({ email, password }));
  };

  //Redirect to homepage whenever user is authenticated
  if (isAuthenticated) return <Redirect to="/"></Redirect>;

  return (
    <Container className="bg-login">
      <div className="col-login">
        <div className="style-row-quote">
          <h1 className="style-quote">
            “Traveling – it leaves you speechless, then turns you into a
            storyteller.”
          </h1>
        </div>
        <div className="style-form-login">
          <Form onSubmit={handleSubmit} className="form-login">
            <div className="text-center mb-3">
              <h1 className="text-primary" style={{ fontSize: "25px" }}>
                Sign In
              </h1>
            </div>
            <div>
              <Form.Group>
                <Form.Control
                  type="email"
                  required
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="form-text text-danger">
                    {errors.email}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="3"
                />
                {errors.password && (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </Form.Group>

              {loading ? (
                <Button
                  className="btn-block"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </Button>
              ) : (
                <Button className="btn-block" type="submit" variant="success">
                  Login
                </Button>
              )}
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
              <div className="style-fb">
                <Modal.Dialog>
                  <FacebookLogin
                    appId="215525599776984"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={loginWithFacebook}
                  />
                </Modal.Dialog>
                <Modal.Dialog>
                  <GoogleLogin
                    // clientId="958267965643-ejgf0b8m4ccg4151lsaop2kk68kvb8ts.apps.googleusercontent.com"
                    clientId="958267965643-kunr111c014g7paltvuvc939np6jnggt.apps.googleusercontent.com"
                    onSuccess={loginWithGoogle}
                    onFailure={(e) => console.log(e)}
                  />
                </Modal.Dialog>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
