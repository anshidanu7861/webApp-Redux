import React from "react";
import Button from "react-bootstrap/Button";
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,} from "mdb-react-ui-kit";
import "./login.css";
import { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminlogin, login, setAccess, setrefresh } from "../../redux/redux";

function Login(props) {
    const [error,setError]=useState(null)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const admin=()=>{
      const data={
        email,
        password
      }
    axios.post('/admin',data).then((response)=>{
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token',response.data.refreshToken)
      dispatch(adminlogin({email}))
      dispatch(setAccess({access_token:response.data.accessToken}))
      navigate('/adminpanel')
        alert('login Succesfull')
    }).catch((err)=>{
      setError(err.response.data.error)
    })
    }
    const userlogin=()=>{
      const data={
        email,
        password
      }
      axios.post('/login',data).then((response)=>{
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token',response.data.refreshToken)
        dispatch(login({id:response.data.user._id,name:response.data.user.name,email:response.data.user.email,jwt:response.data.accessToken}))
        dispatch(setAccess({access_token:response.data.accessToken}))
        navigate('/')
      }).catch((err)=>setError(err.response.data.error))
    }
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">{props.Admin?'Admin Login':'Login'}</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              {error&&<p className="fw-bold">
                {error}
              </p>}

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button variant="primary"
              onClick={props.Admin?admin:userlogin}>Login</Button>
              <div>
                {props.Admin?'':<p className="mb-0">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
