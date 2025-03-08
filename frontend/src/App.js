import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Searchbar from './components/SearchBar';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word);
    // Promises in JS are objects representing eventual completion (or failure)
    // of an asynchronous operation. They have 3 states: pending, fulfilled, or rejected.
    // The .then() method is used to handle the result when the promise resolves.
    // Fetch data from the Unsplash API using the search term stored in 'word'
    fetch(
      `https://api.unsplash.com/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      // Convert the response to JSON
      .then((res) => res.json())
      // Handle the JSON data
      .then((data) => {
        setImages([data, ...images]);
      })
      // Catch and log any errors that occur during the fetch operation
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };
  console.log(process.env);
  return (
    <div>
      <Header title="Images Gallery Kuby" />
      <Searchbar
        word={word}
        setWord={setWord}
        handleSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default App;
