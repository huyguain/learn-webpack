import sum from './math';
import './image';

import React from 'react';
import { createRoot } from 'react-dom/client';

const total = sum(1, 2);

console.log(total);
document.write(total);

const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello React</h1>);