import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Searchbar from './components/SearchBar';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Promises in JS are objects representing eventual completion (or failure)
    // of an asynchronous operation. They have 3 states: pending, fulfilled, or rejected.
    // The .then() method is used to handle the result when the promise resolves.
    // Fetch data from the Unsplash API using the search term stored in 'word'
    fetch(`${API_URL}/new-image?query=${word}`)
      // Convert the response to JSON
      .then((res) => res.json())
      // Handle the JSON data
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]);
      })
      // Catch and log any errors that occur during the fetch operation
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery Kuby" />

      <Searchbar
        word={word}
        setWord={setWord}
        handleSubmit={handleSearchSubmit}
      />
      <Container className="mt-4">
        {images.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard
                  key={i}
                  image={image}
                  deleteImage={handleDeleteImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
