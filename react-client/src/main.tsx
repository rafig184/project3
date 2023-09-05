
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css"
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"

import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)


