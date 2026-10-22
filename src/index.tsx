import { createRoot } from 'react-dom/client';
import { Ivan } from './bot';
import  './styles.scss';

const app = document.getElementById('app');
if (app) {
	createRoot(app).render(<Ivan />);
}
