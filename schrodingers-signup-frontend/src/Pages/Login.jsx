// import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  // MDBCheckbox,
  MDBBtn,
  // MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "../Styles/RegistrationForm.css";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        // if (isOnline) {
        await axios.post(
          "https://schrodingers-signup-backend.vercel.app/api/user/login",
          values
        );
        Toaster.success("User logged in successfully");
        formik.resetForm();
      } catch (error) {
        console.error("Error:", error);
        const errorMessage = error?.response?.data?.error || "An error occurred. Please try again later.";
        Toaster.error(errorMessage);
      }
    },
  });

  return (
    <>
    <MDBContainer
      data-aos="fade-down"
      className="p-3 my-5 d-flex flex-column bg-white rounded-5 loginMediaquery background"
    >
      <h3
        style={{ color: "#0468aa" }}
        className="fw-bold mb-4 mt-3 pb-2 pb-md-0 mb-md-5 text-center"
      >
        Login Form
      </h3>
      <form onSubmit={formik.handleSubmit} className="background">
        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          size="lg"
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-text">{formik.errors.email}</div>
        ) : null}

        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          size="lg"
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-text">{formik.errors.password}</div>
        ) : null}

        <MDBBtn className="mb-4 fullWidthBtn" size="lg" type="submit">
          Submit
        </MDBBtn>
      </form>
      <div className="text-center">
        <p>
          Not registered yet?{" "}
          <a
            href="#!"
            className="text-decoration-none"
            onClick={() => {
              navigate("/");
            }}
          >
            Register
          </a>
        </p>
      </div>
    </MDBContainer>
      <Toaster/>
      </>
  );
}

export default Login;
