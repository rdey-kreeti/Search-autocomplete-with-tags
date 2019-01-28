import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchAutocomplete from './components/search_autocomplete';
import * as serviceWorker from './serviceWorker';

const GUESTS = [
  {
    "id": "1",
    "name": "Sheryl Hardin"
  },
  {
    "id": "2",
    "name": "Gloria Peters"
  },
  {
    "id": "3",
    "name": "Mollie Hopper"
  },
  {
    "id": "4",
    "name": "Marcia Valentine"
  },
  {
    "id": "5",
    "name": "Leanna Stein"
  },
  {
    "id": "6",
    "name": "Albert Frederick"
  },
  {
    "id": "7",
    "name": "Gabrielle Baker"
  },
  {
    "id": "8",
    "name": "Josefina Glenn"
  },
  {
    "id": "9",
    "name": "Deanne Mason"
  },
  {
    "id": "10",
    "name": "Ilene Madden"
  },
  {
    "id": "11",
    "name": "Lourdes Patton"
  },
  {
    "id": "12",
    "name": "Hebert Hess"
  },
  {
    "id": "13",
    "name": "Latonya Burris"
  },
  {
    "id": "14",
    "name": "Courtney Camacho"
  }
]

ReactDOM.render(<SearchAutocomplete data={GUESTS} />, document.getElementById('root'));

serviceWorker.unregister();
