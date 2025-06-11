/* @refresh reload */
import { render } from 'solid-js/web';
import App from './app/page.tsx';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './index.css';

const root = document.getElementById('root');

render(() => <App />, root!);
