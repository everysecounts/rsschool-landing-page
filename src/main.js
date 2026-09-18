import { App } from '@/App';
import '@/styles/variables.css';
import '@/styles/globals.css';
import '@/styles/fonts.css';

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
const app = new App(document.body);

app.start();
