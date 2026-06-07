import { html } from '../../html.js';
import { DatetimeWidget } from '../DatetimeWidget/DatetimeWidget.js';
import { SearchField } from '../SearchField/SearchField.js';
import { BookmarkList } from '../BookmarkList/BookmarkList.js';

export function App() {
	const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

	React.useEffect(() => {
		if (theme === 'light') {
			document.body.className = 'theme-light';
		} else {
			document.body.className = 'theme-dark';
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const handleSearch = (query) => {
		const searchUrl = 'https://www.google.com/search?q=';
		window.location.href = searchUrl + encodeURIComponent(query);
	};

	return html`
		<main class="app-main">
			<button
				class="theme-toggle-btn"
				onClick=${toggleTheme}
				aria-label="Toggle theme">
				<i class=${theme === 'light' ? 'icon-moon' : 'icon-sun'}></i>
			</button>

			<div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
				<div class="startpage-container box d-flex flex-column align-items-center gap-5 w-100">
					<${DatetimeWidget} />
					<${SearchField} onSearch=${handleSearch} />
					<${BookmarkList} />
				</div>
			</div>
		</main>
	`;
}
