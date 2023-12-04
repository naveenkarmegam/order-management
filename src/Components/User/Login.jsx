import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/Logo";
import { useFormik } from "formik";
import { login } from "./authService";
import { loginValidationSchema } from "./schema/validationSchema";


const Login = () => {

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, reset) => {
      try {
        await login(values.email, values.password);
        console.log(values)
        reset.resetForm();
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.message);
        formik.setErrors({ general: 'Invalid username or password' })
      }
    },

  });
  return (
    <div className="kvnkjabvav vh-100">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="d-flex justify-content-center user-heading">

                        <Logo width={60} height={60} className='me-3 fill-orange' />
                        <h1 className='text-center  h1'>
                          ADUDU
                        </h1>
                      </div>

                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={formik.handleSubmit} >
                        {formik.errors.general && (
                          <div className="alert alert-danger" role="alert">
                            {formik.errors.general}
                          </div>
                        )}
                        <div className="form-group">
                          <input
                            className={`form-control form-control-user ${ formik.touched.email &&
                            formik.errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {
                            formik.touched.email && formik.errors.email && (
                              <span className="d-block ms-3 text-danger small invalid-feedback">{formik.errors.email}</span>
                            )
                          }
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={`form-control form-control-user ${ formik.touched.password &&
                            formik.errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {
                            formik.touched.password && formik.errors.password && (
                              <span className="d-block ms-3 text-danger small invalid-feedback">{formik.errors.password}</span>
                            )
                          }
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                        <a href="..." className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Login with Google
                        </a>
                        <a href="..." className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                        </a>
                        <hr />
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to={"/forgot-password"}>
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to={"/register"}>
                          Create an Account!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
  );
};

export default Login;
