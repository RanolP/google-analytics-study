/* @refresh reload */
import { render } from 'solid-js/web';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './index.css';
import { Router } from '@solidjs/router';
import { GeneratedRoutes } from '@/shared/routes';

const root = document.getElementById('root');

render(() => <Router>{GeneratedRoutes}</Router>, root!);
