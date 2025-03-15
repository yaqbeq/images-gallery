import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Searchbar = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Search for new image..."
                />
              </Col>
              <Col xs={3}>
                <Button variant="primary" type="submit">
                  Search again
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Searchbar;
