import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState } from "react";

import { Row, Col, Alert, Container } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser } from "../../store/actions";

// import images
import logo from "../../assets/images/logo-sm.svg";

import CarouselPage from "../AuthenticationInner/CarouselPage";

const Login = (props) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));
  const [remember, setRemember] = useState(false);
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    debugger;
    dispatch(loginUser(values, props.history));
  };

  const onRemeberChange = (e) => {
    setRemember(e.target.checked);
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Crossleaf - Access Management</title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" />{" "}
                        <span className="logo-txt">Crossleaf</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">
                          Sign in to continue to Crossleaf.
                        </p>
                      </div>
                      <AvForm
                        className="custom-form mt-4 pt-2"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v);
                        }}
                      >
                        {error ? <Alert color="danger">{error}</Alert> : null}
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            value={localStorage.getItem("isRemember")}
                            className="form-control"
                            placeholder="Enter email"
                            type="text"
                            required
                            autoComplete="off"
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            label="Password"
                            name="password"
                            value=""
                            type="password"
                            className="form-control"
                            required
                            placeholder="Enter Password"
                            autoComplete="off"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <div className="mb-3">
                                <AvField
                                  className="form-check-input"
                                  type="checkbox"
                                  id="remember-check"
                                  value={remember}
                                  onChange={onRemeberChange}
                                  name="remember"
                                  label="Remember me"
                                />
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link
                                  to="/auth-recoverpw"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </AvForm>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Crossleaf . Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Crossleaf
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
