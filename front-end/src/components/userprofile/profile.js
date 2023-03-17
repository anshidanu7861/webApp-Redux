import React, { useEffect, useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

import axios from "../../axios/axios";
import FormData from "form-data";
import { useSelector } from "react-redux";

export default function Profile() {
  const [img, setImg] = useState("")
  const [userImg,setUserImg]=useState('')
  const id = useSelector((state) => state.user.value.id)
  const fileinput=useRef(null)
  const uploadimg = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", img);
    axios
      .post("/upload/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem(`${id}`, response.data);
        setImg(response.data);
        fileinput.current.value=null
        alert('image updated')
      })
      .catch((err) => console.log(err));
  };
  const navigate = useNavigate();
  useEffect(() => {
    setImg(localStorage.getItem(`${id}`));
    axios
      .get("/user/"+id)
      .then((response) => {
        setUserImg(response.data.img)
      })
      .catch((err) => {
        navigate("/")
      });
  },[setImg])

  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src={userImg?userImg:''}
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <form onSubmit={(e) => uploadimg(e)}>
                      <input
                      ref={fileinput}
                      required
                        type="file"
                        className="form-control"
                        name="img"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        onChange={(e) =>{
                          setUserImg(URL.createObjectURL(e.target.files[0]))
                          setImg(e.target.files[0])
                        } 
                      }
                      />
                      <button
                        className="btn btn-outline-secondary m-5"
                        type="submit"
                        id="inputGroupFileAddon04"
                      >
                        Update
                      </button>
                      
                    </form>
                      <button
                        className="btn btn-outline-secondary m-5"
                        id="inputGroupFileAddon04"
                        onClick={()=>navigate('/')}
                      >
                        Go back
                      </button>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
