import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminlogout } from "../../redux/redux";
function AdminNav() {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Admin Pannel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#">Admin</Nav.Link>
          </Nav>
          <Form className="d-flex float-right">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            
          >
          </Nav>
              <Button
                onClick={() => {
                  dispatch(adminlogout())
                  localStorage.removeItem("access_token")
                  localStorage.removeItem('refresh_token')
                  navigate("/admin")
                }}
                variant="outline-success"
              >
                Logout
              </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
