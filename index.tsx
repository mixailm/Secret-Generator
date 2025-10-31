import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// AppWrapper to keep StrictMode if needed, while allowing App to avoid double-renders from hooks
const AppWrapper = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<AppWrapper />);
