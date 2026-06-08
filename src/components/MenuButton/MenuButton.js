import { html } from '../../html.js';

export function MenuButton({ onClick }) {
	return html`
		<button
			class="menu-button"
			onClick=${onClick}>
			<i class="bi bi-list"></i>
		</button>
	`;
}
