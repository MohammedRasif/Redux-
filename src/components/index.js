import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { store } from './app/store';
import { Provider } from 'react-redux';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
