import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = ({ title }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          {title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
