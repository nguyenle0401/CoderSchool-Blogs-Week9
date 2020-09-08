import React from "react";
import { Nav, Navbar, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const handleLogout = (event) => {
    //Handle logout event here
    console.log(event);
    dispatch(authActions.logout());
  };

  const loginWithFacebook = (response) => {
    console.log(response);
    dispatch(authActions.loginFace(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    console.log("mi", response);
    console.log("ahihi", response.accessToken);
    dispatch(authActions.loginGoogle(response.accessToken));
  };

  const authLink = (
    <Nav>
      <Nav.Link as={Link} to="/dashboard">
        <i className="fas fa-chart-line" /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/">
        <i className="fas fa-sign-out-alt" /> Homepage
      </Nav.Link>
      <Nav.Link as={Link} to="/" onClick={(event) => handleLogout(event)}>
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  );

  const publicLink = (
    <div>
      <Nav>
        <Nav.Link as={Link} to="/register">
          <i className="fas fa-registered" /> Register
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          <i className="fas fa-sign-in-alt" /> Login
        </Nav.Link>
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
      </Nav>
    </div>
  );
  return (
    <div>
      <Navbar fixed="top" className="Navbar-style">
        <Navbar.Brand
          as={Link}
          to="/"
          className="mr-auto d-flex align-items-center"
        >
          <img
            width="100px"
            height="50px"
            src="https://cdn.discordapp.com/attachments/732068987206107267/741964605080862740/hinh-cut-em.png"
            alt="T-Blog"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authLink : publicLink}</>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default PublicNavbar;
