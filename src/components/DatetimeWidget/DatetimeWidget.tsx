import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TimezoneSelect } from '../TimezoneSelect/TimezoneSelect';
import { useInterval } from '../../hooks/useInterval';
import { Utils } from '../../utils/utils';

const DEFAULT_TIMEZONE: string = 'Europe/Madrid';

export const DatetimeWidget: React.FC = (): JSX.Element => {
	const [time, setTime] = React.useState<string>('');
	const [date, setDate] = React.useState<string>('');
	const [timezone, setTimezone] = React.useState<string>(DEFAULT_TIMEZONE);

	React.useEffect(() => {
		loadTimezone();
	}, []);

	useInterval(() => {
		update();
	}, 1 * 1000);

	React.useEffect(() => {
		saveTimezone();
		update();
	}, [timezone]);

	const loadTimezone = () => {
		const timezone: string = localStorage.getItem('timezone') ?? DEFAULT_TIMEZONE;
		setTimezone(timezone);
	};

	const saveTimezone = () => {
		localStorage.setItem('timezone', timezone);
	};

	const update = () => {
		try {
			const time: string = Utils.getTime(timezone);
			const date: string = Utils.getDate(timezone);
			setTime(time);
			setDate(date);
		} catch (error: any) {
			setTimezone(DEFAULT_TIMEZONE);
		}
	};

	const handleChangeTimezone = (event: any) => {
		setTimezone(event.target.value);
	};

	const render = () => {
		const opacity: string = '0.8';
		return (
			<>
				<Stack
					sx={{
						alignItems: 'center',
						flexDirection: 'column',
						flexWrap: 'wrap',
						gap: '1rem',
						justifyContent: 'center',
					}}>
					<Stack
						sx={{
							alignItems: 'center',
							flexDirection: 'column',
							flexWrap: 'wrap',
							gap: '0.5rem',
							justifyContent: 'center',
						}}>
						<Typography
							variant='h2'
							sx={{
								opacity: opacity,
							}}>
							{time}
						</Typography>
						<Typography
							variant='h6'
							sx={{
								opacity: opacity,
							}}>
							{date}
						</Typography>
					</Stack>
					<TimezoneSelect
						value={timezone}
						onChange={handleChangeTimezone}
						hiddenLabel
						disableClearable
						sx={{
							height: '30px',
							width: '200px',
						}}
					/>
				</Stack>
			</>
		);
	};

	return render();
};
