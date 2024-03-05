import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "./RegistrationForm.css";

function RegistrationForm() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineFormData, setOfflineFormData] = useState(null);
  console.log("isOnline", isOnline);

  async function appendOfflineDataToCloud(user) {
    try {
      await axios.post(
        // "https://schrodingers-signup-backend.vercel.app/api/user/signup",
        "http://localhost:5000/api/user/signup",
        user
      );
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("offlineFormData")) || [];
    if (data && data.length > 0) {
      data.forEach((user) => {
        appendOfflineDataToCloud(user);
      });

      // Remove all processed user data from the array
      localStorage.setItem("offlineFormData", JSON.stringify([]));
    }
  }, [isOnline]);

  useEffect(() => {
    const checkOnlineStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
    };

    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    // Check connection status on initial load
    const initialConnectionStatus = navigator.onLine;
    setIsOnline(initialConnectionStatus);

    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, [offlineFormData]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      DOB: "",
      gender: "",
      Class: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First Name should not start with a number")
        .required("First Name is required"),
      lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Last Name should not start with a number")
        .required("Last Name is required"),
      DOB: Yup.date().nullable(),
      gender: Yup.string(),
      Class: Yup.string(),
      phoneNumber: Yup.string().matches(
        /^[0-9]{10}$/,
        "Phone Number must be exactly 10 digits"
      ),
      //   .required('Phone Number is required'),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        if (isOnline) {
          await axios.post(
            // "https://schrodingers-signup-backend.vercel.app/api/user/signup",
            "http://localhost:5000/api/user/signup",
            values
          );
          alert("User registered successfully");
          formik.resetForm();
        } else {
          const data =
            JSON.parse(localStorage.getItem("offlineFormData")) || [];
          data.push(values);
          localStorage.setItem("offlineFormData", JSON.stringify(data));
          setOfflineFormData(values);
          alert("User registered offline. Data will be submitted once online.");
          formik.resetForm();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    },
  });

  return (
    <MDBContainer >
      <MDBRow className=" overflowFix justify-content-center align-items-center m-5 m-md-2 m-sm-0">
        <MDBCard>
          <MDBCardBody className="px-4">
            <h3 style={{color:"#0468aa"}} className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center   ">
              Registration Form
            </h3>fluid
            <p style={{ textAlign: "center" }}>
              {isOnline ? (
                <span style={{ color: "green" }}>&#8226; Online</span>
              ) : (
                <span style={{ color: "red" }}>&#8226; Offline</span>
              )}
            </p>
            <form onSubmit={formik.handleSubmit}>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    size="lg"
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error-text">{formik.errors.firstName}</div>
                  ) : null}
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    size="lg"
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error-text">{formik.errors.lastName}</div>
                  ) : null}
                </MDBCol>
              </MDBRow>

              {isOnline ? (
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Birthday"
                      size="lg"
                      id="DOB"
                      type="date"
                      {...formik.getFieldProps("DOB")}
                    />
                    {formik.touched.DOB && formik.errors.DOB ? (
                      <div className="error-text">{formik.errors.DOB}</div>
                    ) : null}
                  </MDBCol>
                  <MDBCol md="6" className="mb-4">
                    <h6 className="fw-bold">Gender: </h6>
                    <MDBRadio
                      name="gender"
                      id="femaleRadio"
                      value="Female"
                      label="Female"
                      inline
                      onChange={() => formik.setFieldValue("gender", "Female")}
                      checked={formik.values.gender === "Female"}
                    />
                    <MDBRadio
                      name="gender"
                      id="maleRadio"
                      value="Male"
                      label="Male"
                      inline
                      onChange={() => formik.setFieldValue("gender", "Male")}
                      checked={formik.values.gender === "Male"}
                    />
                    <MDBRadio
                      name="gender"
                      id="otherRadio"
                      value="Other"
                      label="Other"
                      inline
                      onChange={() => formik.setFieldValue("gender", "Other")}
                      checked={formik.values.gender === "Other"}
                    />
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="error-text">{formik.errors.gender}</div>
                    ) : null}
                  </MDBCol>
                </MDBRow>
              ) : null}

              {isOnline ? (
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Class"
                      size="lg"
                      id="Class"
                      type="text"
                      {...formik.getFieldProps("Class")}
                    />
                    {formik.touched.Class && formik.errors.Class ? (
                      <div className="error-text">{formik.errors.Class}</div>
                    ) : null}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Phone Number"
                      size="lg"
                      id="phoneNumber"
                      type="rel"
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="error-text">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>
              ) : null}

              <MDBRow>
                <MDBCol md="6">
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
                </MDBCol>
                <MDBCol md="6">
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
                </MDBCol>
              </MDBRow>
              <MDBBtn className="mb-4" size="lg" type="submit">
                Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegistrationForm;
