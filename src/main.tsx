import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './context/userContext.tsx';
import App from './App.tsx';
import './index.css';
import store from './store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppContext>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </AppContext>
  </Provider>
);
