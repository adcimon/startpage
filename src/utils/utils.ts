export namespace Utils {
	export const getTime = (timezone: string): string => {
		const locale = 'en-UK';
		const date = new Date();

		const timelocale: string = date.toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: timezone,
		});

		return timelocale;
	};

	export const getDate = (timezone: string): string => {
		const locale = 'en-UK';
		const date = new Date();

		const dateLocale = date.toLocaleDateString(locale, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: timezone,
		});

		return dateLocale;
	};
}
