import { html } from '../../html.js';
import { timezones } from './timezones.js';

const DEFAULT_TIMEZONE = 'Europe/Madrid';

export function DatetimeWidget() {
	const [time, setTime] = React.useState('');
	const [dateStr, setDateStr] = React.useState('');
	const [timezone, setTimezone] = React.useState(() => {
		return localStorage.getItem('timezone') || DEFAULT_TIMEZONE;
	});

	const updateTime = React.useCallback(() => {
		try {
			const now = new Date();
			const locale = 'en-UK';

			const formattedTime = now.toLocaleTimeString(locale, {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
				timeZone: timezone,
			});

			const formattedDate = now.toLocaleDateString(locale, {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				timeZone: timezone,
			});

			setTime(formattedTime);
			setDateStr(formattedDate);
		} catch (e) {
			// Fail silently or fallback if user is in middle of typing timezone
		}
	}, [timezone]);

	React.useEffect(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [updateTime]);

	React.useEffect(() => {
		if (timezones.includes(timezone)) {
			localStorage.setItem('timezone', timezone);
		}
	}, [timezone]);

	const handleChangeTimezone = (event) => {
		setTimezone(event.target.value);
	};

	return html`
		<div class="datetime-widget">
			<h2 class="datetime-time">${time}</h2>
			<p class="datetime-date">${dateStr}</p>

			<div class="timezone-select-container">
				<select
					class="timezone-input"
					value=${timezone}
					onChange=${handleChangeTimezone}>
					${timezones.map(
						(tz) =>
							html`<option
								key=${tz}
								value=${tz}>
								${tz}
							</option>`,
					)}
				</select>
			</div>
		</div>
	`;
}
