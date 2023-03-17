import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/redux";
function Head() {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const user = useSelector((state) => state.user.value);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="/user">Profile</Nav.Link>
          </Nav>
          <Form className="d-flex float-right">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#">{user.name}</Nav.Link>
          </Nav>
              <Button
                onClick={() => {
                  dispatch(logout())
                  localStorage.removeItem("access_token")
                  localStorage.removeItem('refresh_token')
                  navigate("/login")
                }}
                variant="outline-success"
              >
                logout
              </Button>           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Head;
