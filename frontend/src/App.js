import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Searchbar from "./components/SearchBar";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [word, setWord] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word);
    // Promises in JS are objects representing eventual completion (or failure)
    // of an asynchronous operation. They have 3 states: pending, fulfilled, or rejected.
    // The .then() method is used to handle the result when the promise resolves.
    fetch(
      `https://api.unsplash.com/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
