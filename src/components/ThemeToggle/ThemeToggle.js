import { html } from '../../html.js';

export function ThemeToggle({ theme, onToggle }) {
	return html`
		<button
			class="theme-toggle"
			onClick=${onToggle}>
			<i class=${theme === 'light' ? 'bi bi-moon' : 'bi bi-sun'}></i>
		</button>
	`;
}
