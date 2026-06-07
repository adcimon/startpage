import { html } from '../../html.js';
import { DatetimeWidget } from '../DatetimeWidget/DatetimeWidget.js';
import { SearchField } from '../SearchField/SearchField.js';
import { BookmarkList } from '../BookmarkList/BookmarkList.js';
import { Bookmarks } from '../BookmarkList/bookmarks.js';

export function App() {
	const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

	React.useEffect(() => {
		let metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (!metaThemeColor) {
			metaThemeColor = document.createElement('meta');
			metaThemeColor.name = 'theme-color';
			document.head.appendChild(metaThemeColor);
		}

		document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';

		const bodyBgColor = getComputedStyle(document.body).getPropertyValue('--color-bg-body').trim();
		if (bodyBgColor) {
			metaThemeColor.content = bodyBgColor;
		}

		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const handleSearch = (query, openInNewTab = false) => {
		const trimmed = query.trim().toLowerCase();
		const matchedBookmark = Bookmarks.find((b) => b.trigger && b.trigger.toLowerCase() === trimmed);

		if (matchedBookmark) {
			if (matchedBookmark.trigger === '/exit') {
				window.close();
				return true;
			} else if (matchedBookmark.url) {
				if (openInNewTab) {
					window.open(matchedBookmark.url, '_blank');
				} else {
					window.location.href = matchedBookmark.url;
				}
				return false;
			} else {
				window.open(window.location.href, '_blank');
				return true;
			}
		} else {
			const searchUrl = 'https://www.google.com/search?q=';
			if (openInNewTab) {
				window.open(searchUrl + encodeURIComponent(query), '_blank');
			} else {
				window.location.href = searchUrl + encodeURIComponent(query);
			}
			return false;
		}
	};

	return html`
		<main class="app-main">
			<button
				class="theme-toggle-btn"
				onClick=${toggleTheme}
				aria-label="Toggle theme">
				<i class=${theme === 'light' ? 'icon-moon' : 'icon-sun'}></i>
			</button>

			<div class="w-100 d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
				<div class="main-container d-flex flex-column align-items-center gap-5 w-100">
					<${DatetimeWidget} />
					<${SearchField} onSearch=${handleSearch} />
					<${BookmarkList} />
				</div>
			</div>
		</main>
	`;
}
