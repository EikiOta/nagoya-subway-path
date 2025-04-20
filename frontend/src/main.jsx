// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// CSSベースのスタイルはAppでCssBaselineを使用

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);