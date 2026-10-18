import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Showcase from './pixel/Showcase';
import './styles/tokens.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(new URLSearchParams(location.search).has('sprites') ? <Showcase /> : <App />);
