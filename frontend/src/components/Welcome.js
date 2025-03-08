import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container className="p-5 mb-4 bg-white rounded-3">
      <h1>Images Gallery</h1>
      <p className="lead">
        This is a simple application that retrieves photos using the Unsplash
        API. In the search bar, type a keyword and press Enter to display.
      </p>
      <p>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          {' '}
          Learn More
        </Button>
      </p>
    </Container>
  );
};

export default Welcome;
