import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Searchbar from './components/SearchBar';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from './components/Spinner';
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch images from the backend when the application loads
  useEffect(() => {
    getSavedImages();
  }, []);
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Promises in JS are objects representing eventual completion (or failure)
    // of an asynchronous operation. They have 3 states: pending, fulfilled, or rejected.
    // The .then() method is used to handle the result when the promise resolves.
    // Fetch data from the Unsplash API using the search term stored in 'word'
    // fetch(`${API_URL}/new-image?query=${word}`)
    //   // Convert the response to JSON
    //   .then((res) => res.json())
    //   // Handle the JSON data
    //   .then((data) => {
    //     setImages([{ ...data, title: word }, ...images]);
    //   })
    //   // Catch and log any errors that occur during the fetch operation
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (err) {
      console.log(err);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);

      // Handle successful deletion (2xx status codes)
      if (res.status >= 200 && res.status < 300) {
        setImages(images.filter((image) => image.id !== id));
        return;
      }

      // If we get here, we have a non-error response that isn't in the 2xx range
      console.warn(`Unexpected response status: ${res.status}`, res.data);
      alert(`Could not delete image: ${res.data?.error || 'Unknown error'}`);
    } catch (err) {
      // Extract error details for better error reporting
      const statusCode = err.response?.status;
      const errorMessage =
        err.response?.data?.error || err.message || 'Unknown error';

      console.error(`Error deleting image (${statusCode}):`, errorMessage);

      // Provide user feedback based on status code
      if (statusCode === 404) {
        alert('Image not found. It may have been already deleted.');
        // Remove from UI anyway since it doesn't exist on server
        setImages(images.filter((image) => image.id !== id));
      } else if (statusCode === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert(`Failed to delete image: ${errorMessage}`);
      }
    }
  };

  const handleSaveImage = async (id) => {
    const imageToSave = images.find((image) => image.id === id);

    // 1. Optimistically update the UI first
    setImages(
      images.map((image) =>
        image.id === id ? { ...image, saved: true } : image
      )
    );

    try {
      // 2. Make the API call
      // Send the original image data structure the backend expects,
      // potentially without the temporary 'saved' flag if the backend adds it.
      // Or ensure the backend handles the 'saved' flag correctly.
      // We use 'imageToSave' here which doesn't have the 'saved: true' yet,
      // which might be what your backend expects. Adjust if necessary.
      const res = await axios.post(`${API_URL}/images`, {
        ...imageToSave,
        saved: true,
      }); // Ensure backend gets the saved status

      // Optional: Check response if needed, but the UI is already updated.
      if (!res.data?.inserted_id) {
        // Handle cases where backend indicates failure despite HTTP success (if applicable)
        console.warn('Backend did not confirm insertion.');
        // Optionally revert UI, though often optimistic updates stay unless there's a clear error
      }
    } catch (err) {
      console.error('Failed to save image:', err);
      // 3. Revert the state if the API call fails
      alert('Failed to save image. Please try again.'); // Inform the user
      setImages(
        images.map(
          (image) => (image.id === id ? { ...image, saved: false } : image) // Revert the saved status
        )
      );
    }
  };

  return (
    <div>
      <Header title="Images Gallery Kuby" />
      {loading ? (
        <Spinner />
      ) : (
        // We need jsx fragment <> here to wrap multiple components
        // without adding an extra node to the DOM
        <>
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
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default App;
