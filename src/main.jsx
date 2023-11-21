import React from 'react'
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorHandler({error}) {
  return (
    <div role='alert'>
      <p>An error occured</p>
      <pre>{error.message}</pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <App />
        </ErrorBoundary>        
      </Provider>
    </CookiesProvider>    
  </React.StrictMode>,
)
