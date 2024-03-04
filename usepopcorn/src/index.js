import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)

//   return (
//     <>
//       <StarRating maxRating={10} onSetRating={setMovieRating} />
//       <p>MovieRating is {movieRating}</p>
//     </>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <StarRating maxRating={5} defaultRating={3} /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
