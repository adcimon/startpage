import { html } from '../../html.js';

export function SearchField({ onSearch }) {
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && value.trim() !== '') {
			onSearch?.(value);
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
					aria-label="Search" />
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
