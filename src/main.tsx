import React from 'react';
//createRoot ReactDOM mai nhi hoat hai esliye /client se kar rahe hai
import ReactDOM from 'react-dom/client';
import App from './App';

//Starting point hai application ka
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)