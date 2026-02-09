import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

type RootContainer = typeof ReactDOM & { __root?: ReactDOM.Root };
const rootContainer = ReactDOM as RootContainer;
const root = rootContainer.__root ?? ReactDOM.createRoot(rootElement);
rootContainer.__root = root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
