import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
