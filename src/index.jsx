import React from 'react';
import { createRoot } from 'react-dom/client';
import { Ivan } from './bot.jsx';
import  './styles.scss';

createRoot(document.getElementById('app')).render(<Ivan />);

