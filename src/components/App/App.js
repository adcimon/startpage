import { html } from '../../html.js';
import { DatetimeWidget } from '../DatetimeWidget/DatetimeWidget.js';
import { SearchField } from '../SearchField/SearchField.js';
import { Sidebar } from '../Sidebar/Sidebar.js';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.js';
import { MenuButton } from '../MenuButton/MenuButton.js';
import { Bookmarks } from '../BookmarkList/bookmarks.js';

export function App() {
	const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');
	const [sidebarOpen, setSidebarOpen] = React.useState(false);

	React.useEffect(() => {
		let themeColor = document.querySelector('meta[name="theme-color"]');
		if (!themeColor) {
			themeColor = document.createElement('meta');
			themeColor.name = 'theme-color';
			document.head.appendChild(themeColor);
		}

		document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';

		const backgroundColor = getComputedStyle(document.body).getPropertyValue('--color-bg-body').trim();
		if (backgroundColor) {
			themeColor.content = backgroundColor;
		}

		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const handleSearch = (query, openInNewTab = false) => {
		const trimmed = query.trim().toLowerCase();
		const matchedBookmark = Bookmarks.find((b) => b.command && b.command.toLowerCase() === trimmed);

		if (matchedBookmark) {
			if (matchedBookmark.command === '/exit') {
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
		<div class="main-container ${sidebarOpen ? 'sidebar-open' : ''}">
			<${MenuButton} onClick=${() => setSidebarOpen(true)} />
			<${ThemeToggle}
				theme=${theme}
				onToggle=${toggleTheme} />
			<${Sidebar}
				title="Bookmarks"
				open=${sidebarOpen}
				onClose=${() => setSidebarOpen(false)} />
			<main class="main-content">
				<div class="main-content-inner">
					<div class="col-12 text-center">
						<${DatetimeWidget} />
					</div>
					<div
						class="col-12 d-flex justify-content-center"
						style=${{ maxWidth: '500px', width: '100%' }}>
						<${SearchField} onSearch=${handleSearch} />
					</div>
				</div>
			</main>
		</div>
	`;
}
