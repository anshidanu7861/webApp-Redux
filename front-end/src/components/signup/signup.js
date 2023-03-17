import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup(props) {
  const [error,setError]=useState(null)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const submitForm = (data) => {
    axios.post("/signup", data).then(() => {
      props.Admin?navigate('/adminpanel'):navigate('/login')
    }).catch((err)=>{
      setError(err.response.data.error)
    })
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                <p className="text-white-50 mb-5">{props.Admin?"Add a user":"Create an Account"}</p>
              {error&&<p className="fw-bold">
                {error}
              </p>}


                {errors.name && <p>Fisrtname {errors.name.type}</p>}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  {...register("name", { required: true, minLength: 4 })}
                />
                {errors.email && <p>email {errors.email.type}</p>}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.password && <p>Password {errors.password.type}</p>}

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  {...register("password", {
                    required: true,
                  })}
                />
                <Button
                  variant="primary"
                  // onClick={submitForm}
                  type="submit"
                >
                  Signup
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Signup;
