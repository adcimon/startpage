import { html } from '../../html.js';
import { BookmarkList } from '../BookmarkList/BookmarkList.js';

export function Sidebar({ title, open, onClose }) {
	return html`
		<aside class="sidebar">
			<div class="sidebar-header">
				<span class="sidebar-title">${title}</span>
				<button
					class="sidebar-close-button"
					onClick=${onClose}>
					<i class="bi bi-x-lg"></i>
				</button>
			</div>
			<div class="sidebar-content">
				<${BookmarkList} />
			</div>
		</aside>
		${open
			? html`
					<div
						class="sidebar-backdrop"
						onClick=${onClose}></div>
				`
			: null}
	`;
}
