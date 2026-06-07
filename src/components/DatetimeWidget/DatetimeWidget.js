import { html } from '../../html.js';
import { timezones } from './timezones.js';

const DEFAULT_TIMEZONE = 'Europe/Madrid';

export function DatetimeWidget() {
	const [date, setDate] = React.useState('');
	const [time, setTime] = React.useState('');
	const [timezone, setTimezone] = React.useState(() => {
		return localStorage.getItem('timezone') || DEFAULT_TIMEZONE;
	});

	const updateTime = React.useCallback(() => {
		try {
			const now = new Date();
			const locale = 'en-UK';

			const formattedDate = now.toLocaleDateString(locale, {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				timeZone: timezone,
			});

			const formattedTime = now.toLocaleTimeString(locale, {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
				timeZone: timezone,
			});

			setDate(formattedDate);
			setTime(formattedTime);
		} catch (e) {
			// Fail silently or fallback if user is in middle of typing timezone.
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
			<p class="datetime-date">${date}</p>
			<h2 class="datetime-time">${time}</h2>

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
