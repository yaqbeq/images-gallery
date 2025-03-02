import React from "react";
import { Navbar, Container } from "react-bootstrap";

const navbarStyle = {
  backgroundColor: "#282c34",
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/" className="text-white">
          {title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
