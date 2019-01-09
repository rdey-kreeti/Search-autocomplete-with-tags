import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchAutocomplete from './components/search_autocomplete';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SearchAutocomplete />, document.getElementById('root'));

serviceWorker.unregister();
