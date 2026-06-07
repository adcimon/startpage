import { html } from '../../html.js';

export function SearchField({ onSearch }) {
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}

		// Focus the search field when user starts typing anywhere on the page
		const handleGlobalKeyDown = (event) => {
			const activeEl = document.activeElement;
			if (
				activeEl &&
				(activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT' || activeEl.tagName === 'TEXTAREA')
			) {
				return;
			}

			if (event.ctrlKey || event.metaKey || event.altKey) {
				return;
			}

			if (event.key.length === 1 && inputRef.current) {
				inputRef.current.focus();
			}
		};

		document.addEventListener('keydown', handleGlobalKeyDown);
		return () => {
			document.removeEventListener('keydown', handleGlobalKeyDown);
		};
	}, []);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && value.trim() !== '') {
			const shouldClear = onSearch?.(value);
			if (shouldClear) {
				setValue('');
			}
		}
	};

	const handleClear = () => {
		setValue('');
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return html`
		<div class="search-field-container">
			<div class="search-input-wrapper">
				<span class="search-icon-left">
					<i class="icon-search"></i>
				</span>
				<input
					ref=${inputRef}
					type="text"
					class="search-input"
					value=${value}
					onChange=${handleChange}
					onKeyDown=${handleKeyDown}
					placeholder="Search..."
					aria-label="Search"
					autofocus />
				${value !== ''
					? html`
							<button
								class="search-clear-btn"
								onClick=${handleClear}
								aria-label="Clear search">
								<i class="icon-x"></i>
							</button>
						`
					: null}
			</div>
		</div>
	`;
}
